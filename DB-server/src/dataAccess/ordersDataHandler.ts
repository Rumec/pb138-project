import { Order, PrismaClient } from '@prisma/client';

/**
 * Gets all orders for specified user by user id
 * Default ordering: by id descending
 */
export async function getByUser(db: PrismaClient, userId: number): Promise<Order[]> {
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
export async function getByUserTakeN(db: PrismaClient, userId: number, amount: number): Promise<Order[]> {
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
export async function get(db: PrismaClient, id: number): Promise<Order | null> {
    return db.order.findUnique({
        where: {
            id: id
        },
    });
}


/**
* Sets {@link Order.canceled} flag to true for an order if it exists
*/
export async function cancel(db: PrismaClient, id: number): Promise<void> {
    db.order.update({
        where: {
            id: id
        },
        data: {
            canceled: true
        },
    });
}

/**
* Gets an order by @param id with components included (except computer, computer is loaded separately {@link computersDataHandler})
* @returns Order or null if no match for @param id
*/
export async function getWithComponentsExceptComputer(db: PrismaClient, id: number): Promise<Order | null> {
    return db.order.findUnique({
        where: {
            id: id
        },
        include: {
            keyboard: true,
            mouse: true,
            user: true,
            screen: true,
            computers: false //to be loaded separately
        },
    });
}

/**
 * Creates a new order
 * The computer must be assigned to the order afterwards
 * Cancelled and Paid flags are set to false by default
 * @param db 
 * @param userId required
 * @param computer required
 * @param mouseId optional
 * @param keyboardId optional
 * @param screenId optional
 * @param totalPrice required
 * @returns 
 */
export function createNewWithoutComputer(db: PrismaClient,
    userId: number, mouseId: number | null, keyboardId: number | null, screenId: number | null,
     totalPrice: number): Promise<Order> {
    const newOrderData = {
        canceled: false,
        paid: false,
        total_price: totalPrice,
        user_id: userId,
        screen_id: screenId,
        mouse_id: mouseId,
        keyboard_id: keyboardId
    };
    return db.order.create({data: newOrderData});
}