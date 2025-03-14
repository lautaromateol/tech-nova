"use client"
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateUserDto, CreateUserDtoSchema } from "@/features/auth/dtos/create-user-dto";
import { useSignUp } from "@/features/auth/hooks/use-signup";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export function SignUpForm() {
  const [step, setStep] = useState(1);

  const { signUp, isSigningUp } = useSignUp()

  const disabled = isSigningUp

  const form = useForm({
    resolver: zodResolver(CreateUserDtoSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: ""
    },
  });

  const handleNextStep = () => {
    setStep((step) => step + 1)
  }

  const handlePreviousStep = () => {
    setStep((step) => step - 1)
  }

  function onSubmit(data: CreateUserDto) {
    signUp(data)
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
          <h1 className="font-bold text-xl text-center">Nice to meet you!</h1>
          <p className="text-sm text-muted-foreground">Fill up the fields to create your account.</p>
        </div>
      </div>
      <Separator className="w-full my-6" orientation="horizontal" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Paso 1: Información básica */}
          {step === 1 && (
            <>
              <FormField
                name="name"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="name">Name</FormLabel>
                    <FormControl>
                      <Input id="name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="email"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <FormControl>
                      <Input id="email" type="email" {...field} />
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
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <FormControl>
                      <Input id="password" type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="confirmPassword"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
                    <FormControl>
                      <Input id="confirmPassword" type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button disabled={disabled} type="button" variant="outline" onClick={handleNextStep}>
                Next
              </Button>
            </>
          )}

          {/* Paso 2: Información adicional */}
          {step === 2 && (
            <>
              <FormField
                name="address"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="address">Address</FormLabel>
                    <FormControl>
                      <Input id="address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="city"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="city">City</FormLabel>
                    <FormControl>
                      <Input id="city" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="country"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="country">Country</FormLabel>
                    <FormControl>
                      <Input id="country" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="phone"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="phone">Phone</FormLabel>
                    <FormControl>
                      <Input id="phone" type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button disabled={disabled} type="button" variant="outline" onClick={handlePreviousStep}>
                Previous
              </Button>
              <Button disabled={disabled} type="submit" className="w-full">
                Sign Up
              </Button>
            </>
          )}
        </form>
      </Form>
      <Link href="/sign-in">
        <p className="text-sm text-blue-600 hover:underline text-center mt-4">Already have an account? Sign In</p>
      </Link>
    </div>
  );
}