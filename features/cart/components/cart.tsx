"use client"
import { Loader2 } from "lucide-react"
import { CartContextInterface, useCartContext } from "@/contexts/cart-context"
import { OrderSummary } from "@/features/cart/components/order-summary"
import { UserPayload } from "@/features/auth/types"
import { useUser } from "@/features/auth/hooks/use-user"

interface CartInterface {
  user: UserPayload;
  token: string;
}

export function Cart({ user, token }: CartInterface) {

  const { user: dbUser, isLoadingUser } = useUser({ id: user.id, token })

  const { cartItems }: CartContextInterface = useCartContext()

  if (cartItems.length === 0) {
    return (
      <p>No items.</p>
    )
  }

  if (isLoadingUser) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="size-8 animate-spin" />
      </div>
    )
  }

  if (!dbUser) {
    return (
      <OrderSummary redirect token={token} />
    )
  }

  return (
   <OrderSummary dbUser={dbUser} token={token} />
  )
}
