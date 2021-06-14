import {Order, PrismaClient} from '@prisma/client';

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
 * Gets orders for specified user by user's id (@param userId)
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

 /**
 * Gets an order by @param id
 * @returns Order or null if no match for @param id
 */
  export async function get(db : PrismaClient, id: number) : Promise<Order | null>
  {
     return db.order.findUnique({
         where: {
             id: id
         },
     });
  }

  
 /**
 * Sets {@link Order.canceled} flag to true for an order if it exists
 */
  export async function cancel(db : PrismaClient, id: number) : Promise<void>
  {
     db.order.update({
         where: {
            id: id
         },
         data: {
             canceled: true
         },
     });
  }
 
