import axios from "axios"
import { useMutation } from "@tanstack/react-query"
import { CreatePaymentSessionResponseDto } from "@/features/stripe/dtos/create-payment-session-response-dto"
import { CreatePaymentSessionDto } from "@/features/stripe/dtos/create-payment-session-dto"
import { API_URL } from "@/constants/api-url"

export function useCreatePaymentSession(token: string) {

  const { mutate: createPaymentSession, isPending } = useMutation<CreatePaymentSessionResponseDto, Error, CreatePaymentSessionDto>({
    mutationFn: async(order) => {
      try {
        const response = await axios.post<CreatePaymentSessionResponseDto>(`${API_URL}/stripe/create-payment-session`, order, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
      
        const session = response.data
  
        return session
        
      } catch{
        throw new Error("There was an error processing the payment.")
      }
    },
    onSuccess: (data) => {
      if(data.url) {
        window.location.href = data.url
      }
    }
  })

  return { createPaymentSession, isPending }
}