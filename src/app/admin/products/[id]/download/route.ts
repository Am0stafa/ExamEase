import db from '@/db/db';
import { notFound } from 'next/navigation';
import { NextResponse, NextRequest } from 'next/server'
import fs from "fs/promises"

export async function GET(request: Request, {params: {id}}: {params: {id:string}}) { 

  const product = await db.product.findUnique({
    where: {
      id
    },
    select:{
      filePath:true,
      name:true
    }
  })

  if(!product || product == null) {
    return notFound()
  } 
  
  const { size } = await fs.stat(product.filePath ?? '');
  const file = await fs.readFile(product.filePath?? '');
  const extension = product.filePath?.split('.').pop()?? '';
  const blob = new Blob([file], { type: 'image/jpeg' });

  return new Response(file, {headers:{
    "Content-Disposition": `attachment; filename=${product.name}.${extension}`,
    "Content-Length": size.toString(),
    },
  })
}