"use client";
import React, { useState } from "react";
import { FaAngleLeft, FaAngleDown } from "react-icons/fa";
import { GiSleevelessJacket } from "react-icons/gi";
import { RiDashboardFill } from "react-icons/ri";
import { BsFillBarChartFill } from "react-icons/bs";
import { BiSolidReport } from "react-icons/bi";
import { BsPeopleFill } from "react-icons/bs";
import { PiCoatHangerLight } from "react-icons/pi";
function Sidebar() {
  const [open, setOpen] = useState(false);
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  const menu = [
    {
      title: "Dashboard",
      link: "/",
      subMenu: false,
      icon: <RiDashboardFill />,
    },
    { title: "Sales", link: "/", subMenu: false, icon: <BsFillBarChartFill /> },
    {
      title: "Reports",
      link: "/",
      subMenu: true,
      icon: <BiSolidReport />,
      subMenuItems: [
        { title: "report 1", link: "/" },
        { title: "report 2", link: "/" },
        { title: "report 3", link: "/" },
      ],
    },
    { title: "Members", link: "/", subMenu: false, icon: <BsPeopleFill /> },
    {
      title: "Inventory",
      link: "/",
      subMenu: false,
      icon: <PiCoatHangerLight />,
    },
  ];
  return (
    <div
      className={`bg-primary h-screen p-5 ${
        open ? "w-1/6" : "w-20"
      } text-white t-0 relative duration-300 shadow-2xl`}
    >
      <FaAngleLeft
        className={`bg-white text-primary text-3xl -right-4 absolute border-2 rounded-full cursor-pointer top-7 ${
          !open && "rotate-180"
        }`}
        onClick={() => setOpen(!open)}
      />
      <div className="inline-flex p-2">
        <GiSleevelessJacket className="text-3xl cursor-pointer block float-left mr-2" />
      </div>

      <ul className="pt-2">
        {menu.map((menu, index) => {
          return (
            <>
              <li
                key={index}
                className="text-sm flex items-center gap-x-4 cursor-pointer p-2 mt-3 rounded-lg hover:bg-secondary"
              >
                <span className="text-2xl block float-left">
                  {menu.icon ? menu.icon : <RiDashboardFill />}
                </span>
                <span
                  className={`text-base font-medium flex-1 ${
                    !open && "hidden"
                  }`}
                >
                  {menu.title}
                </span>
                {menu.subMenuItems && (
                  <FaAngleDown
                    className={`text-2xl ${subMenuOpen ? "rotate-180" : ""}`}
                    onClick={() => setSubMenuOpen(!subMenuOpen)}
                  />
                )}
              </li>
              {menu.subMenu && subMenuOpen && open && (
                <ul>
                  {menu?.subMenuItems?.map((subMenuItems, index) => {
                    return (
                      <li
                        key={index}
                        className="text-sm flex items-center gap-x-4 cursor-pointer p-2 px-5 mt-3 ml-8 rounded-lg hover:bg-secondary"
                      >
                        {subMenuItems.title}
                      </li>
                    );
                  })}
                </ul>
              )}
            </>
          );
        })}
      </ul>
    </div>
  );
}

export default Sidebar;
