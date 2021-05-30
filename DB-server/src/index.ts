import {PrismaClient} from '@prisma/client';
import express from "express";
import bodyParser from "body-parser";

const prisma = new PrismaClient();

const port: number = 3000;
const app = express();

/**
 * Middleaware function for checking if user specified in header exists.
 *
 * NOTE: Počítám s tím, že v tomto předmětu, stejně jako u cvičení, nebudeme používat autentizaci a budeme používat jen
 *       X-User header
 *
 *       Pro práci s X-User platí následující - v Insomnii si u daného requestu rozklinete "Header" a přidáte header
 *       s názvem X-User a hodnota bude id uživatele
 */
const middleware = async (req: any, res: any, next: any) => {
    const userId = req.header("X-User");
    if(!userId) {
        res.sendStatus(401);
        return;
    }

    const user = await prisma.user.findMany({
        where: {
            id: +userId
        }
    });
    if (user.length === 0) {
        res.sendStatus(401);
        return;
    }
    // This is the was to pass data to functions following middleware
    res.locals.userId = +userId;
    next();
};

// Used for parsing JSONs and applying middleware to whole server
// NOTE: If you want to apply some funciton to all routes in API as a middleware, pass it here as an argument
app.use(bodyParser.json(), middleware);

/**
 * Loads all orders of current user or a specific number of last orders specified in a query.
 *
 * Query format: "/api/orders?orderCount={count}
 */
app.get("/api/orders", async (req, res) => {
    let orders;
    if (req.query.orderCount) {
        orders = await prisma.order.findMany({
            where: {
                user_id: res.locals.userId
            },
            orderBy: {
                id: "desc"
            },
            take: +req.query.orderCount
        });
    } else {
        orders = await prisma.order.findMany({
            where: {
                user_id: res.locals.userId
            },
            orderBy: {
                id: "desc"
            },
        });
    }

    res.send(JSON.stringify(orders));
});

async function main() {
    app.listen(port);
    console.log(`PC-configurator-backend is listening on port ${port}`);
}

main().catch(e => {
    throw e;
}).finally(async () => {
    await prisma.$disconnect();
})