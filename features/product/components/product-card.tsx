import Link from "next/link"
import Image from "next/image"
import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { paths } from "@/lib/api"

type Product = paths["/categories/{id}"]["get"]["responses"]["200"]["content"]["application/json"]["products"][0]

export function ProductCard({ product }: { product: Product }) {
  return (
    <Card key={product.id} className="overflow-hidden">
      <div className="relative aspect-square">
        <Image
          src={product.imgUrl}
          alt={product.name}
          fill
          className="object-cover transition-transform hover:scale-105"
        />
      </div>
      <CardContent className="p-4">
        <h3 className="line-clamp-1 font-medium">{product.name}</h3>
        <div className="mt-1 flex">
          {[...Array(5)].map((_, j) => (
            <Star
              key={j}
              className={`h-4 w-4 ${j < 4 ? "fill-primary text-primary" : "fill-muted text-muted-foreground"}`}
            />
          ))}
        </div>
        <div className="mt-2 flex items-baseline space-x-2">
          <span className="font-bold">${product.price}</span>
          {/* <span className="text-sm text-muted-foreground line-through">€149,99</span> */}
        </div>
        <Button variant="outline" className="mt-3 w-full">
          <Link href={`/product/${product.slug}`}>
            Visit Product
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}
