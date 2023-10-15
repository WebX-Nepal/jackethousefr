"use client";
import { useRouter } from "next/navigation";

function DashboardPage() {
  const router = useRouter();
  const a = 10;
  if (a > 10) {
    router.push("/dashboard/pos");
  }
  return;
}

export default DashboardPage;
