"use client";
import React from "react";

import { setSearchQuery } from "../../redux/slices/searchSlice";
import Image from "next/image";
import { BiSearchAlt2 } from "react-icons/bi";
import { RiBarcodeFill } from "react-icons/ri";
import { GiHamburgerMenu } from "react-icons/gi";
import { useRouter } from "next/navigation";
import DropdownNotification from "./components/DropdownNotification";
import DropdownUser from "./components/DropdownUser";
function Header() {
  const router = useRouter();

  const handleClickLogo = () => {
    router.push("/dashboard/pos");
  };
  const handleSearch = (e) => {
    dispatch(setSearchQuery(e.target.value));
  };

  return (
    <div className="flex p-1 shadow-xl sticky top-0 z-40 bg-primary">
      <div className="flex flex-grow items-center justify-between px-4 py-4 shadow-2 md:px-6 2xl:px-11">
        <div className="hover:cursor-pointer mr-4" onClick={handleClickLogo}>
          <Image src={"/logo.svg"} width={130} height={130} alt="logo" />
        </div>
        <div className="hidden ml-4 flex-grow md:flex  px-4 rounded-xl border border-gray-600 py-2 justify-between">
          <input
            className="outline-none placeholder-gray-500 bg-transparent text-black w-full"
            type="text"
            placeholder="Search For Products..."
            onChange={handleSearch}
          />
          <BiSearchAlt2 className="text-gray-600 md:block hidden" />
        </div>
        <div className="sm:flex hidden items-center  gap-8 2xsm:gap-7 ml-4 -mr-4">
          <div className="flex items-center justify-center m-2">
            <p>Barcode:</p>
            <div className="text-4xl ml-4 bg-backgroundGray border-4 border-backgroundGray rounded-xl flex">
              <RiBarcodeFill />
              <RiBarcodeFill />
            </div>
          </div>
          <DropdownNotification />
          <DropdownUser />
        </div>
        <div className="sm:hidden flex">
          <GiHamburgerMenu className="text-2xl" />
        </div>
      </div>
    </div>
  );
}

export default Header;
