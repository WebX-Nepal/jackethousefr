"use client";
import React, { useRef, useState } from "react";
import Image from "next/image";
import { BiSearchAlt2 } from "react-icons/bi";
import { RiBarcodeFill } from "react-icons/ri";
import { MdOutlineNotifications } from "react-icons/md";
import { AiFillCaretDown } from "react-icons/ai";
function Header() {
  const [isOpen, setOpen] = useState(false);
  const [isNotificationOpen, setNotificationOpen] = useState(false);

  return (
    <div className="flex bg-primary p-6 shadow-xl sticky top-0 z-40">
      <div className="hover:cursor-pointer">
        <Image src={"/logo.svg"} width={130} height={130} />
      </div>
      <div className="flex ml-8 items-center rounded-xl border border-gray-600 p-2 justify-between h-11 flex-grow w-1/4">
        <input
          className="outline-none placeholder-gray-500 bg-transparent text-black w-full"
          type="text"
          placeholder="Search For Products..."
        />
        <BiSearchAlt2 className="text-gray-600" />
      </div>
      <div className="flex items-center justify-center max-h-14  -mt-2 ml-8">
        <span>Barcode:</span>
        <div className="text-4xl ml-4 bg-backgroundGray border-4 border-backgroundGray  rounded-xl flex">
          <RiBarcodeFill />
          <RiBarcodeFill />
        </div>
        <div className="text-3xl ml-6">
          <MdOutlineNotifications
            className="hover:cursor-pointer"
            onClick={() => {
              setNotificationOpen(!isNotificationOpen);
            }}
          />
        </div>
        <div className="h-full flex items-center justify-between bg-white rounded-3xl p-2 ml-6">
          <div className="mr-4">
            <Image
              src="/pic2.jfif"
              width={60}
              height={60}
              className="rounded-full"
            />
          </div>
          <div className="mr-4 hover:cursor-pointer">
            <p className="leading-tight font-semibold">Samakhusi</p>
            <p className="text-gray-600 leading-tight text-14">Branch</p>
          </div>
          <div className="ml-4 hover:cursor-pointer">
            <AiFillCaretDown
              className="text-3xl"
              onClick={() => {
                setOpen(!isOpen);
              }}
            />
          </div>
          {isOpen && (
            <div className="z-50 top-20 absolute right-8 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
              <div className="absolute -top-1 right-6 w-0 h-0 z-10">
                <div className="border border-solid bg-white border-t-0 border-r-2 border-b-2 w-3 h-3 rotate-45 border-white"></div>
              </div>
              <div
                className="py-1"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="options-menu"
              >
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  role="menuitem"
                >
                  Option 1
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  role="menuitem"
                >
                  Option 2
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  role="menuitem"
                >
                  Option 3
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
