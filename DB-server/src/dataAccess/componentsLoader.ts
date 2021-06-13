import {PrismaClient} from '@prisma/client';

export async function getCpus(db : PrismaClient) 
{
    return await db.cPU.findMany(); 
}

export async function getCpusByCategory(db : PrismaClient, category: string)
{
    return await db.cPU.findMany({ where: { category: category } });
}

export async function getMotherboards(db : PrismaClient)
{
    return await db.motherboard.findMany();
}

export async function getMotherboardsByCategory(db : PrismaClient, category: string)
{
    return await db.motherboard.findMany({ where: { category: category } });
}

export async function getRAMs(db : PrismaClient)
{
    return await db.rAM.findMany();
}

export async function getRAMsByCategory(db : PrismaClient, category: string)
{
    return await db.rAM.findMany({ where: { category: category } });
}

export async function getDisks(db : PrismaClient)
{
    return await db.disk.findMany();
}

export async function getDisksByCategory(db : PrismaClient, category: string)
{
    return await db.disk.findMany({ where: { category: category } });
}

export async function getGPUs(db : PrismaClient)
{
    return await db.gPU.findMany();
}

export async function getGPUsByCategory(db : PrismaClient, category: string)
{
    return await db.gPU.findMany({ where: { category: category } });
}

export async function getPSUs(db : PrismaClient)
{
    return await db.pSU.findMany();
}

export async function getPSUsByCategory(db : PrismaClient, category: string)
{
    return await db.pSU.findMany({ where: { category: category } });
}

export async function getCases(db : PrismaClient)
{
    return await db.case.findMany();
}

export async function getCasesByCategory(db : PrismaClient, category: string)
{
    return await db.case.findMany({ where: { category: category } });
}

export async function getMonitors(db : PrismaClient)
{
    return await db.screen.findMany();
}

export async function getMonitorsByCategory(db : PrismaClient, category: string)
{
    return await db.screen.findMany({ where: { category: category } });
}


export async function getKeyboards(db : PrismaClient)
{
    return await db.keyboard.findMany();
}

export async function getKeyboardsByCategory(db : PrismaClient, category: string)
{
    return await db.keyboard.findMany({ where: { category: category } });
}

export async function getMouses(db : PrismaClient)
{ 
    return await db.mouse.findMany();
}

export async function getMousesByCategory(db : PrismaClient, category: string)
{
    return await db.mouse.findMany({ where: { category: category } });
}

