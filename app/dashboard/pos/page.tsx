"use client";
import React, { useState } from "react";
import { AiFillCreditCard } from "react-icons/ai";
import Image from "next/image";
import Modal from "../../../components/Modal";
import { data } from "../../../dummyData";
import CustomScrollbar from "../../../components/ScrollBar";
import { useGetAllProductsQuery } from "../../../redux/api/secureApi";
function Pos() {
  const { data: allData, refetch, isSuccess } = useGetAllProductsQuery();
  const [category, setCategory] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPaymentModal, setIsPaymentModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const openPaymentModal = () => {
    setIsPaymentModal(true);
  };
  const closePaymentModal = () => {
    setIsPaymentModal(false);
  };
  const menu = [
    { name: "All" },
    { name: "Men" },
    { name: "Women" },
    { name: "Sports Wear" },
  ];
  console.log("all data is", allData);

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
  ];
  return (
    <div className={`w-full`}>
      <div className="w-full flex justify-between h-8 items-center ">
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
            <button
              className="bg-black text-white pt-1 pb-1 pl-2 pr-2 rounded-xl"
              onClick={openModal}
            >
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
                      src="https://res.cloudinary.com/dgt9nvfjk/image/upload/v1696989329/cxng5ll9ck6hodv6frpn.png"
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
      <Modal isOpen={isModalOpen} closeModal={closeModal}>
        <div>
          <h2 className="text-xl font-semibold mb-4">Item Details</h2>
        </div>
        <div className="flex">
          <div className="flex items-center rounded-xl border border-gray-600 p-2 justify-between bg-white w-4/5">
            <input
              className="outline-none placeholder-gray-500 bg-white text-black flex  flex-grow "
              type="text"
              placeholder="Search For Products..."
            />
          </div>
          <button className="bg-black text-white ml-8 pl-4 pr-4 pt-3 pb-3 rounded-2xl">
            Add Items
          </button>
        </div>
        <div className="mt-8 flex items-center justify-center">
          <CustomScrollbar>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="">
                <tr>
                  <th className="px-6 py-3 text-left text-md font-semibold text-black  tracking-wider">
                    SN
                  </th>
                  <th className="px-6 py-3 text-left text-md font-semibold text-black  tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-md font-semibold text-black  tracking-wider">
                    Color
                  </th>
                  <th className="px-6 py-3 text-left text-md font-semibold text-black  tracking-wider">
                    Item
                  </th>
                  <th className="px-6 py-3 text-left text-md font-bold text-black  tracking-wider">
                    Price
                  </th>
                  {/* Add more table headers as needed */}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {data.map((item, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>

                    <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.color}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.items}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.price}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CustomScrollbar>
        </div>
        <div className="w-full flex mt-6 justify-between ">
          <button className="bg-white text-black pl-4 pr-4 pt-3 pb-3 rounded-2xl">
            Cancel
          </button>

          <button
            className="bg-black text-white pl-4 pr-4 pt-3 pb-3 rounded-2xl"
            onClick={openPaymentModal}
          >
            Proceed
          </button>
        </div>
      </Modal>
      <Modal isOpen={isPaymentModal} closeModal={closePaymentModal}>
        <div>
          <h2 className="text-xl font-semibold mb-4">Payment</h2>
        </div>
        <div className="flex items-center justify-between">
          <div className="">
            <h2 className="text-xl font-semibold ">Total Amount : 26262</h2>
          </div>
          <div className="ml-4 flex items-center rounded-xl border border-gray-600 p-1 justify-between bg-white w-1/4">
            <input
              className="outline-none placeholder-gray-500 bg-transparent text-black ml-6"
              type="text"
              placeholder="Rs."
            />
          </div>
          <div className="ml-4 flex items-center rounded-xl border border-gray-600 p-1 justify-between bg-white w-1/4">
            Rs.
          </div>
        </div>
        <div className="mt-2">
          <h2 className="font-semibold">Please Select Payment Method:</h2>
        </div>
        <div className="flex mt-4 justify-between w-1/2">
          <span
            onClick={() => setPaymentMethod("cash")}
            className={`${
              paymentMethod == "cash"
                ? "bg-black text-white"
                : "bg-white text-black"
            }  pl-4 pr-4 pt-3 pb-3 rounded-2xl hover:cursor-pointer`}
          >
            Cash
          </span>
          <span
            onClick={() => setPaymentMethod("card")}
            className={`${
              paymentMethod == "card"
                ? "bg-black text-white"
                : "bg-white text-black"
            }  pl-4 pr-4 pt-3 pb-3 rounded-2xl hover:cursor-pointer`}
          >
            Card
          </span>
          <span
            onClick={() => setPaymentMethod("online")}
            className={`${
              paymentMethod == "online"
                ? "bg-black text-white"
                : "bg-white text-black"
            }  pl-4 pr-4 pt-3 pb-3 rounded-2xl hover:cursor-pointer`}
          >
            Online
          </span>
        </div>
        <div className="flex items-center mt-6">
          <h2 className="font-semibold">Number:</h2>
          <div className="ml-4 flex items-center rounded-xl border border-gray-600 p-1 bg-white w-1/4">
            <input
              className="outline-none placeholder-gray-500 bg-transparent text-black ml-6"
              type="text"
              placeholder="Phone Number"
            />
          </div>
          <h2 className="font-semibold ml-8">Name:</h2>
          <div className="ml-4 flex items-center rounded-xl border border-gray-600 p-1 bg-white w-1/2">
            <input
              className="outline-none placeholder-gray-500 bg-transparent text-black ml-6"
              type="text"
              placeholder="Name"
            />
          </div>
        </div>
        <div className="w-full flex mt-6 justify-between ">
          <button className="bg-white text-black pl-4 pr-4 pt-3 pb-3 rounded-2xl">
            Cancel
          </button>

          <button className="bg-black text-white pl-4 pr-4 pt-3 pb-3 rounded-2xl">
            Proceed
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default Pos;
