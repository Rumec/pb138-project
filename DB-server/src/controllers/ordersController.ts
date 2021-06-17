import { Order, PrismaClient } from "@prisma/client";
import express from "express";
import * as ordersDataHandler from "../dataAccess/ordersDataHandler";
import * as computersDataHandler from "../dataAccess/computersDataHandler";


/**
 * Loads all orders of current user or only specific number of latest orders if JSON body attribute orderCount is provided.
 * Requires that 
 * Handles HTTP GET method on route: /api/orders with JSON object with "orderCount" attribute
 */
export async function getForCurrentUser(db: PrismaClient, req: express.Request, res: express.Response): Promise<any> {
    let orders;
    let userId = +res.locals.userId;

    if (req.body.orderCount) {
        let amount = +req.body.orderCount;
        orders = await ordersDataHandler.getByUserTakeN(db, userId, amount);
    } else {
        orders = await ordersDataHandler.getByUser(db, userId);
    }

    res.send(JSON.stringify(orders));
}

/**
* Changes order state to cancelled
* If the order is not found, returns 404 Not Found
* If the order does not belong to current user, then 403 Forbidden
* If the order is already cancelled, then 409 Conflict
* Handles HTTP PUT method on route: /api/orders/{id}
*   path parameter id is required (otherwise 400 Bad Request)
*/
export async function setCancelled(db: PrismaClient, req: express.Request, res: express.Response): Promise<any> {
    const userId = +res.locals.userId;
    const orderId = +req.params.orderId;
    if (!orderId) {
        res.statusMessage = "Id path parameter not provided or NaN.";
        res.status(400).end();
        return;
    }
    const order = await ordersDataHandler.get(db, orderId);
    if (!order) {
        res.status(404).end();
        return;
    }
    //order! = definitely not null
    if (!belongsToUser(order!, userId)) {
        res.status(403).end();
        return;
    }
    if (isCancelled(order!)) {
        res.status(409).end();
        return;
    }
    await ordersDataHandler.cancel(db, order.id);
    res.send(200);
}


/**
* Loads an order with components and computer with internal components included
* Intended use is for order recapitulation
* If the order is not found, returns 404 Not Found
* If the order does not belong to curent user, then 403 Forbidden
* If the order is cancelled, then 409 Conflict
* Handles HTTP GET method on route: /api/orders/{id}
*   path parameter id is required (otherwise 400 Bad Request)
*/
export async function getWithComponents(db: PrismaClient, req: express.Request, res: express.Response): Promise<any> {
    const userId = +res.locals.userId;
    const orderId = +req.params.orderId;
    if (!orderId) {
        res.statusMessage = "Id path parameter not provided or NaN.";
        res.status(400).end();
        return;
    }

    const order = await ordersDataHandler.getWithComponentsExceptComputer(db, orderId);
    if (!order) {
        res.status(404).end();
        return;
    }
    //order! = definitely not null
    if (!belongsToUser(order!, userId)) {
        res.status(403).end();
        return;
    }
    if (isCancelled(order!)) {
        res.statusMessage = "Order had already been cancelled.";
        res.status(409).end();
        return;
    }

    const orderExtendable: any = order as any;
    (orderExtendable)["computers"] = await computersDataHandler.getAllWithComponents(db, order.id); //db call #3 for computer and its parts
    res.send(JSON.stringify(orderExtendable));
}

