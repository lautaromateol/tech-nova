import { paths } from "@/lib/api";

export type UserDto = paths["/users/{id}"]["get"]["responses"]["200"]["content"]["application/json"]