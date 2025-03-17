import { paths } from "@/lib/api";

export type CreateOrderDto = paths["/stripe/create-payment-session"]["post"]["requestBody"]["content"]["application/json"]
