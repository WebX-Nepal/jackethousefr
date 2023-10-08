import React from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
function Dashboard({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="sticky top-0 z-50">
        <Header />
      </div>
      <div className="relative flex flex-grow">
        <div className="bg-black w-32 fixed h-full">
          <Sidebar />
        </div>
        <main className="bg-gray-100 flex-1 p-6 ml-32 overflow-y-auto z-0">
          {children}
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
