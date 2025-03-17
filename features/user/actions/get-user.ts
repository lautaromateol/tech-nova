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

interface UserTokenPayload {
  user: UserPayload;
  token: string;
}

export async function getUserToken(): Promise<UserTokenPayload | null> {
  const cookiesStore = await cookies()
  const jsonUser = cookiesStore.get("user")
  const jsonToken = cookiesStore.get("token")

  if(!jsonUser || !jsonToken) {
    return null
  }

  const user = JSON.parse(jsonUser.value)
  const token = jsonToken.value

  return { user, token }
}