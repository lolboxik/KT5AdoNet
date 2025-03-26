import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function GET () {
    try {
        const products = await prisma.product.findMany(); 
        return new Response(JSON.stringify(products),  { 
            status: 200, 
        });
     } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
        });
    }
}