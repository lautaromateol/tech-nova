import { API_URL } from "@/constants/api-url"
import { paths } from "@/lib/api"
import { ProductCard } from "./product-card"

type Category = paths["/categories/{id}"]["get"]["responses"]["200"]["content"]["application/json"]

export async function getCategory(id: string): Promise<Category | null> {
  const response = await fetch(`${API_URL}/categories/${id}`, {
    next: { tags: [`category-${id}`] }
  })

  if (!response.ok) {
    return null
  }

  const data = await response.json()

  return data
}

export async function RelatedProducts({ categoryId, slug }: { categoryId: string, slug: string }) {

  const category = await getCategory(categoryId)

  if (!category) {
    return null
  }

  const products = category.products.filter((product) => product.slug !== slug)

  return (
    <div className="mt-16">
      <h2 className="mb-6 text-2xl font-bold">Related Produts</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
