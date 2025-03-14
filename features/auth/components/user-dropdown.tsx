"use client"
import { User } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useSignOut } from "../hooks/use-sign-out";
import { UserPayload } from "../types";

export function UserDropdown({ user }: { user: UserPayload }) {

  const { signOut } = useSignOut()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="flex items-center gap-x-2">
          <p className="text-sm hover:underline cursor-pointer">{user.name}</p>
          <User className="size-4" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <div className="flex items-center gap-x-4 p-4">
          <div className="grid place-items-center size-16 p-2 bg-gray-200 rounded-full">
            <User className="size-12" />
          </div>
          <div className="space-y-0.5">
            <p className="text-sm">{user.name}</p>
            <p className="text-xs text-muted-foreground">{user.email}</p>
          </div>
        </div>
        <Button className="w-full" onClick={() => signOut()} variant="ghost" asChild>
          <p className="text-sm text-red-500 hover:text-red-500">Sign out</p>
        </Button>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
