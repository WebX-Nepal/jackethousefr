"use client";
import React, { useState } from "react";
import { signOut } from "next-auth/react";
import { useDispatch } from "react-redux";
import { logOutUser } from "../../redux/slices/authSlice";
import { setSearchQuery } from "../../redux/slices/searchSlice";
import Image from "next/image";
import { BiSearchAlt2 } from "react-icons/bi";
import { RiBarcodeFill } from "react-icons/ri";
import { MdOutlineNotifications } from "react-icons/md";
import { AiFillCaretDown } from "react-icons/ai";
import { useRouter } from "next/navigation";
import DropdownUser from "./DropDown";
function Header() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isOpen, setOpen] = useState(false);
  const [isNotificationOpen, setNotificationOpen] = useState(false);

  async function handleLogOut() {
    dispatch(logOutUser());
    await signOut({ callbackUrl: "/login" });
  }
  const handleClickLogo = () => {
    router.push("/dashboard/pos");
  };
  const handleSearch = (e) => {
    dispatch(setSearchQuery(e.target.value));
  };
  return (
    <div className="flex bg-primary p-6 shadow-xl sticky top-0 z-40">
      <div className="hover:cursor-pointer" onClick={handleClickLogo}>
        <Image src={"/logo.svg"} width={130} height={130} alt="logo" />
      </div>
      <div className="flex ml-8 items-center rounded-xl border border-gray-600 p-2 justify-between h-11 flex-grow w-1/4">
        <input
          className="outline-none placeholder-gray-500 bg-transparent text-black w-full"
          type="text"
          placeholder="Search For Products..."
          onChange={handleSearch}
        />
        <BiSearchAlt2 className="text-gray-600" />
      </div>
      <div className="flex items-center justify-center max-h-14 -mt-2 ml-8">
        <span>Barcode:</span>
        <div className="text-4xl ml-4 bg-backgroundGray border-4 border-backgroundGray rounded-xl flex">
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
        {/* <div className="h-full flex items-center justify-between bg-white rounded-3xl p-2 ml-6">
          <div className="mr-4">
            <Image
              src="/pic2.jfif"
              width={60}
              height={60}
              className="rounded-full"
              alt="barcode logo"
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
            <div className="absolute mt-40 w-30 bg-slate-200 h-full w-56 rounded-2xl p-1 text-lg hover:cursor-pointer">
              <div className="p-2 border-b-slate-50 hover:bg-slate-300">
                Profile
              </div>
              <div className="p-2 hover:bg-slate-300">
                <button onClick={handleLogOut}>logout</button>
              </div>
            </div>
          )}
        </div> */}
        <DropdownUser />
      </div>
    </div>
  );
}

export default Header;
