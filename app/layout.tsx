"use client";
import "./globals.css";
import { Inter } from "next/font/google";
import AuthProvider from "./authProvider";
import { ReduxProvider } from "../redux/provider/reduxProvider";
import Toast from "@/components/Toast";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#e3e1e1]`}>
        <AuthProvider>
          <ReduxProvider>
            {children}
            <Toast />
          </ReduxProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
