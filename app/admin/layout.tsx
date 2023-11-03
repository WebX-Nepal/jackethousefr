"use client";
import React from "react";
import Header from "../../components/adminLayout/Header";
import Sidebar from "../../components/adminLayout/Sidebar";
import useScreenWidth from "../../components/screenHook";
const Admin = ({ children }: { children: React.ReactNode }) => {
  const screenWidth = useScreenWidth();

  return (
    <div className="min-h-screen flex flex-col">
      <div className="sticky top-0 z-50">
        <Header />
      </div>
      <div className="relative flex flex-grow">
        <div className="bg-black w-32 fixed h-full">
          <Sidebar />
        </div>
        <main
          className={`flex-1 ml-32 z-0 justify-center ${
            screenWidth >= 1700 ? "flex flex-grow" : ""
          }`}
        >
          <div
            style={{
              minWidth: screenWidth >= 1700 ? "1500px" : "100%",
            }}
          >
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Admin;
