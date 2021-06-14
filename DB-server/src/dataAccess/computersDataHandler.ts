import { Computer, Order, PrismaClient } from '@prisma/client';

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