/**
* Creates a new order using given components (cpu, ram, psu, gpu, disk, motherboard, case) and optional (keyboard, mouse, monitor)
* A new computer is created internally which is then added to the order as a holder of the components

* Handles HTTP POST method on route: /api/orders
* Required input data format:
* JSON body with all internal computer components is required (otherwise 400 Bad Request)
* JSON body attributes keyboard, mouse and monitor (note that the screen component is called "monitor" in the JSON body) are optional
*/
export async function createNew(db: PrismaClient, req: express.Request, res: express.Response): Promise<any> {
    const userId = +res.locals.userId;
    const data = req.body;
    if (!data.cpu || !data.case || !data.gpu || !data.motherboard || !data.psu || !data.ram || !data.disk) {
        res.statusMessage = "A required component is missing.";
        res.status(400).end();
        return null;
    }
    const cpuId = data.cpu.id as number;
    const caseId = data.case.id as number;
    const gpuId = data.gpu.id as number;
    const motherboardId = data.motherboard.id as number;
    const psuId = data.psu.id as number;
    const ramId = data.ram.id as number;
    const diskId = data.disk.id as number;

    if (!cpuId || !caseId || !gpuId || !motherboardId || !psuId || !ramId || !diskId) {
        res.statusMessage = "A required component ID is missing.";
        res.status(400).end();
        return null;
    }

    let totalComptuterPrice: number;
    try{
        totalComptuterPrice = getTotalComputerPrice(data);
    } catch (e){ //.price attributes are missing in JSON
        res.statusMessage = "Could not calculate total computer price, reason (invalid data format): " + e.message;
        res.status(400).end();
        return null;
    }



    let keyboardId = data.keyboard.id as number | null;
    let mouseId = data.mouse.id as number | null;
    let screenId = data.monitor.id as number | null; //note: "monitor" in the input JSON data instead of "screen"

    //calculate total order price (add optional components prices)
    let totalOrderPrice = totalComptuterPrice;
    if(data.keyboard.price as number){
        totalOrderPrice += +data.keyboard.price;
    }
    if(data.monitor.price as number){
        totalOrderPrice += +data.monitor.price;
    }
    if(data.mouse.price as number){
        totalOrderPrice += +data.mouse.price;
    }

    //start hack: this has to be done because the front-end requires that it is sent in this format (if not selected then id = -1) 
    if(keyboardId == -1){
        keyboardId = null; //note: it is required that the price is 0 for item id = -1
    }
    if(mouseId == -1){
        mouseId = null; //note: it is required that the price is 0 for item id = -1
    }
    if(screenId == -1){
        screenId = null; 
    }
    //end hack


    let order : Order;
    try{
        //create order without computer
        order = await ordersDataHandler.createNewWithoutComputer(db, userId, mouseId, keyboardId, screenId, totalComptuterPrice);
        console.log("newly created order id: " + order.id);
        //create computer and assign to order
        await computersDataHandler.createNew(db, order.id, "boobs", totalOrderPrice, cpuId, gpuId, ramId, motherboardId, diskId, psuId, caseId);
    } catch (e){
        console.log(e);
        res.statusMessage = "Order was not created. DB integrity would be broken.";
        res.status(400).end();
        return null;
    }

    const orderExtendable: any = order as any;
    (orderExtendable)["computers"] = await computersDataHandler.getAllWithComponents(db, order.id); //db call #3 for computer and its parts
    res.send(JSON.stringify(orderExtendable));
}

function getTotalComputerPrice(data: any): number {
    let totalPrice = 0;

    //required
    if (data.cpu.price as number) {
        totalPrice += data.cpu.price;
    } else {
        throw new Error("cpu price not provided");
    }
    if (data.case.price as number) {
        totalPrice += data.case.price;
    }
    else {
        throw new Error("case price not provided");
    }
    if (data.gpu.price as number) {
        totalPrice += data.gpu.price;
    }
    else {
        throw new Error("gpu price not provided");
    }
    if (data.motherboard.price as number) {
        totalPrice += data.motherboard.price;
    }
    else {
        throw new Error("motherboard price not provided");
    }
    if (data.psu.price as number) {
        totalPrice += data.psu.price;
    }
    else {
        throw new Error("psu price not provided");
    }
    if (data.ram.price as number) {
        totalPrice += data.ram.price;
    }
    else {
        throw new Error("ram price not provided");
    }
    if (data.disk.price as number) {
        totalPrice += data.disk.price;
    }
    else {
        throw new Error("disk price not provided");
    }
    if (data.mouse.price as number) {
        totalPrice += data.mouse.price;
    }
    if (data.screen.price as number) {
        totalPrice += data.screen.price;
    }
    if (data.keyboard.price as number) {
        totalPrice += data.keyboard.price;
    }

    return totalPrice;
}


function belongsToUser(order: Order, userId: number): boolean {
    return order.user_id == userId;
}
function isCancelled(order: Order): boolean {
    return order.canceled;
}
