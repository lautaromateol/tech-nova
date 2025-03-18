import { getUserToken } from "@/features/user/actions/get-user"
import { redirect } from "next/navigation"

export default async function AuthLayout({ children }: { children: React.ReactNode }) {

  const user = await getUserToken()

  if(user) {
    redirect("/")
  }

  return (
    <div className="min-h-screen flex items-center justify-center">{children}</div>
  )
}
