import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'
import type { Metadata } from "next";
import Link from "next/link";
import { Inter } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/components/QueryProvider";
import { Toaster } from "react-hot-toast";
import {AppWrapper} from "@/contexts"


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PDF Creator ",
  description: "Generated PRD for your needs!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider afterSignOutUrl="/">
      <QueryProvider>
        <html lang="en">
          <body className={inter.className}>
            <section className="bg-slate-200 p-5 w-full flex justify-between">
              <Link href="/sign-in">
                  PM DAY
              </Link>
              <SignedOut>
                <SignInButton /> 
              </SignedOut> 
              <SignedIn>
                <UserButton />
              </SignedIn>
            </section>
            <AppWrapper>
              {children}
            </AppWrapper>
            
            <Toaster />
            
          </body>
        </html>
      </QueryProvider>
    </ClerkProvider>
  );
}
