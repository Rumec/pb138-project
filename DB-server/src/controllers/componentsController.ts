import { PrismaClient } from "@prisma/client";
import express from "express";
import * as componentsDataHandler from "../dataAccess/componentsDataHandler";

/**
 * Retrieves components of all types
 * Note: ommitted db tables: computer, memory, storage 
 * Handles HTTP GET method on route: /api/components
 */
export async function get(db: PrismaClient, req: express.Request, res: express.Response) : Promise<any>
{
    let cpus = await componentsDataHandler.getCpus(db);
    let motherboards = await componentsDataHandler.getMotherboards(db);
    let rams = await componentsDataHandler.getRAMs(db);
    let disks =  await componentsDataHandler.getDisks(db);
    let gpus = await componentsDataHandler.getGPUs(db);
    let psus = await componentsDataHandler.getPSUs(db);
    let cases = await componentsDataHandler.getCases(db);
    let screens = await componentsDataHandler.getScreens(db);
    let keyboards = await componentsDataHandler.getKeyboards(db);
    let mouses = await componentsDataHandler.getMouses(db);

    //cpus instead of cpu to match the format required by frontend components
    let components = {
        "cpu": cpus,
        "motherboard" : motherboards,
        "ram" : rams,
        "disk" : disks,
        "gpu" : gpus,
        "psu" : psus,
        "case" : cases,
        "screen" : screens,
        "keyboard" : keyboards,
        "mouse" : mouses
    };
    
    res.send(JSON.stringify(components));
}

/**
 * Retrieves components of all types by category
 * Note: ommitted db tables: computer, memory, storage 
 * Category is required
 * Handles HTTP GET method on route: /api/components/{category}
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
    let cpus = await componentsDataHandler.getCpusByCategory(db, category as string);
    let motherboards = await componentsDataHandler.getMotherboardsByCategory(db, category as string);
    let rams = await componentsDataHandler.getRAMsByCategory(db, category as string);
    let disks =  await componentsDataHandler.getDisksByCategory(db, category as string);
    let gpus = await componentsDataHandler.getGPUsByCategory(db, category as string);
    let psus = await componentsDataHandler.getPSUsByCategory(db, category as string);
    let cases = await componentsDataHandler.getCasesByCategory(db, category as string);
    let screens = await componentsDataHandler.getScreensByCategory(db, category as string);
    let keyboards = await componentsDataHandler.getKeyboardsByCategory(db, category as string);
    let mouses = await componentsDataHandler.getMousesByCategory(db, category as string);

     //cpus instead of cpu to match the format required by frontend components
     let components = {
        "cpu": cpus,
        "motherboard" : motherboards,
        "ram" : rams,
        "disk" : disks,
        "gpu" : gpus,
        "psu" : psus,
        "case" : cases,
        "screen" : screens,
        "keyboard" : keyboards,
        "mouse" : mouses
    };
    
    res.send(JSON.stringify(components));
}
