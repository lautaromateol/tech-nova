import Link from "next/link";
import Image from "next/image";
import { ChevronDown, Home, ShoppingCart } from "lucide-react";
import { CategoriesDropdown } from "@/features/categories/components/categories-dropdown";
import { Auth } from "./auth";

const routes = [
  {
    title: "Home",
    href: "/",
    icon: Home
  },
  {
    title: "Categories",
    icon: ChevronDown
  },
  {
    title: "Cart",
    href: "/cart",
    icon: ShoppingCart
  }
]

export function Nav() {
  return (
    <header className="w-full h-14 sticky px-4 flex items-center justify-between">
      <Image
        src="/logo.svg"
        alt="TechNova logo"
        width={55}
        height={55}
      />
      <nav className="flex items-center gap-x-10">
        <ul className="flex items-center gap-x-8">
          {routes.map((route, i) => {
            const Icon = route.icon

            if (!route.href) {
              return (
                <CategoriesDropdown key={i} />
              )
            }

            return (
              <Link key={i} href={route.href}>
                <li className="flex items-center gap-x-1 font-medium text-base hover:underline">
                  {route.title}
                  <Icon className="size-4" />
                </li>
              </Link>
            )
          })}
        </ul>
        <Auth />
      </nav>
    </header>
  )
}
