import { PrismaClient } from "@prisma/client";
import express from "express";
import * as ordersLoader from "./../dataAccess/ordersLoader";

/**
 * Loads all orders of current user or only specific number of latest orders if query parameter orderCount is provided.
 * Requires that 
 * Query format: /api/orders?orderCount={count}
 * 
 */
 export async function getForCurrentUser(db: PrismaClient, req: express.Request, res: express.Response) : Promise<any>
 {
    let orders;
    let userId = res.locals.userId;

    if (req.query.orderCount) {
        let amount = +req.query.orderCount;
        orders = ordersLoader.getByUserTakeN(db, userId, amount);
    } else {
        orders = ordersLoader.getByUser(db, userId);
    }

    res.send(JSON.stringify(orders));
 }
