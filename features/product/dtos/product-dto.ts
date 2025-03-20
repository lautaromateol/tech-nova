import { paths } from "@/lib/api";

export type ProductDto = paths["/products/{id}"]["get"]["responses"]["200"]["content"]["application/json"]