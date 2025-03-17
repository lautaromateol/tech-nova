import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Star, Truck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { paths } from "@/lib/api"
import { API_URL } from "@/constants/api-url"
import { AddToCartButton } from "@/features/cart/components/add-to-cart-button"
import { RelatedProducts } from "@/features/product/components/related-products"

type Product = paths["/products/slug/{slug}"]["get"]["responses"]["200"]["content"]["application/json"]

async function getProductBySlug(slug: string): Promise<Product> | never {
  const response = await fetch(`${API_URL}/products/slug/${slug}`, {
    next: {
      tags: [`product-${slug}`]
    }
  })

  if (!response.ok) {
    throw notFound()
  }

  const data = await response.json()

  return data
}

export default async function ProductPage({ params }: { params: { slug: string; } }) {

  const { slug } = await params

  const product = await getProductBySlug(slug)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-4">
        <Link href="/" className="text-sm text-muted-foreground hover:text-primary">
          Inicio
        </Link>{" "}
        /{" "}
        <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
          Electrónica
        </Link>{" "}
        /{" "}
        <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
          Smartphones
        </Link>{" "}
        / <span className="text-sm">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Product Image */}
        <div className="relative h-[400px] w-full overflow-hidden rounded-lg bg-muted">
          <Image
            src={product.imgUrl}
            alt={product.imgUrl}
            fill
            className="object-contain"
            priority
          />
        </div>
        {/* Product Info */}
        <div className="flex flex-col space-y-4">
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <div className="mt-2 flex items-center">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${i < 4 ? "fill-primary text-primary" : "fill-muted text-muted-foreground"}`}
                  />
                ))}
              </div>
              <span className="ml-2 text-sm text-muted-foreground">128 reviews</span>
            </div>
          </div>

          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-bold">${product.price}</span>
            {/* <span className="text-lg text-muted-foreground line-through">€999,99</span>
            <span className="rounded-md bg-green-100 px-2 py-1 text-sm font-medium text-green-800">-10%</span> */}
          </div>

          <Separator />


          <div className="flex flex-col space-y-2">
          <AddToCartButton product={product} />
            <Button size="lg">Buy now</Button>
          </div>

          <div className="rounded-lg bg-muted p-4">
            <div className="flex items-center space-x-2">
              <Truck className="h-5 w-5 text-green-600" />
              <span className="font-medium">Free shipping</span>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">Estimated deliver: 2-4 laboral days</p>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <Tabs defaultValue="descripcion">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="descripcion">Description</TabsTrigger>
            <TabsTrigger value="opiniones">Reviews</TabsTrigger>
          </TabsList>
          <TabsContent value="descripcion" className="mt-4">
            <div className="prose max-w-none">
              <p>
                {product.description}
              </p>
            </div>
          </TabsContent>
          <TabsContent value="opiniones" className="mt-4">
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <Image
                  src="/placeholder.svg?height=40&width=40"
                  alt="Avatar de usuario"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Carlos Martínez</h4>
                    <span className="text-sm text-muted-foreground">Hace 2 semanas</span>
                  </div>
                  <div className="mt-1 flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < 5 ? "fill-primary text-primary" : "fill-muted text-muted-foreground"}`}
                      />
                    ))}
                  </div>
                  <p className="mt-2 text-sm">
                    Excelente teléfono, la cámara es impresionante y la batería dura todo el día incluso con uso
                    intensivo. La pantalla es brillante y nítida, perfecta para ver contenido multimedia. Muy satisfecho
                    con mi compra.
                  </p>
                </div>
              </div>
              <Separator />
              <div className="flex items-start space-x-4">
                <Image
                  src="/placeholder.svg?height=40&width=40"
                  alt="Avatar de usuario"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Laura Gómez</h4>
                    <span className="text-sm text-muted-foreground">Hace 1 mes</span>
                  </div>
                  <div className="mt-1 flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < 4 ? "fill-primary text-primary" : "fill-muted text-muted-foreground"}`}
                      />
                    ))}
                  </div>
                  <p className="mt-2 text-sm">
                    Muy buen teléfono en general, aunque se calienta un poco cuando juegas durante mucho tiempo. La
                    cámara es fantástica y el rendimiento es excelente. La interfaz es intuitiva y fácil de usar.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

     <RelatedProducts categoryId={product.categoryId} slug={product.slug} />
    </div> 
  )
}

