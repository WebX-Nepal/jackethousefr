"use client";
import "./globals.css";
import { Inter } from "next/font/google";
import AuthProvider from "./authProvider";
import { Provider } from "react-redux";
import { store } from "../redux/store";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider store={store}>
          <AuthProvider>{children}</AuthProvider>
        </Provider>
      </body>
    </html>
  );
}
