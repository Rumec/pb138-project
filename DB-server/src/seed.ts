import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
    
    const testUser = {
        name: "Otto Normalverbraucher",
        userName: "Otta",
        salt: "somerandomsalt",
        algorithm: "Dontusedfsforencryptionplspls",
        passwordHash: "somehash123",
    };

    const userInserted = await prisma.user.create({
        data: testUser
    });

    const testOrder = {    
        totalPrice: 666,
        userId: userInserted.id
    };

    await prisma.order.create({
        data: testOrder
    });

    const userTableCheckData = await prisma.user.findMany();
    const orderTableCheckData = await prisma.order.findMany();

    console.log(`Data in User table: ${JSON.stringify(userTableCheckData)}\nData in Order table: ${JSON.stringify(orderTableCheckData)}`);
}

main().catch(e => {
    throw e;
}).finally(async () => {
    await prisma.$disconnect();
})