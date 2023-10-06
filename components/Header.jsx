"use client";
import React, { useState } from "react";
import Image from "next/image";
import { BiSearchAlt2 } from "react-icons/bi";
import { RiBarcodeFill } from "react-icons/ri";
import { MdOutlineNotifications } from "react-icons/md";
import { AiFillCaretDown } from "react-icons/ai";
function Header() {
  return (
    <div className="flex bg-slate-200 p-6 shadow-xl sticky top-0 z-40">
      <div className="hover:cursor-pointer">
        <Image src={"/logo.svg"} width={130} height={130} layout="fixed" />
      </div>
      <div className="flex ml-8 items-center rounded-xl border border-gray-600 p-2 flex-grow justify-between h-10">
        <input
          className="outline-none placeholder-gray-500 bg-transparent text-black w-1/4"
          type="text"
          placeholder="Search For Products..."
        />
        <BiSearchAlt2 className="text-gray-600" />
      </div>
    </div>
  );
}

export default Header;
