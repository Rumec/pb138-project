import { PrismaClient } from '@prisma/client';
import { exception } from 'console';
import { ram,cpu,mother,psu, gpu, cse, disk, user, keyboard, mouse, screen } from "../components/all"
const prisma = new PrismaClient();

async function main() {
    
await prisma.rAM.deleteMany();
    for(let x of ram){
        await prisma.rAM.create({
            data: x
        })
    }
  await prisma.cPU.deleteMany();
    for(let x of cpu){
        await prisma.cPU.create({
            data: x
        })
    }

    await prisma.motherboard.deleteMany();
    for(let x of mother){
        await prisma.motherboard.create({
            data: x
        })
    }

    await prisma.pSU.deleteMany();
    for(let x of psu){
        await prisma.pSU.create({
            data: x
        })
    }

    await prisma.gPU.deleteMany();
    for(let x of gpu){
        await prisma.gPU.create({
            data: x
        })
    }

    await prisma.case.deleteMany();
    for(let x of cse){
        await prisma.case.create({
            data: x
        })
    }

    await prisma.disk.deleteMany();
    for(let x of disk){
        await prisma.disk.create({
            data: x
        })
    }

    await prisma.user.deleteMany();
    for(let x of user){
        await prisma.user.create({
            data: x
        })
    }

    await prisma.keyboard.deleteMany();
    for(let x of keyboard){
        await prisma.keyboard.create({
            data: x
        })
    }

    await prisma.mouse.deleteMany();
    for(let x of mouse){
        await prisma.mouse.create({
            data: x
        })
    }

    await prisma.screen.deleteMany();
    for(let x of screen){
        await prisma.screen.create({
            data: x
        })
    }
	
	
    /*const testUser = {
        name: "Otto Normalverbraucher",
        user_name: "Otta",
        salt: "somerandomsalt",
        algorithm: "Dontusedfsforencryptionplspls",
        password_hash: "somehash123",
    };

    const userInserted = await prisma.user.create({
        data: testUser
    });

    // const testOrder = {
    //     totalPrice: 666,
    //     userId: userInserted.id
    // };
    //
    // await prisma.order.create({
    //     data: testOrder
    // });

    // for testing of API
    for (let i = 0; i < 15; ++i) {
        await prisma.order.create({
            data: {
                total_price: i,
                user_id: userInserted.id
            }
        })
    }

    const userTableCheckData = await prisma.user.findMany();
    const orderTableCheckData = await prisma.order.findMany();

    console.log(`Data in User table: ${JSON.stringify(userTableCheckData)}\nData in Order table: ${JSON.stringify(orderTableCheckData)}`);
	*/
}

main().catch(e => {
    throw e;
}).finally(async () => {
    await prisma.$disconnect();
})