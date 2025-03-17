import Stripe from "stripe";

export interface SessionPaymentDto extends Stripe.Response<Stripe.Checkout.Session> {
  line_items: Stripe.ApiList<Stripe.LineItem>
}