"use client"
import { useRouter } from "next/navigation"
import { CartContextInterface, useCartContext } from "@/contexts/cart-context"
import { useCreatePaymentSession } from "@/features/stripe/hooks/use-create-payment-session"
import { UserDto } from "@/features/user/dtos/user-dto"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { CartItem } from "./cart-item"

export function OrderSummary({ redirect, dbUser, token }: { redirect?: boolean, dbUser?: UserDto, token: string }) {

  const { cartItems, totalQuantity }: CartContextInterface = useCartContext()

  const { createPaymentSession } = useCreatePaymentSession(token)

  const router = useRouter()

  function handleContinue() {
    if(redirect) {
      return router.push("/sign-in")
    }

    createPaymentSession({
      products: cartItems.map((item) => ({
        id: item.id,
        quantity: item.quantity
      })),
      userId: dbUser!.id
    })
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Shopping Cart</h1>
      <div className="space-y-2 mb-8">
        {cartItems.map((item, i) => (
          <div key={item.id} className="space-y-2">
            <CartItem item={item} />
            {i !== cartItems.length - 1 ? (
              <Separator />
            ) : null}
          </div>
        ))}
      </div>
      <div className="space-y-4">
        <p className="text-xl font-semibold">Order Summary</p>
        <div className="flex flex-col gap-y-2">
          <div className="flex items-center justify-between">
            <p className="text-muted-foreground">Original</p>
            <p className="font-medium">${totalQuantity.toFixed(2)}</p>
          </div>
        </div>
        <Separator />
        <div className="flex items-center justify-between">
          <p className="font-semibold">Total</p>
          <p className="font-semibold">${totalQuantity.toFixed(2)}</p>
        </div>
      </div>
      <Button onClick={handleContinue} className="w-full mt-6">Continue</Button>
    </div>
  )
}
