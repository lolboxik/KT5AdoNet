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

export async function POST(request) {
    try {
      const body = await request.json()
      
      const categoryId = body.categoryId ? Number(body.categoryId) : null
  
      if (categoryId && isNaN(categoryId)) {
        return new Response(JSON.stringify({ 
          error: "Invalid category ID format" 
        }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        })
      }
  
      const newProduct = await prisma.product.create({
        data: {
          title: body.title,
          price: parseInt(body.price, 10),
          categoryId: categoryId
        }
      })
  
      return new Response(JSON.stringify(newProduct), {
        status: 201,
        headers: { 'Content-Type': 'application/json' }
      })
    } catch (error) {
      return new Response(JSON.stringify({ 
        error: error.message,
        details: error.meta?.target || null
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      })
    }
  }