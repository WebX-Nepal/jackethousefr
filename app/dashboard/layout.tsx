"use client";
import React, { useState } from "react";
import Header from "../../components/layout/Header";
import Sidebar from "../../components/layout/Sidebar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
function Dashboard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { data: session, status } = useSession();
  if (status === "authenticated") {
    return (
      <div className="min-h-screen flex flex-col">
        <div className="sticky top-0 z-50">
          <Header />
        </div>
        <div className="relative flex flex-grow">
          <div className="bg-black w-32 fixed h-full">
            <Sidebar />
          </div>
          <main className="bg-gray-100 flex-1 p-6 ml-32 z-0">{children}</main>
        </div>
      </div>
    );
  } else {
    router.push("/login");
  }
}

export default Dashboard;
