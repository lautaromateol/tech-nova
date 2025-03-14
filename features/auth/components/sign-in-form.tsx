"use client"
import Link from "next/link";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSignIn } from "@/features/auth/hooks/use-signin";
import { SignInDto, SignInDtoSchema } from "@/features/auth/dtos/sign-in-dto";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export function SignInForm() {
  
  const { signIn, isSigningIn } = useSignIn()

  const disabled = isSigningIn

  const form = useForm({
    resolver: zodResolver(SignInDtoSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  })

  function onSubmit(data: SignInDto) {
    signIn(data)
  }

  return (
    <div className="shadow-sm border rounded-md p-8 w-96 max-w-screen-2xl">
      <div className="flex flex-col items-center">
        <div className="relative size-14">
          <Image
            src="/logo.svg"
            alt="TechNova logo"
            className="object-center"
            fill
          />
        </div>
        <div className="space-y-0.5">
          <h1 className="font-bold text-xl text-center">Welcome back!</h1>
          <p className="text-sm text-muted-foreground">Fill up the fields to authenticate.</p>
        </div>
      </div>
      <Separator className="w-full my-6" orientation="horizontal" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="password"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={disabled} type="submit" className="w-full">Sign In</Button>
        </form>
      </Form>
      <Link href="/sign-up">
        <p className="text-sm text-blue-600 hover:underline text-center mt-4">Don&apos;t you have an account? Sign Up</p>
      </Link>
    </div>
  )
}
