import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { paths } from "@/lib/api";
import { API_URL } from "@/constants/api-url";
import { useRouter } from "next/navigation";

type RequestType = paths["/auth/sign-in"]["post"]["requestBody"]["content"]["application/json"]
type ResponseType = paths["/auth/sign-in"]["post"]["responses"]["200"]["content"]["application/json"]

export function useSignIn() {

  const router = useRouter()

  const { mutate: signIn, isPending: isSigningIn } = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (user) => {
      try {
        const response = await axios.post<ResponseType>(`${API_URL}/auth/sign-in`, user)

        return response.data
      } catch {
        throw new Error("Invalid credentials.")
      }
    },
    onSuccess: async (data) => {
      if (data.success) {
        const response = await fetch("/api/auth/set-token", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ token: data.token })
        })

        if(response.ok) {
          router.refresh()
        }
      }
    },
    onError: (error) => toast.error(error.message)
  })
  return { signIn, isSigningIn }
}
