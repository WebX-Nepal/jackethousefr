"use client";
import { useRouter } from "next/navigation";
function Dashboard() {
  const router = useRouter();
  router.push("/dashboard/pos");
  return;
}

export default Dashboard;
