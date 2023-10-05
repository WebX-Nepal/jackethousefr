import React from "react";
import Image from "next/image";
import { BiSearchAlt2 } from "react-icons/bi";
import { FaBarcode } from "react-icons/fa";
import { MdOutlineNotifications } from "react-icons/md";
function Header() {
  return (
    <div className="flex bg-slate-200 p-6 shadow-xl sticky top-0 z-40">
      <div>
        <Image src={"/logo.svg"} width={120} height={120} layout="fixed" />
      </div>
      <div className="flex ml-8 items-center rounded-xl border border-gray-600 p-2 flex-grow justify-between w-1/4">
        <input
          className="outline-none placeholder-gray-500 bg-transparent text-black w-1/4"
          type="text"
          placeholder="Search For Products..."
        ></input>
        <BiSearchAlt2 className="text-gray-600" />
      </div>
      <div className="flex justify-center float-right w-1/3">
        <div className="flex">
          <div>
            <p>Barcode :</p>
          </div>
          <div>
            <FaBarcode className="text-3xl" />
          </div>
        </div>
        <div>
          <MdOutlineNotifications className="text-3xl" />
        </div>
        <div className="flex">
          <div>pic</div>
          <div>title</div>
          <div>icon</div>
        </div>
      </div>
    </div>
  );
}

export default Header;
