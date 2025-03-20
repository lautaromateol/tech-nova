import { paths } from "@/lib/api";

export type AddOrderResponseDto = paths["/orders"]["post"]["responses"]["201"]["content"]["application/json"]