import {PrismaClient} from '@prisma/client';

async function getCpus(db : PrismaClient)
{
    return await db.cPU.findMany();
}

async function getCpusByCategory(db : PrismaClient, category: string)
{
    const cpus = await db.cPU.findMany(
        {
            where: {
                category: category
            }
        }
    );
}



const getMotherboards = async (db : PrismaClient) =>
{
    const cpus = await db.cPU.findMany();
}

const getRAMs = async (db : PrismaClient) =>
{
    const cpus = await db.cPU.findMany();
}

const getDisks = async (db : PrismaClient) =>
{
    const cpus = await db.cPU.findMany();
}

const getGPUs = async (db : PrismaClient) =>
{
    const cpus = await db.cPU.findMany();
}

const getPSUs = async (db : PrismaClient) =>
{
    const cpus = await db.cPU.findMany();
}

const getCases = async (db : PrismaClient) =>
{
    const cpus = await db.cPU.findMany();
}

const getMonitors = async (db : PrismaClient) =>
{
    const cpus = await db.cPU.findMany();
}

const getKeyboards = async (db : PrismaClient) =>
{
    const cpus = await db.cPU.findMany();
}

const getMouses = async (db : PrismaClient) =>
{
    const cpus = await db.cPU.findMany();
}



