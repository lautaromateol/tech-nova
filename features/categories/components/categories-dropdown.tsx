import { ChevronDown } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { API_URL } from "@/constants/api-url";
import { paths } from "@/lib/api";
import Link from "next/link";

type Categories = paths["/categories"]["get"]["responses"]["200"]["content"]["application/json"]

async function getCategories(): Promise<Categories> {
  const response = await fetch(`${API_URL}/categories`, {
    next: { tags: ["categories"] }
  })

  if (!response.ok) {
    return []
  }

  const data = await response.json()

  return data
}

export async function CategoriesDropdown() {

  const categories = await getCategories()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <li className="flex items-center gap-x-1 font-medium text-base hover:underline cursor-pointer">
          Categories
          <ChevronDown className="size-4" />
        </li>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <div className="space-y-2 w-2xl max-w-screen-2xl h-64 px-4 py-2">
          <div className="flex items-start justify-evenly gap-x-4 mt-6">
            {categories.map((category) => (
              <div key={category.id}>
                <p className="text-base font-semibold capitalize mb-2">{category.name}</p>
                <div className="flex flex-col space-y-2">
                  {category.products.map((product) => (
                    <Link key={product.id} href={`/product/${product.slug}`}>
                      <p key={product.id} className="text-sm text-muted-foreground hover:underline">{product.name}</p>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
