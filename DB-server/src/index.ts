import {PrismaClient} from '@prisma/client';
import express from "express";
import bodyParser from "body-parser";
import * as componentLoader from "./dataAccess/componentsLoader";

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
app.get("/api/components/:category", async (req, res) => {
    let category = req.params.category;
    if(!category){
        //path parameter is not provided
        //https://stackoverflow.com/questions/14154337/how-to-send-a-custom-http-status-message-in-node-express#answer-36507614
        res.statusMessage = "Component category is not defined in the URL.";
        res.status(400).end();
        return;
    }
    let cpus = await componentLoader.getCpusByCategory(prisma, category as string);
    let motherboards = await componentLoader.getMotherboardsByCategory(prisma, category as string);
    let rams = await componentLoader.getRAMsByCategory(prisma, category as string);
    let disks =  await componentLoader.getDisksByCategory(prisma, category as string);
    let gpus = await componentLoader.getGPUsByCategory(prisma, category as string);
    let psus = await componentLoader.getPSUsByCategory(prisma, category as string);
    let cases = await componentLoader.getCasesByCategory(prisma, category as string);
    let monitors = await componentLoader.getMonitorsByCategory(prisma, category as string);
    let keyboards = await componentLoader.getKeyboardsByCategory(prisma, category as string);
    let mouses = await componentLoader.getMousesByCategory(prisma, category as string);

    let components = {
        "cpus": cpus,
        "motherboards" : motherboards,
        "rams" : rams,
        "disks" : disks,
        "gpus" : gpus,
        "psus" : psus,
        "cases" : cases,
        "monitors" : monitors,
        "keyboards" : keyboards,
        "mouses" : mouses
    };
    
    res.send(JSON.stringify(components));
});

/**
 * Retrieves components of all types by category
 * Note: ommitted db tables: computer, memory, storage 
 * Category is required
 * Handles GET method on route: "/api/components/{category}
 */
 app.get("/api/components", async (req, res) => {
    let cpus = await componentLoader.getCpus(prisma);
    let motherboards = await componentLoader.getMotherboards(prisma);
    let rams = await componentLoader.getRAMs(prisma);
    let disks =  await componentLoader.getDisks(prisma);
    let gpus = await componentLoader.getGPUs(prisma);
    let psus = await componentLoader.getPSUs(prisma);
    let cases = await componentLoader.getCases(prisma);
    let monitors = await componentLoader.getMonitors(prisma);
    let keyboards = await componentLoader.getKeyboards(prisma);
    let mouses = await componentLoader.getMouses(prisma);

    let components = {
        "cpus": cpus,
        "motherboards" : motherboards,
        "rams" : rams,
        "disks" : disks,
        "gpus" : gpus,
        "psus" : psus,
        "cases" : cases,
        "monitors" : monitors,
        "keyboards" : keyboards,
        "mouses" : mouses
    };
    
    res.send(JSON.stringify(components));
});





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