import {Memory, Storage, PrismaClient} from '@prisma/client';

//"return await" still returns a promise which is not the final result, why?

export async function getCpus(db : PrismaClient) : Promise<any[]>
{
    return db.cPU.findMany(); 
}

export async function getCpusByCategory(db : PrismaClient, category: string) : Promise<any[]>
{
    return db.cPU.findMany({ where: { category: category } });
}

export async function getMotherboards(db : PrismaClient) : Promise<any[]>
{
    return db.motherboard.findMany();
}

export async function getMotherboardsByCategory(db : PrismaClient, category: string) : Promise<any[]>
{
    return db.motherboard.findMany({ where: { category: category } });
}

export async function getRAMs(db : PrismaClient) : Promise<any[]>
{
    return db.rAM.findMany();
}

export async function getRAMsByCategory(db : PrismaClient, category: string) : Promise<any[]>
{
    return db.rAM.findMany({ where: { category: category } });
}

export async function getDisks(db : PrismaClient) : Promise<any[]>
{
    return db.disk.findMany();
}

export async function getDisksByCategory(db : PrismaClient, category: string) : Promise<any[]>
{
    return db.disk.findMany({ where: { category: category } });
}

export async function getGPUs(db : PrismaClient) : Promise<any[]>
{
    return db.gPU.findMany();
}

export async function getGPUsByCategory(db : PrismaClient, category: string) : Promise<any[]>
{
    return db.gPU.findMany({ where: { category: category } });
}

export async function getPSUs(db : PrismaClient) : Promise<any[]>
{
    return db.pSU.findMany();
}

export async function getPSUsByCategory(db : PrismaClient, category: string) : Promise<any[]>
{
    return db.pSU.findMany({ where: { category: category } });
}

export async function getCases(db : PrismaClient) : Promise<any[]>
{
    return db.case.findMany();
}

export async function getCasesByCategory(db : PrismaClient, category: string) : Promise<any[]>
{
    return db.case.findMany({ where: { category: category } });
}

export async function getScreens(db : PrismaClient) : Promise<any[]>
{
    return db.screen.findMany();
}

export async function getScreensByCategory(db : PrismaClient, category: string) : Promise<any[]>
{
    return db.screen.findMany({ where: { category: category } });
}


export async function getKeyboards(db : PrismaClient) : Promise<any[]>
{
    return db.keyboard.findMany();
}

export async function getKeyboardsByCategory(db : PrismaClient, category: string) : Promise<any[]>
{
    return db.keyboard.findMany({ where: { category: category } });
}

export async function getMouses(db : PrismaClient) : Promise<any[]>
{ 
    return db.mouse.findMany();
}

export async function getMousesByCategory(db : PrismaClient, category: string) : Promise<any[]>
{
    return db.mouse.findMany({ where: { category: category } });
}



/**
 * Used for computer creation
 * @param db 
 * @param ramId 
 * @param computerId 
 * @returns 
 */
export async function createRamStorageForComputer(db: PrismaClient, ramId: number, computerId: number) : Promise<Memory | null>{
    return db.memory.create({
        data: {
            computer_id: computerId,
            ramId: ramId
        }
    });
};

/**
 * Used for computer creation
 * @param db 
 * @param diskId 
 * @param computerId 
 * @returns 
 */
export async function createDiskStorageForComputer(db: PrismaClient, diskId: number, computerId: number) : Promise<Storage | null>{
    return db.storage.create({
        data: {
            computer_id: computerId,
            disk_id: diskId
        }
    });
};