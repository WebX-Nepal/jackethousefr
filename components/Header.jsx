"use client";
import React, { useRef, useState } from "react";
import Image from "next/image";
import { BiSearchAlt2 } from "react-icons/bi";
import { RiBarcodeFill } from "react-icons/ri";
import { MdOutlineNotifications } from "react-icons/md";
import { AiFillCaretDown } from "react-icons/ai";
import { Link } from "react-router-dom";
function Header() {
  return (
    <div className="flex bg-slate-200 p-6 shadow-xl sticky top-0 z-40">
      <div className="hover:cursor-pointer">
        <Image src={"/logo.svg"} width={130} height={130} />
      </div>
      <div className="flex ml-8 items-center rounded-xl border border-gray-600 p-2 justify-between h-11 flex-grow w-1/4">
        <input
          className="outline-none placeholder-gray-500 bg-transparent text-black"
          type="text"
          placeholder="Search For Products..."
        />
        <BiSearchAlt2 className="text-gray-600" />
      </div>
      <div className="flex items-center justify-center max-h-14 border-2 -mt-2 ml-8">
        <span>Barcode:</span>
        <div className="text-4xl ml-4 bg-green-500 border-2 border-green-500 rounded-xl flex">
          <RiBarcodeFill />
          <RiBarcodeFill />
        </div>
        <div className="text-3xl ml-6">
          <MdOutlineNotifications />
        </div>
        <div className="h-full flex items-center justify-between bg-red-200 rounded-3xl p-2 ml-6">
          <div className="mr-4">
            <Image
              src="/pic2.jfif"
              width={60}
              height={60}
              className="rounded-full"
            />
          </div>
          <div className="mr-4">
            <p className="leading-tight font-semibold">Samakhusi</p>
            <p className="text-gray-600 leading-tight text-14">Branch</p>
          </div>
          <div className="ml-4">
            <AiFillCaretDown className="text-3xl" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
