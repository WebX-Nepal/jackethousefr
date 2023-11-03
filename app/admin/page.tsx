"use client";
import { useRouter } from "next/navigation";

const AdminPage = () => {
  const router = useRouter();
  const a = 10;
  if (a > 10) {
    router.push("/admin/inventory");
  }
  return;
};

export default AdminPage;
