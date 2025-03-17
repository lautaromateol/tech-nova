import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { API_URL } from "@/constants/api-url";
import { User } from "@/features/user/types";

export function useUser({ id, token }: { id: string, token: string }) {
  const { data: user, isLoading: isLoadingUser } = useQuery({
    queryKey: ["user", { id }],
    queryFn: async () => {
      try {
        const response = await axios.get<User>(`${API_URL}/users/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
        
        return response.data
      } catch {
        throw new Error("There was an error fetching the user.")
      }
    }
  })

  return { user, isLoadingUser }
}