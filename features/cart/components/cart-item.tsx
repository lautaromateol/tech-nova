"use client"
import Image from "next/image";
import { useState } from "react";
import { MinusIcon, PlusIcon, Trash } from "lucide-react";
import { CartContextInterface, CartItem as CartItemInterface, useCartContext } from "@/contexts/cart-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function CartItem({ item }: { item: CartItemInterface }) {

   const { addItemToTheCart, removeItemFromTheCart, cartItems }: CartContextInterface = useCartContext()

  const productInTheCart = cartItems.find((product) => item.id === product.id)

  const [quantity, setQuantity] = useState<number>(productInTheCart?.quantity ?? 0)

  function handleIncrementQuantity() {
    setQuantity((prev) => {
      addItemToTheCart({ id: item.id, price: item.price, name: item.name, imgUrl: item.imgUrl, quantity: prev + 1 })

      return prev + 1
    })
  }

  function handleDecrementQuantity() {
    if (quantity === 1) {
      return removeItemFromTheCart(item.id)
    }

    setQuantity((prev) => {
      addItemToTheCart({ id: item.id, price: item.price, name: item.name, imgUrl: item.imgUrl, quantity: prev - 1 })

      return prev - 1
    })
  }

  return (
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-4">
          <div className="relative size-16">
            <Image
              src={item.imgUrl}
              alt={item.name}
              className="object-cover"
              fill
            />
          </div>
          <p className="font-medium">{item.name}</p>
        </div>
        <div className="flex items-center gap-x-8">
          <div className="flex items-center gap-x-1">
            <Button onClick={handleDecrementQuantity} variant="ghost"><MinusIcon /></Button>
            <Input className="w-8" value={item.quantity} readOnly />
            <Button onClick={handleIncrementQuantity} variant="ghost"><PlusIcon /></Button>
          </div>
          <p className="font-bold">${(item.price * item.quantity).toFixed(2)}</p>
          <Button onClick={() => removeItemFromTheCart(item.id)} variant="ghost">
            <Trash />
          </Button>
        </div>
      </div>
  )
}
