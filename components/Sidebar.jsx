"use client";
import React from "react";
import { AiFillHome } from "react-icons/ai";
import { BsBarChart } from "react-icons/bs";
import { GoPeople } from "react-icons/go";
import { BiSolidReport } from "react-icons/bi";
import { PiCoatHangerLight } from "react-icons/pi";
import { FaLocationDot } from "react-icons/fa6";
function Sidebar() {
  const menu = [
    {
      title: "POS",
      icon: (
        <AiFillHome className="bg-white text-primary rounded-full text-3xl border-4" />
      ),
    },
    { title: "POS", icon: <AiFillHome /> },
    { title: "POS", icon: <AiFillHome /> },
    { title: "POS", icon: <AiFillHome /> },
  ];
  return (
    <div className="text-white">
      <ul className="pt-2">
        {menu.map((item, index) => {
          return (
            <li
              key={index}
              className="text-sm flex flex-col items-center gap-x-4 cursor-pointer p-2 mb-3 border-l-4 rounded-l-sm"
            >
              <span className="text-4xl block float-left"> {item.icon}</span>
              <span className="text-base flex-1 mt-2">{item.title}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Sidebar;
