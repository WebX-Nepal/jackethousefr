"use client";
import React from "react";
import { AiFillHome } from "react-icons/ai";
import { BsBarChart } from "react-icons/bs";
import { GoPeople } from "react-icons/go";
import { BiSolidReport } from "react-icons/bi";
import { PiCoatHangerLight } from "react-icons/pi";
import { FaLocationDot } from "react-icons/fa6";
function Sidebar() {
  const menu = [{ title: "POS", icon: <AiFillHome /> }];
  return (
    <div className="shadow-sm w-32 text-white text-3xl text-center p-4">
      <div className="w-full ">
        <AiFillHome className="mx-auto my-auto" />
        <p className="text-xl mt-2">POS</p>
      </div>
      <div className="w-full ">
        <AiFillHome className="mx-auto my-auto" />
        <p className="text-xl mt-2">POS</p>
      </div>
      <div className="w-full ">
        <AiFillHome className="mx-auto my-auto" />
        <p className="text-xl mt-2">POS</p>
      </div>
      <div className="w-full ">
        <AiFillHome className="mx-auto my-auto" />
        <p className="text-xl mt-2">POS</p>
      </div>
      <div className="w-full hover:cursor-pointer">
        <AiFillHome className="mx-auto my-auto" />
        <p className="text-xl mt-2">POS</p>
      </div>
    </div>
  );
}

export default Sidebar;
