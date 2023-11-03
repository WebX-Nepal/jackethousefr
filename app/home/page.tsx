"use client";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
const Home = () => {
  const router = useRouter();
  const authState = useSelector((state: any) => state.auth);
  if (authState?.userDetail?.role == "super") {
    router.push("/admin");
  } else {
    router.push("/dashboard/pos");
  }
  return;
};

export default Home;
