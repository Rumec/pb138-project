import { PrismaClient } from "@prisma/client";
import express from "express";
import * as ordersLoader from "./../dataAccess/ordersLoader";

/**
 * Loads all orders of current user or only specific number of latest orders if query parameter orderCount is provided.
 *
 * Query format: /api/orders?orderCount={count}
 * 
 */
 export async function get(db: PrismaClient, req: express.Request, res: express.Response) : Promise<any>
 {
    let orders;
    if (req.query.orderCount) {
        orders = await db.order.findMany({
            where: {
                user_id: res.locals.userId
            },
            orderBy: {
                id: "desc"
            },
            take: +req.query.orderCount //operator + converts to number
        });
    } else {
        orders = await db.order.findMany({
            where: {
                user_id: res.locals.userId
            },
            orderBy: {
                id: "desc"
            },
        });
    }

    res.send(JSON.stringify(orders));
 }
