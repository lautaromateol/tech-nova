"use client"
import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { CartContextInterface, useCartContext } from "@/contexts/cart-context";
import { paths } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Product = paths["/products/slug/{slug}"]["get"]["responses"]["200"]["content"]["application/json"]

export function AddToCartButton({ product }: { product: Product }) {

  const { addItemToTheCart, removeItemFromTheCart, cartItems }: CartContextInterface = useCartContext()

  const productInTheCart = cartItems.find((item) => item.id === product.id)

  const [quantity, setQuantity] = useState<number>(productInTheCart?.quantity ?? 0)

  function handleIncrementQuantity() {
    if (quantity === product.stock) return

    setQuantity((prev) => {
      addItemToTheCart({ id: product.id, price: product.price, name: product.name, imgUrl: product.imgUrl, quantity: prev + 1 })

      return prev + 1
    })
  }

  function handleDecrementQuantity() {
    if (quantity === 1) {
      return removeItemFromTheCart(product.id)
    }

    setQuantity((prev) => {
      addItemToTheCart({ id: product.id, price: product.price, name: product.name, imgUrl: product.imgUrl, quantity: prev - 1 })

      return prev - 1
    })
  }

  if (!productInTheCart) {
    return (
      <Button
        onClick={() => addItemToTheCart({ id: product.id, price: product.price, name: product.name, imgUrl: product.imgUrl, quantity: 1 })}
        className="w-full" variant="outline">
        Add to cart
      </Button>
    )
  }

  return (
    <div className="flex items-center gap-x-0.5">
      <Button onClick={handleDecrementQuantity} variant="outline"><Minus /></Button>
      <Input type="number" value={quantity} readOnly />
      <Button onClick={handleIncrementQuantity} variant="outline"><Plus /></Button>
    </div>
  )
}
