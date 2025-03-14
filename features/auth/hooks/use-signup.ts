import axios from "axios";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { paths } from "@/lib/api";
import { API_URL } from "@/constants/api-url";

type RequestType = paths["/auth/sign-up"]["post"]["requestBody"]["content"]["application/json"]
type ResponseType = paths["/auth/sign-up"]["post"]["responses"]["201"]["content"]["application/json"]

export function useSignUp() {

  const router = useRouter()

  const { mutate: signUp, isPending: isSigningUp } = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (user) => {
      try {
        const response = await axios.post<ResponseType>(`${API_URL}/auth/sign-up`, user)

        return response.data
      } catch {
        throw new Error("There was an error creating your account.")
      }
    },
    onSuccess: (data) => {
      if(data.success) {
        toast.success("Account created successfully.")
        router.push("/sign-in")
      }
    },
    onError: (error) => toast.error(error.message)
  })
  return { signUp, isSigningUp }
}
