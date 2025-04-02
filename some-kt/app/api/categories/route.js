import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function GET () {
    try {
        const categories = await prisma.category.findMany(); 
        return new Response(JSON.stringify(categories),  { 
            status: 200, 
        });
     } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
        });
    }
}

export async function POST(request) {
    try {
      const body = await request.json()
  
      if (!body.title) {
        return new Response(JSON.stringify({ error: "такая категория уже есть" }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        })
      }
  
      const newCategory = await prisma.category.create({
        data: {
          title: body.title,
        }
      })
  
      return new Response(JSON.stringify(newCategory), {
        status: 201,
        headers: { 'Content-Type': 'application/json' }
      })
    } catch (error) {
      if (error.code === 'P2002') {
        return new Response(JSON.stringify({ 
          error: "ощибка"
        }), {
          status: 409,
          headers: { 'Content-Type': 'application/json' }
        })
      }
      
      return new Response(JSON.stringify({ 
        error: error.message,
        details: error.meta?.target || null
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      })
    }
  }