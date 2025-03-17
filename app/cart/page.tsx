import { getUserToken } from "@/features/user/actions/get-user";
import { Cart } from "@/features/cart/components/cart";
import { OrderSummary } from "@/features/cart/components/order-summary";

export default async function CartPage() {
  
  const response = await getUserToken()

  if(!response) {
    return(
      <OrderSummary redirect />
    )
  }

  return(
    <Cart user={response.user} token={response.token} />
  )
}
