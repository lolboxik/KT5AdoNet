import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function GET () {
    try {
        const posts = await prisma.post.findMany(); 
        return new Response(JSON.stringify(posts),  { 
            status: 200, 
        });
     } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
        });
    }
}