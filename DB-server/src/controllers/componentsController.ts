import { PrismaClient } from "@prisma/client";
import express from "express";
import * as componentLoader from "./../dataAccess/componentsLoader";

/**
 * Retrieves components of all types
 * Note: ommitted db tables: computer, memory, storage 
 * Handles HTTP GET method on route: "/api/components
 */
export async function get(db: PrismaClient, req: express.Request, res: express.Response) : Promise<any>
{
    let cpus = await componentLoader.getCpus(db);
    let motherboards = await componentLoader.getMotherboards(db);
    let rams = await componentLoader.getRAMs(db);
    let disks =  await componentLoader.getDisks(db);
    let gpus = await componentLoader.getGPUs(db);
    let psus = await componentLoader.getPSUs(db);
    let cases = await componentLoader.getCases(db);
    let monitors = await componentLoader.getMonitors(db);
    let keyboards = await componentLoader.getKeyboards(db);
    let mouses = await componentLoader.getMouses(db);

    //cpus instead of cpu to match the format required by frontend components
    let components = {
        "cpu": cpus,
        "motherboard" : motherboards,
        "ram" : rams,
        "disk" : disks,
        "gpu" : gpus,
        "psu" : psus,
        "case" : cases,
        "monitor" : monitors,
        "keyboard" : keyboards,
        "mouse" : mouses
    };
    
    res.send(JSON.stringify(components));
}

/**
 * Retrieves components of all types by category
 * Note: ommitted db tables: computer, memory, storage 
 * Category is required
 * Handles HTTP GET method on route: "/api/components/{category}
 */
export async function getByCategory(db: PrismaClient, req: express.Request, res: express.Response) : Promise<any>
{
    let category = req.params.category;
    if(!category){
        //path parameter is not provided
        //https://stackoverflow.com/questions/14154337/how-to-send-a-custom-http-status-message-in-node-express#answer-36507614
        res.statusMessage = "Component category is not defined in the URL.";
        res.status(400).end();
        return;
    }
    let cpus = await componentLoader.getCpusByCategory(db, category as string);
    let motherboards = await componentLoader.getMotherboardsByCategory(db, category as string);
    let rams = await componentLoader.getRAMsByCategory(db, category as string);
    let disks =  await componentLoader.getDisksByCategory(db, category as string);
    let gpus = await componentLoader.getGPUsByCategory(db, category as string);
    let psus = await componentLoader.getPSUsByCategory(db, category as string);
    let cases = await componentLoader.getCasesByCategory(db, category as string);
    let monitors = await componentLoader.getMonitorsByCategory(db, category as string);
    let keyboards = await componentLoader.getKeyboardsByCategory(db, category as string);
    let mouses = await componentLoader.getMousesByCategory(db, category as string);

     //cpus instead of cpu to match the format required by frontend components
     let components = {
        "cpu": cpus,
        "motherboard" : motherboards,
        "ram" : rams,
        "disk" : disks,
        "gpu" : gpus,
        "psu" : psus,
        "case" : cases,
        "monitor" : monitors,
        "keyboard" : keyboards,
        "mouse" : mouses
    };
    
    res.send(JSON.stringify(components));
}
