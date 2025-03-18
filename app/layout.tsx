import "./globals.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import { CartProvider } from "@/contexts/cart-context";
import { ClientProvider } from "@/providers/query-client-provider";
import { Nav } from "@/components/nav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TechNova",
  description: "Discover the latest tech products at TechNova. From smart devices and innovative gadgets to cutting-edge accessories, find everything you need to stay ahead in the world of technology. Fast shipping, competitive prices, and expert advice. Explore the future today at TechNova!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}
      >
        <ClientProvider>
          <CartProvider>
            <Nav />
            <Toaster />
            {children}
          </CartProvider>
        </ClientProvider>
      </body>
    </html>
  );
}
