import React from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
function Dashboard() {
  return (
    <div className="min-h-screen flex flex-col">
      <div>
        <Header />
      </div>
      <div className="relative flex flex-grow">
        <div className="bg-black w-32">
          <Sidebar />
        </div>
        <main className="bg-gray-100 flex-1 p-6">main content </main>
      </div>
    </div>
  );
}

export default Dashboard;
