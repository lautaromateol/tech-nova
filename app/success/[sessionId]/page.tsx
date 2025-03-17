import Link from "next/link"
import { notFound } from "next/navigation"
import { Check, Package, ShoppingBag, Truck } from "lucide-react"
import { SessionPaymentDto } from "@/features/stripe/dtos/payment-session-dto"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { API_URL } from "@/constants/api-url"

async function getSessionDetails(sessionId: string): Promise<SessionPaymentDto> {
  const response = await fetch(`${API_URL}/stripe/get-session-details/${sessionId}`)

  if (!response.ok) {
    return notFound()
  }

  const data = await response.json()

  return data
}

export default async function OrderConfirmationPage({ params }: { params: { sessionId: string } }) {

  const { sessionId } = await params

  const session = await getSessionDetails(sessionId)

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="flex flex-col items-center text-center mb-8">
        <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
          <Check className="h-8 w-8 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold mb-2">¡Thanks for your order!</h1>
        <p className="text-muted-foreground">Your order has been placed and is being processed.</p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Order Details</CardTitle>
          <CardDescription>
            Order #{session.payment_intent?.toString()} • {new Date().toDateString()}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {session.line_items.data.map((item, index) => (
              <div key={index} className="flex justify-between">
                <div className="flex items-start gap-2">
                  <div className="h-12 w-12 rounded bg-muted flex items-center justify-center">
                    <ShoppingBag className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-medium">{item.description}</p>
                    <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                  </div>
                </div>
                <p className="font-medium">${(item.amount_subtotal / 100).toFixed(2)}</p>
              </div>
            ))}
          </div>

          <Separator className="my-6" />

          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${session.amount_subtotal ? (session.amount_subtotal / 100).toFixed(2) : 0}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>${session.shipping_cost?.amount_total ? (session.shipping_cost?.amount_total / 100).toFixed(2) : 0}</span>
            </div>
            {/* <div className="flex justify-between">
              <span>Taxes</span>
              <span>${session.tax}</span>
            </div> */}
            <Separator className="my-2" />
            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span>${session.amount_total ? (session.amount_total / 100).toFixed(2) : 0}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Shipping Info</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-start gap-4">
            <Truck className="h-5 w-5 mt-0.5 text-muted-foreground" />
            <div>
              <p className="font-medium">{session.customer_details?.name}</p>
              <p className="text-muted-foreground">{session.shipping_details?.address?.line1}</p>
              <p className="text-muted-foreground">{session.shipping_details?.address?.line2}</p>
              <p className="text-muted-foreground">{session.shipping_details?.address?.city}, {session.shipping_details?.address?.state}, {session.shipping_details?.address?.country}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Order Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                <Check className="h-4 w-4 text-primary-foreground" />
              </div>
              <div className="flex-1">
                <p className="font-medium">Confirmed Order</p>
                <p className="text-sm text-muted-foreground">{new Date().toDateString()}</p>
              </div>
            </div>

            <div className="ml-4 h-6 w-0.5 bg-muted mx-auto" />

            <div className="flex items-center gap-4">
              <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                <Package className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="flex-1">
                <p className="font-medium">Preparing Order</p>
                <p className="text-sm text-muted-foreground">In progress</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link href="/shop">
          <Button className="w-full flex items-center gap-2">
            <ShoppingBag className="h-4 w-4" />
            Continue Buying
          </Button>
        </Link>
      </div>
    </div>
  )
}

