"use server"
import { cookies } from "next/headers";

enum Role {
  "ADMIN",
  "USER"
}

interface UserPayload {
  sub: string;
  id: string;
  email: string;
  name: string;
  roles: Role[];
  iat: number;
  exp: number;
}

export async function getUser(): Promise<UserPayload | null> {
  const cookiesStore = await cookies()
  const jsonUser = cookiesStore.get("user")

  if(!jsonUser) {
    return null
  }

  const user = JSON.parse(jsonUser.value)

  return user
}