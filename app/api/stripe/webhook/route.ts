import Stripe from "stripe";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { API_URL } from "@/constants/api-url";
import { AddOrderDto } from "@/features/order/dtos/add-order-dto";
import { AddOrderResponseDto } from "@/features/order/dtos/add-order-response-dto";
import { ProductDto } from "@/features/product/dtos/product-dto";
import { revalidateTag } from "next/cache";

const stripe = new Stripe(process.env.STRIPE_API_KEY!, { apiVersion: "2025-02-24.acacia" })

export async function POST(req: NextRequest) {
  try {

    const payload = await req.text()
    const sig = req.headers.get("stripe-signature")

    if (!payload || !sig) {
      return NextResponse.json({ message: "Bad Request" }, { status: 400 })
    }

    const event = stripe.webhooks.constructEvent(
      payload,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    )

    switch (event.type) {
      case "charge.succeeded":
        {

          const chargeSucceeded = event.data.object

          const payment_intent = chargeSucceeded.payment_intent as string
          const receipt_url = chargeSucceeded.receipt_url as string

          type CartItems = {
            id: string;
            quantity: number;
          }[]

          const cartItems: CartItems = JSON.parse(chargeSucceeded.metadata.cartItems)

          const dbProducts = await axios.get<ProductDto[]>(`${API_URL}/products`)

          const products = dbProducts.data.map((item) => {
            if (!cartItems.some((cartItem) => cartItem.id === item.id)) return null

            return {
              id: item.id,
              title: item.name,
              slug: item.slug,
              price: Number(item.price),
              image: item.imgUrl,
              quantity: cartItems.find((cartItem) => item.id === cartItem.id)!.quantity
            }
          }).filter((item) => item !== null)

          if (!products.length) {
            return NextResponse.json({ message: "Bad Request" }, { status: 400 })
          }

          const orderData: AddOrderDto = {
            amount_captured: chargeSucceeded.amount_captured,
            currency: chargeSucceeded.currency,
            refunded: chargeSucceeded.refunded,
            status: chargeSucceeded.status,
            chargeId: chargeSucceeded.id,
            userId: chargeSucceeded.metadata.userId,
            payment_intent,
            receipt_url,
            cartItems: products,
          }

          const orderResponse = await fetch(`${API_URL}/orders`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${chargeSucceeded.metadata.token}`
            },
            body: JSON.stringify(orderData)
          })


          if(!orderResponse.ok) {
            return NextResponse.json({ message: "Bad Request" }, { status: 400 })
          }

          const data: AddOrderResponseDto = await orderResponse.json()

          if(data.success) {
            products.forEach((product) => revalidateTag(`product-${product.slug}`))
            
            return NextResponse.json({ success: true, order: data.order }, { status: 201 })
          }
          
        }
    }

    return NextResponse.json({ message: "This event is not handled" }, { status: 400 })
  } catch {
    return NextResponse.json({ success: false, message: "Unkown error" }, { status: 500 })
  }
}