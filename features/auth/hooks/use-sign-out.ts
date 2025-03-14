import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function useSignOut() {
  const router = useRouter()

  const { mutate: signOut, isPending: isSigningOut } = useMutation({
    mutationFn: async () => {
      try {
        const response = await axios.delete("api/auth/sign-out")

        return response.data
      } catch {
        throw new Error("There was an error signing out.")
      }
    },
    onSuccess: (data) => {
      if (data.success) {
        router.refresh()
      }
    },
    onError: (error) => toast.error(error.message)
  })

  return { signOut, isSigningOut }
}