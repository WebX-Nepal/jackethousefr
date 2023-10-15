"use client";
import "./globals.css";
import { Inter } from "next/font/google";
import AuthProvider from "./authProvider";
import { ReduxProvider } from "../redux/provider/reduxProvider";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <ReduxProvider>{children}</ReduxProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
