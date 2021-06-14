import {PrismaClient} from '@prisma/client';

/**
 * Gets all orders for specified user by user id
 * Default ordering: by id descending
 */
export async function getByUser(db : PrismaClient, userId: number) : Promise<any[]>
{
    return db.order.findMany({
        where: {
            user_id: userId
        },
        orderBy: {
            id: "desc"
        }
    });
}

/**
 * Gets orders for specified user by user id
 * Takes only top n
 * Default ordering: by id descending
 */
 export async function getByUserTakeN(db : PrismaClient, userId: number, amount: number) : Promise<any[]>
 {
    return db.order.findMany({
        where: {
            user_id: userId
        },
        orderBy: {
            id: "desc"
        },
        take: amount
    });
 }
