"use client";
import React, { useState } from "react";
import { AiFillCreditCard } from "react-icons/ai";
import Image from "next/image";
function Pos() {
  const [category, setCategory] = useState("All");
  const menu = [
    { name: "All" },
    { name: "Men" },
    { name: "Women" },
    { name: "Sports Wear" },
  ];

  const products = [
    { name: "All", title: "Leather Jacket", code: "XS12", price: 1900 },
    { name: "All", title: "Leather Jacket", code: "XS12", price: 1900 },
    { name: "All", title: "Leather Jacket", code: "XS12", price: 1900 },
    { name: "All", title: "Leather Jacket", code: "XS12", price: 1900 },
    { name: "All", title: "Leather Jacket", code: "XS12", price: 1900 },
    { name: "All", title: "Leather Jacket", code: "XS12", price: 1900 },
    { name: "All", title: "Leather Jacket", code: "XS12", price: 1900 },
    { name: "All", title: "Leather Jacket", code: "XS12", price: 1900 },
    { name: "All", title: "Leather Jacket", code: "XS12", price: 1900 },
    { name: "All", title: "Leather Jacket", code: "XS12", price: 1900 },
    { name: "All", title: "Leather Jacket", code: "XS12", price: 1900 },
    { name: "All", title: "Leather Jacket", code: "XS12", price: 1900 },
    { name: "All", title: "Leather Jacket", code: "XS12", price: 1900 },
    { name: "All", title: "Leather Jacket", code: "XS12", price: 1900 },
    { name: "All", title: "Leather Jacket", code: "XS12", price: 1900 },
    { name: "All", title: "Leather Jacket", code: "XS12", price: 1900 },
    { name: "All", title: "Leather Jacket", code: "XS12", price: 1900 },
    { name: "All", title: "Leather Jacket", code: "XS12", price: 1900 },
    { name: "All", title: "Leather Jacket", code: "XS12", price: 1900 },
    { name: "All", title: "Leather Jacket", code: "XS12", price: 1900 },
    { name: "All", title: "Leather Jacket", code: "XS12", price: 1900 },
    { name: "All", title: "Leather Jacket", code: "XS12", price: 1900 },
    { name: "All", title: "Leather Jacket", code: "XS12", price: 1900 },
    { name: "All", title: "Leather Jacket", code: "XS12", price: 1900 },
  ];
  return (
    <div className="w-full overflow-auto">
      <div className="w-full flex justify-between h-8 items-center">
        <ul className="flex justify-between w-1/3">
          {menu.map((item, index) => {
            return (
              <li
                key={index}
                onClick={() => setCategory(item.name)}
                className={`${
                  category === item.name
                    ? "bg-black text-white pl-2 pr-2 rounded-lg hover:cursor-pointer"
                    : "hover:cursor-pointer"
                }`}
              >
                {item.name}
              </li>
            );
          })}
        </ul>
        <div className="w-1/3 flex justify-between items-center">
          <div className="flex items-center">
            <p className="mr-4">Card Details</p>

            <AiFillCreditCard className="border-gray-300 border-4 text-2xl bg-gray-300" />
          </div>
          <span>
            <button className="bg-black text-white pt-1 pb-1 pl-2 pr-2 rounded-xl">
              + Add Products
            </button>
          </span>
        </div>
      </div>
      <div className="flex w-full h-full mt-8">
        <div className="w-full h-full">
          <ul className="grid gap-2 grid-cols-1  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 lg:gap-8">
            {products.map((item, index) => {
              return (
                <li
                  key={index}
                  className="h-56 bg-gray-300 w-52 shadow-xl rounded-xl hover:cursor-pointer p-4 relative hover:shadow-gray-400"
                >
                  <div className="absolute top-2 right-2 border-2 border-black rounded-full h-5 w-5 bg-black flex items-center justify-center pb-1">
                    <p className="text-white text-xl">+</p>
                  </div>
                  <div className="mt-2 flex items-center justify-center">
                    <Image
                      src="/jacket1.png"
                      height={100}
                      width={100}
                      alt="asd"
                    />
                  </div>
                  <div className="w-full mt-2">
                    <div className="flex items-center justify-center">
                      <span className="font-semibold">{item.title}</span>
                    </div>
                    <div className="flex justify-between mt-1">
                      <span className="text-sm text-gray-600">
                        Code: {""}
                        {item.code}
                      </span>
                      <span className="text-sm border-2  border-gray-600 text-white bg-gray-600 rounded-xl pl-2 pr-2">
                        Rs {item.price}
                      </span>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Pos;
