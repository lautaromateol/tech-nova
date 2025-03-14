import { getUser } from "@/actions/get-user"
import { redirect } from "next/navigation"

export default async function AuthLayout({ children }: { children: React.ReactNode }) {

  const user = await getUser()

  if(user) {
    redirect("/")
  }

  return (
    <div className="min-h-screen flex items-center justify-center">{children}</div>
  )
}
