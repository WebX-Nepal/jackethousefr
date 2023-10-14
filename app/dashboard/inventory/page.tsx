"use client";
import React, { useEffect, useState } from "react";
import {
  useGetAllMembersQuery,
} from "../../../redux/api/secureApi";
import InventoryModal from "./Modal";
function Inventory() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const [productData, setProducts] = useState([]);
  const { data, isSuccess } = useGetAllMembersQuery({});
  useEffect(() => {
    if (data && isSuccess) {
      setProducts(data.member);
    } else {
    }
  }, [data]);
  return (
    <>
      <div className={`w-full`}>
        <div className="w-full flex justify-between h-8 items-center ">
          <div className="w-1/3 flex justify-between items-center">
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
        <div
          className={`flex w-full h-full mt-8 ${
            isModalOpen ? "opacity-25" : ""
          }`}
        >
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark w-full">
            <div className="py-6 px-4 md:px-6 xl:px-7.5 flex justify-between">
              <h4 className="text-xl font-semibold text-black ">Members</h4>
            </div>

            <div className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5 mb-3 p-5">
              <div className="col-span-2 hidden items-center sm:flex">
                <p className="font-medium">Name</p>
              </div>
              <div className="col-span-2 hidden items-center sm:flex">
                <p className="font-medium">Phone Number</p>
              </div>
              <div className="col-span-1 flex items-center">
                <p className="font-medium">Points</p>
              </div>
            </div>

            {productData?.map((product: any, key: number) => (
              <div
                className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5 p-5"
                key={key}
              >
                <div className="col-span-2 hidden items-center sm:flex">
                  <p className="text-sm text-black ">{product.name}</p>
                </div>
                <div className="col-span-2 hidden items-center sm:flex">
                  <p className="text-sm text-black ">{product.phone}</p>
                </div>
                <div className="col-span-1 flex items-center">
                  <p className="text-sm text-black ">{product.points}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <InventoryModal
          isOpen={isModalOpen}
          closeModal={closeModal}
        ></InventoryModal>
      </div>
    </>
  );
}

export default Inventory;
