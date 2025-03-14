import Link from "next/link";
import { getUser } from "@/actions/get-user";
import { Button } from "./ui/button";
import { UserDropdown } from "@/features/auth/components/user-dropdown";

export async function Auth() {

  const user = await getUser()

  if (!user) {
    return (
      <Button asChild>
        <Link href="/sign-in">
          Sign In
        </Link>
      </Button>
    )
  }

  return (
    <UserDropdown user={user} />
  )
}
