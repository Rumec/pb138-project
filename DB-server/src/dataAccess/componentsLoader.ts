import {PrismaClient} from '@prisma/client';
export {getCpus, getCpusByCategory}
export {getMotherboards, getMotherboardsByCategory}
export {getRAMs, getRAMsByCategory}
export {getDisks, getDisksByCategory}
export {getGPUs, getGPUsByCategory}
export {getPSUs, getPSUsByCategory}
export {getMonitors, getMonitorsByCategory}
export {getKeyboards, getKeyboardsByCategory}
export {getMouses, getMousesByCategory}

async function getCpus(db : PrismaClient) 
{
    return await db.cPU.findMany(); 
}

async function getCpusByCategory(db : PrismaClient, category: string)
{
    return await db.cPU.findMany({ where: { category: category } });
}

async function getMotherboards(db : PrismaClient)
{
    return await db.motherboard.findMany();
}

async function getMotherboardsByCategory(db : PrismaClient, category: string)
{
    return await db.motherboard.findMany({ where: { category: category } });
}

async function getRAMs(db : PrismaClient)
{
    return await db.rAM.findMany();
}

async function getRAMsByCategory(db : PrismaClient, category: string)
{
    return await db.rAM.findMany({ where: { category: category } });
}

async function getDisks(db : PrismaClient)
{
    return await db.disk.findMany();
}

async function getDisksByCategory(db : PrismaClient, category: string)
{
    return await db.disk.findMany({ where: { category: category } });
}

async function getGPUs(db : PrismaClient)
{
    return await db.gPU.findMany();
}

async function getGPUsByCategory(db : PrismaClient, category: string)
{
    return await db.gPU.findMany({ where: { category: category } });
}

async function getPSUs(db : PrismaClient)
{
    return await db.pSU.findMany();
}

async function getPSUsByCategory(db : PrismaClient, category: string)
{
    return await db.pSU.findMany({ where: { category: category } });
}

async function getCases(db : PrismaClient)
{
    return await db.case.findMany();
}

async function getCasesByCategory(db : PrismaClient, category: string)
{
    return await db.case.findMany({ where: { category: category } });
}

async function getMonitors(db : PrismaClient)
{
    return await db.screen.findMany();
}

async function getMonitorsByCategory(db : PrismaClient, category: string)
{
    return await db.screen.findMany({ where: { category: category } });
}


async function getKeyboards(db : PrismaClient)
{
    return await db.keyboard.findMany();
}

async function getKeyboardsByCategory(db : PrismaClient, category: string)
{
    return await db.keyboard.findMany({ where: { category: category } });
}

async function getMouses(db : PrismaClient)
{ 
    return await db.mouse.findMany();
}

async function getMousesByCategory(db : PrismaClient, category: string)
{
    return await db.mouse.findMany({ where: { category: category } });
}

