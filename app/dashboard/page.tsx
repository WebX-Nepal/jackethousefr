"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

function DashboardPage() {
  const router = useRouter();
  const a = 10;
  if (a > 10) {
    router.push("/dashboard/pos");
  }
  return <div>This is the Dashboard page content.</div>;
}

export default DashboardPage;
