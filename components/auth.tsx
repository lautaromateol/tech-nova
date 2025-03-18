import Link from "next/link";
import { getUserToken } from "@/features/user/actions/get-user";
import { Button } from "./ui/button";
import { UserDropdown } from "@/features/auth/components/user-dropdown";

export async function Auth() {

  const response = await getUserToken()

  if (!response) {
    return (
      <Button asChild>
        <Link href="/sign-in">
          Sign In
        </Link>
      </Button>
    )
  }

  const { user } = response

  return (
    <UserDropdown user={user} />
  )
}
