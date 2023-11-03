"use client";
import React, { useEffect, useState } from "react";
import { AiFillHome } from "react-icons/ai";
import { GoPeople } from "react-icons/go";
import { PiCoatHangerLight } from "react-icons/pi";
import { usePathname, useRouter } from "next/navigation";

function Sidebar() {
  const route = usePathname();
  const router = useRouter();
  const pathArray = route.split("/");
  const [path, setPath] = useState("");

  useEffect(() => {
    setPath(pathArray[2]);
  }, [route]);

  const menu = [
    {
      title: "POS",
      pathName: "pos",
      icon: (
        <AiFillHome
          className={` text-secondary rounded-full text-3xl border-4 ${
            path == "pos"
              ? "bg-red-600 border-red-600"
              : "bg-white border-white"
          }`}
        />
      ),
    },

    {
      title: "Reports",
      pathName: "reports",
      icon: (
        <GoPeople
          className={` text-secondary rounded-full text-3xl border-4 ${
            path == "reports"
              ? "bg-red-600 border-red-600"
              : "bg-white border-white"
          }`}
        />
      ),
    },

    {
      title: "Inventory",
      pathName: "inventory",
      icon: (
        <PiCoatHangerLight
          className={` text-secondary rounded-full text-3xl border-4 ${
            path == "inventory"
              ? "bg-red-600 border-red-600"
              : "bg-white border-white"
          }`}
        />
      ),
    },
  ];
  return (
    <div className="text-white">
      <ul className="pt-2">
        {menu.map((item, index) => {
          return (
            <li
              key={index}
              className={`text-sm flex flex-col items-center gap-x-4 cursor-pointer p-2 mb-3 rounded-l-sm hover:border-l-4 ${
                path == item.pathName ? "border-l-4" : ""
              }`}
              onClick={() => router.push(`/branch/${item.pathName}`)}
            >
              <span className="text-4xl block float-left">{item.icon}</span>
              <span className="text-base flex-1 mt-2">{item.title}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Sidebar;
