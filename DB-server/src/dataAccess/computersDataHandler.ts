import { Computer, Memory, PrismaClient } from '@prisma/client';
import * as componentsDataHandler from "../dataAccess/componentsDataHandler";


/**
* Gets all computers for order by @param orderId with components included
*/
export async function getAllWithComponents(db: PrismaClient, orderId: number): Promise<Computer[]> {
    return db.computer.findMany({
        where: {
            order_id: orderId
        },
        include: {
            case: true,
            cpu: true,
            gpu: true,
            motherboard: true,
            order: true,
            psu: true,
            storages: {
                include: {
                    disk: true
                }
            },
            memories: {
                include: {
                    ram: true
                }
            }
        },
    });
}

/**
* Gets a computer by @param id with components included
* @returns Order or null if no match for @param id
*/
export async function getWithComponents(db: PrismaClient, id: number): Promise<Computer | null> {
    return db.computer.findUnique({
        where: {
            id: id
        },
        include: {
            case: true,
            cpu: true,
            gpu: true,
            motherboard: true,
            order: true,
            psu: true,
            storages: {
                include: {
                    disk: true
                }
            },
            memories: {
                include: {
                    ram: true
                }
            }
        },
    });
}

export async function createNew(db: PrismaClient,
     orderId: number, category: string, totalPrice: number,
      cpuId: number, gpuId: number, ramId: number, motherboardId: number,
      diskId: number, psuId: number, caseId: number): Promise<Computer> {

    const newComputer = await db.computer.create({data: {
        order_id: orderId,
        total_orice: totalPrice,
        category: category,
        case_id: caseId,
        cpu_id: cpuId,
        gpu_id: gpuId,
        motherboard_id: motherboardId,
        psu_id: psuId,
    }});
    componentsDataHandler.createRamStorageForComputer(db, ramId, newComputer.id);
    componentsDataHandler.createDiskStorageForComputer(db, diskId, newComputer.id);
    return newComputer;
}



