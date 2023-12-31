"use client";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
export default function Home() {
  const router = useRouter();
  const { data, status } = useSession();
  useEffect(() => {
    if (status === "authenticated") {
      router.push("/branch/pos");
    } else {
      router.push("/login");
    }
  }, []);
  return;
}
