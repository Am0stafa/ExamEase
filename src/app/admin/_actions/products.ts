"use server"
import db from "@/db/db"
import { z } from "zod"
import fs from "fs/promises"
import { revalidatePath } from "next/cache"
import { notFound, redirect } from "next/navigation"

const fileSchema = z.instanceof(File, {message: "Required"})
const imageSchema = fileSchema.refine((file) => file.size === 0 || file.type.startsWith("image/"), "Required")

const addSchema = z.object({
  name: z.string().min(1),
  priceInCents: z.coerce.number().int().min(1), // try to convert to a number first and if it cant, then throw an error
  description: z.string().min(1),
  file: fileSchema.refine((file) => file.size > 0, "Required"), 
  image: imageSchema.refine((file) => file.size > 0, "Required"), 
})

export async function addProduct(prevState: unknown,formData: FormData) {
  const result = addSchema.safeParse(Object.fromEntries(formData.entries()))
  if (result.success === false){
    return result.error.formErrors.fieldErrors
  }

  const data = result.data

  await fs.mkdir("products", { recursive: true })
  const filePath = `products/${crypto.randomUUID()}-${data.file.name}`
  await fs.writeFile(filePath, Buffer.from(await data.file.arrayBuffer()))

  await fs.mkdir("public/products", { recursive: true })
  const imagePath = `/products/${crypto.randomUUID()}-${data.image.name}`
  await fs.writeFile(
    `public${imagePath}`,
    Buffer.from(await data.image.arrayBuffer())
  )

  await db.product.create({
    data: {
      isAvailableForPurchase: false,
      name: data.name,
      priceInCents: data.priceInCents,
      description: data.description,
      filePath,
      imagePath,
    }
  })

  revalidatePath("/")
  revalidatePath("/products")

  redirect("/admin/products")
}

export async function updateProduct() {
  
}

export async function toggleProductAvailability(id: string, isAvailableForPurchase: boolean) {
  await db.product.update({
    where: { id },
    data: { isAvailableForPurchase },
  })
}

export async function deleteProduct(id: string) {
  const product = await db.product.delete({ where: { id } })

  if (product == null) return notFound()

  if (product.filePath != null) await fs.unlink(product.filePath)
  if (product.imagePath != null) await fs.unlink(`public${product.imagePath}`)
  

  revalidatePath("/")
  revalidatePath("/products")
}