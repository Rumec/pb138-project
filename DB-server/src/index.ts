import {PrismaClient} from '@prisma/client';
import express from "express";
import bodyParser from "body-parser";
import * as componentLoader from "./dataAccess/componentsLoader";
import * as components from "./controllers/componentsController";


const prisma = new PrismaClient();

const port: number = 3000;
const app = express();

/**
 * Middleware function for checking if user specified in header exists.
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
    next(); //this means that the request handling is finished but it is passed to some next handlers (usually real REST API handlers)
};

// Used for parsing JSONs and applying middleware to whole server
// NOTE: If you want to apply some function to all routes in API as a middleware, pass it here as an argument
app.use(bodyParser.json(), middleware);



/**
 * #region REST API HTTP request handlers
 * Parameter types:
 * - path parameter e.g. /items/{category}
 *   - path parameter: category
 *   - access via req.params.pathParamName
 * - query parameters e.g. /persons?name=searchedName&surname=searchedSurname
 *   - query parameters: name, surname
 *   - access via req.query.queryParamName
 */



/**
 * Loads all orders of current user or only specific number of latest orders if query parameter orderCount is provided.
 *
 * Query format: /api/orders?orderCount={count}
 * 
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
            take: +req.query.orderCount //+ = convert to number
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

/**
 * Retrieves components of all types by category
 * Note: ommitted db tables: computer, memory, storage 
 * Category is required
 * Handles GET method on route: "/api/components/{category}
 */
app.get("/api/components/:category", async (req, res) => components.getComponentsByCategory(prisma, req, res));

/**
 * Retrieves components of all types
 * Note: ommitted db tables: computer, memory, storage 
 * Handles HTTP GET method on route: "/api/components
 */
 app.get("/api/components", async (req, res) => components.getComponents(prisma, req, res));


/**
 * #endregion REST API HTTP request handlers
 */



//server application entry point
async function main() {
    app.listen(port); //runs the application which is created in variable "app" when the class Index is initialized
    console.log(`PC-configurator-backend is listening on port ${port}`);
}


main().catch(e => {
    throw e; //exception handler for the whole application
}).finally(async () => {
    await prisma.$disconnect();
})