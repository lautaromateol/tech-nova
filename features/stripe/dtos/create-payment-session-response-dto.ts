import Stripe from "stripe";

export type CreatePaymentSessionResponseDto = Stripe.Response<Stripe.Checkout.Session>
