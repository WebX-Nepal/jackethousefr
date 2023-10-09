"use client";
import { useSession, signIn, signOut } from "next-auth/react";
export default function Home() {
  function handleClick() {
    console.log("clicked");
    signIn("credentials", {
      email: "branch1@branch1.com",
      password: "branch1@branch1.com",
    });
  }
  const { data: session, status } = useSession();

  const ISSERVER = typeof window === "undefined";

  const logout = () => {
    signOut();
    if (!ISSERVER) {
      localStorage.removeItem("token");
    }
  };
  if (status === "authenticated") {
    return <>you are logged in </>;
  }
  return (
    <>
      <button onClick={handleClick}>click</button>
    </>
  );
}
