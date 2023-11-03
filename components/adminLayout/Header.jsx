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
import useScreenWidth from "../screenHook";
import { useDispatch } from "react-redux";
function Header() {
  const dispatch = useDispatch();
  const screenWidth = useScreenWidth();
  const router = useRouter();
  const handleClickLogo = () => {
    router.push("/dashboard/pos");
  };
  const handleSearch = (e) => {
    dispatch(setSearchQuery(e.target.value));
  };
  const logoWidth = 130;
  const logoHeight = 130;
  return (
    <div className="flex p-1 shadow-xl sticky top-0 z-40 bg-primary">
      <div className="flex flex-grow items-center justify-between pr-4 py-4 shadow-2 md:px-6 2xl:px-11">
        <div
          className={
            screenWidth <= 640
              ? "hover:cursor-pointer mr-1 ml-2"
              : "hover:cursor-pointer mr-6"
          }
          onClick={handleClickLogo}
        >
          <div style={{ width: `${logoWidth}px`, height: `${logoHeight}px` }}>
            <Image
              src={screenWidth <= 640 ? "/smicon.png" : "/logo.svg"}
              layout="fill"
              objectFit="contain"
              alt="logo"
            />
          </div>
        </div>
        <div className="ml-4 flex flex-grow px-4 rounded-xl border border-gray-600 py-2 items-center justify-between max-w-5xl">
          <input
            className="outline-none placeholder-gray-500 bg-transparent text-black w-full"
            type="text"
            placeholder="Search For Products..."
            onChange={handleSearch}
          />
          <BiSearchAlt2 className="text-gray-600" />
        </div>

        <div className="md:flex hidden items-center  gap-8 2xsm:gap-7 ml-4 -mr-4">
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
        <div className="md:hidden flex ml-4">
          <GiHamburgerMenu className="text-2xl" />
        </div>
      </div>
    </div>
  );
}

export default Header;
