import {PrismaClient} from '@prisma/client';
import express from "express";
import bodyParser from "body-parser";
import * as components from "./controllers/componentsController";
import * as orders from "./controllers/ordersController";
import * as users from "./controllers/usersController";


const prisma = new PrismaClient();

const port: number = 3000;
const app = express();

/**
 * For these routes, the X-User header is not checked (thus, unauthenticated requests are permitted)
 */
const xUserHeaderMiddlewareSkipRoutes = ["/api/user/login", "/api/user/registration"];

/**
 * Middleware function for checking if user specified in header exists.
 *
 * NOTE: Počítám s tím, že v tomto předmětu, stejně jako u cvičení, nebudeme používat autentizaci a budeme používat jen
 *       X-User header
 *
 *       Pro práci s X-User platí následující - v Insomnii si u daného requestu rozklinete "Header" a přidáte header
 *       s názvem X-User a hodnota bude id uživatele
 */
const xUserHeaderMiddleware = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const requestPath = req.baseUrl + req.path; //https://stackoverflow.com/questions/12525928/how-to-get-request-path-with-express-req-object
    if(xUserHeaderMiddlewareSkipRoutes.includes(requestPath)){
        //do nothing but continue processing in REST API handlers
        next();
        return;
    }

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
    // This is the way to pass data to functions processing the request after the middleware
    res.locals.userId = +userId; //"userId" is put to every HTTP response (it can be then used in REST API handlers)
    next(); //this means that the request handling is passed to some next handlers (usually real REST API handlers)
};

// Used for parsing JSONs and applying middleware to whole server
// NOTE: If you want to apply some function to all routes in API as a middleware, pass it here as an argument
const middlewares = [xUserHeaderMiddleware];
app.use(bodyParser.json(), ...middlewares);






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
 * Loads all orders of current user 
 * If query parameter "orderCount" is provided, only orderCount latest orders are loaded.
 *
 * Handles GET method on route: /api/orders?orderCount={count}
 * 
 */
app.get("/api/orders",  async (req, res) => orders.getForCurrentUser(prisma, req, res));

/**
 * Retrieves components of all types by category
 * Note: ommitted db tables: computer, memory, storage 
 * Category is required
 * Handles GET method on route: "/api/components/{category}
 */
app.get("/api/components/:category", async (req, res) => components.getByCategory(prisma, req, res));

/**
* Retrieves components of all types
* Note: ommitted db tables: computer, memory, storage 
* Handles HTTP GET method on route: "/api/components
*/
app.get("/api/components", async (req, res) => components.get(prisma, req, res));


app.get("/api/user/login", async (req, res) => users.login(prisma, req, res));

app.get("/api/user/registration", async (req, res) => users.register(prisma, req, res));


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