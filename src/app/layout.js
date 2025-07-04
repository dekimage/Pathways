"use client";
import { ThemeProvider } from "@/components/theme-provider";
import "../globals.css";
import { Bricolage_Grotesque, Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import ReusableLayout from "@/reusable-ui/ReusableLayout";
import { usePathname } from "next/navigation";
// import { useState, useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

const brico = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-brico",
});

export default function RootLayout({ children }) {
  const pathname = usePathname();

  const publicRoutes = [
    "/login",
    "/signup",
    "/",
    "/privacy-policy",
    "/tos",
    "/share",
  ];

  const isPublicRoute = publicRoutes.includes(pathname);
  return (
    <html lang="en">
      <head></head>

      <body className={brico.className}>
        <ThemeProvider attribute="class" defaultTheme="system">
          {isPublicRoute ? (
            children
          ) : (
            <ReusableLayout>{children}</ReusableLayout>
          )}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
