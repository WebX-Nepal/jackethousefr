"use client";
import { useEffect } from "react";
import { useRouter } from "next/router";

function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    // Check if we are on the client side
    if (typeof window !== "undefined") {
      // Redirect to "/dashboard/pos" on the client side
      router.push("/dashboard/pos");
    }
  }, [router]);

  // You can render your component content here
  return <div>This is the Dashboard page content.</div>;
}

export default DashboardPage;
