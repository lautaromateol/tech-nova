"use client"
import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext({})

export interface CartItem {
  id: string;
  name: string;
  imgUrl: string;
  price: number;
  quantity: number;
}

export interface CartContextInterface {
  cartItems: CartItem[];
  totalQuantity: number;
  addItemToTheCart: (newItem: CartItem) => void;
  removeItemFromTheCart: (id: string) => void;
}

export function useCartContext() {
  return useContext(CartContext)
}

export function CartProvider({ children }: { children: React.ReactNode }) {

  const [cartItems, setCartItems] = useState<CartItem[]>([])

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems))
  }, [cartItems])

  useEffect(() => {
    const jsonCartItems = localStorage.getItem("cartItems")

    if (jsonCartItems) {
      setCartItems(JSON.parse(jsonCartItems))
    }
  }, [])

  const totalQuantity = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0)

  function addItemToTheCart(newItem: CartItem) {
    const existingProduct = cartItems.some((item) => item.id === newItem.id)

    if (existingProduct) {
      const newCartItems = cartItems.map((item) => {
        return item.id === newItem.id ? { ...item, quantity: newItem.quantity } : item
      })

      setCartItems(newCartItems)
    } else {
      const newCartItems = [...cartItems, newItem]

      setCartItems(newCartItems)
    }
  }

  function removeItemFromTheCart(id: string) {
    const newCartItems = cartItems?.filter((item) => item.id !== id)

    setCartItems(newCartItems)
  }

  return (
    <CartContext.Provider value={{ cartItems, addItemToTheCart, removeItemFromTheCart, totalQuantity }}>
      {children}
    </CartContext.Provider>
  )
}