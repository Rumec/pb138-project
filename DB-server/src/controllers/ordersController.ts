import { Order, PrismaClient } from "@prisma/client";
import express from "express";
import * as ordersDataHandler from "../dataAccess/ordersDataHandler";
import * as computersDataHandler from "../dataAccess/computersDataHandler";


/**
 * NOT TESTED
 * Loads all orders of current user or only specific number of latest orders if query parameter orderCount is provided.
 * Requires that 
 * Handles HTTP GET method on route: /api/orders?orderCount={count}
 */
export async function getForCurrentUser(db: PrismaClient, req: express.Request, res: express.Response): Promise<any> {
    let orders;
    let userId = res.locals.userId;

    if (req.query.orderCount) {
        let amount = +req.query.orderCount;
        orders = ordersDataHandler.getByUserTakeN(db, userId, amount);
    } else {
        orders = ordersDataHandler.getByUser(db, userId);
    }

    res.send(JSON.stringify(orders));
}

/**
 * NOT TESTED
* Changes order state to cancelled
* If the order is not found, returns 404 Not Found
* If the order does not belong to current user, then 403 Forbidden
* If the order is already cancelled, then 409 Conflict
* Handles HTTP PUT method on route: /api/orders/{id}
*   path parameter id is required (otherwise 400 Bad Request)
*/
export async function setCancelled(db: PrismaClient, req: express.Request, res: express.Response): Promise<any> {
    const userId = res.locals.userId;
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
 * NOT TESTED
* Loads an order with components and computer with internal components included
* Intended use is for order recapitulation
* If the order is not found, returns 404 Not Found
* If the order does not belong to curent user, then 403 Forbidden
* If the order is cancelled, then 409 Conflict
* Handles HTTP GET method on route: /api/orders/{id}
*   path parameter id is required (otherwise 400 Bad Request)
*/
export async function getWithComponents(db: PrismaClient, req: express.Request, res: express.Response): Promise<any> {
    const userId = res.locals.userId;
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

    const orderExtendable : any = order as any;
    (orderExtendable)["computers"] = await computersDataHandler.getAllWithComponents(db, order.id); //db call #3 for computer and its parts
    res.send(JSON.stringify(orderExtendable));
}



function belongsToUser(order: Order, userId: number): boolean {
    return order.user_id == userId;
}
function isCancelled(order: Order): boolean {
    return order.canceled;
}
