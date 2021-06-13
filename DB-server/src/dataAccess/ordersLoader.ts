import {PrismaClient} from '@prisma/client';

export async function getOrders(db : PrismaClient, userId: number) : Promise<any[]>
{
    return db.order.findMany({ where: { user_id: userId } });
}
