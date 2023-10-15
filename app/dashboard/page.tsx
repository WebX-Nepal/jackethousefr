"use client";
import { useRouter } from "next/navigation";

function DashboardPage() {
  const router = useRouter();
  router.push("/dashboard/pos");
  return;
}

export default DashboardPage;
