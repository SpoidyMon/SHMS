import {PrismaClient} from "@prisma/client"
import {PrismaPg} from "@prisma/adapter-pg"
import {Pool} from "pg"
import config from "./config.js";


export const pool =new Pool({connectionString:config.DATABASE_URL});

const adapter=new PrismaPg(pool)

export const prisma=new PrismaClient({adapter})

export async function connectToDB() {
    try {
        await prisma.$connect();
        console.log("Server connected to DB")
    } catch (error) {
        console.error("Server failed to connect DB"+error)
        throw error
    }
}

export default prisma;