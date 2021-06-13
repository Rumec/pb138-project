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
 * Loads all orders of current user or a specific number of last orders specified in a query.
 *
 * Query format: "/api/orders?orderCount={count}
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
 * Retrieves all components of given type
 * If query parameter "category" is provided, filters components of given type by category
 * Handles GET method on route: "/api/components/{componentType}?category={category}
 */
app.get("/api/components/:componentType", async (req, res) => {
    let componentType = req.params.componentType;
    if(!componentType){
        //path parameter is not provided
        //https://stackoverflow.com/questions/14154337/how-to-send-a-custom-http-status-message-in-node-express#answer-36507614
        res.statusMessage = "Component type is not provided in the URL.";
        res.status(400).end();
        return;
    }
    
    //ommitted db tables: computer, memory, storage 

    let components;
    let category = req.query.category;
    switch(req.params.componentType){
        case "cpu":
            if(category){
                components = await componentLoader.getCpusByCategory(prisma, category as string);
            } else {
                components = await componentLoader.getCpus(prisma);
            }
            break;
        case "motherboard":
            if(category){
                components = await componentLoader.getMotherboardsByCategory(prisma, category as string);
            } else {
                components = await componentLoader.getMotherboards(prisma);
            }
            break;
        case "ram":
            if(category){
                components = await componentLoader.getRAMsByCategory(prisma, category as string);
            } else {
                components = await componentLoader.getRAMs(prisma);
            }
            break;
        case "disk":
            if(category){
                components = await componentLoader.getDisksByCategory(prisma, category as string);
            } else {
                components = await componentLoader.getDisks(prisma);
            }
            break;
        case "gpu":
            if(category){
                components = await componentLoader.getGPUsByCategory(prisma, category as string);
            } else {
                components = await componentLoader.getGPUs(prisma);
            }
            break;
        case "psu":
            if(category){
                components = await componentLoader.getPSUsByCategory(prisma, category as string);
            } else {
                components = await componentLoader.getPSUs(prisma);
            }
            break;
        case "case":
            if(category){
                components = await componentLoader.getCasesByCategory(prisma, category as string);
            } else {
                components = await componentLoader.getCases(prisma);
            }
            break;
        case "monitor":
            if(category){
                components = await componentLoader.getMonitorsByCategory(prisma, category as string);
            } else {
                components = await componentLoader.getMonitors(prisma);
            }
            break;
        case "keyboard":
            if(category){
                components = await componentLoader.getKeyboardsByCategory(prisma, category as string);
            } else {
                components = await componentLoader.getKeyboards(prisma);
            }
            break;
        case "mouse":
            if(category){
                components = await componentLoader.getMousesByCategory(prisma, category as string);
            } else {
                components = await componentLoader.getMouses(prisma);
            }
            break;
        default:
            res.statusMessage = "Invalid component type.";
            res.status(400).end();
            return;
    }
    
    res.send(JSON.stringify(components));
});

//matches GET at route /{id} where id is path parameter
app.get('/:id', function(req, res) {
    res.send('id: ' + req.params.id);
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