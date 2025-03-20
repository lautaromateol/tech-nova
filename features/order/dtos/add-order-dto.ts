import { paths } from "@/lib/api";

export type AddOrderDto = paths["/orders"]["post"]["requestBody"]["content"]["application/json"]