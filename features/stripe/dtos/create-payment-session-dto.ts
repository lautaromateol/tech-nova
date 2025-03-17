import { paths } from "@/lib/api";

export type CreatePaymentSessionDto = paths["/stripe/create-payment-session"]["post"]["requestBody"]["content"]["application/json"]