import { PrismaClient } from '@prisma/client';
import bcrypt from "bcrypt";

const prisma = new PrismaClient()

async function main() {
    const alice = await prisma.user.upsert({
        where: { number: '111111' },
        update: {},
        create: {
            number: '111111',
            password: await bcrypt.hash('alice', 10),
            name: 'alice',
            Balance: {
                create: {
                    amount: 2000,
                    locked: 0
                }
            },
            onRampTransaction: {
                create: {
                    startTime: new Date(),
                    status: "Success",
                    amount: 2000,
                    token: "token_1",
                    provider: "HDFC Banl"

                },
            },
        },
    })
}