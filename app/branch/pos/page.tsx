"use client";
import React, { useEffect, useState } from "react";
import { AiFillCreditCard } from "react-icons/ai";
import { TiTick } from "react-icons/ti";
import Modal from "./Modal";
import { useGetLocalProductsByBranchQuery } from "../../../redux/api/secureApi";
import { useDispatch, useSelector } from "react-redux";
import { addItems, removeItems } from "@/redux/slices/counterSlice";
import { menu } from "../../../components/Constant";
import { RootState } from "../../../redux/store";
import useScreenWidth from "@/components/screenHook";

function Pos() {
  const dispatch = useDispatch();
  const screenWidth = useScreenWidth();
  const [category, setCategory] = useState("All");
  const [products, setProducts] = useState<any>([]);
  const [productName, setProductName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const cartItems: any = useSelector(
    (state: RootState) => state.counter.cartItem
  );
  const searchQuery: any = useSelector(
    (state: RootState) => state.search.searchQuery
  );
  const {
    data: allData,
    isSuccess,
    refetch,
  } = useGetLocalProductsByBranchQuery({
    category,
    productName,
  });
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    refetch();
  }, []);
  useEffect(() => {
    if (allData && isSuccess) {
      setProducts(allData?.products);
    }
  }, [allData]);
  useEffect(() => {
    setProductName(searchQuery);
  }, [searchQuery]);

  function handleItemAdd(item: any) {
    dispatch(addItems(item));
  }
  function handleItemRemove(item: any) {
    dispatch(removeItems(item));
  }
  return (
    <div className={`w-full p-6`}>
      <div className="w-full flex justify-between h-8 items-center ">
        <ul className="md:flex hidden justify-between w-1/3">
          {menu.map((item, index) => {
            return (
              <li
                key={index}
                onClick={() => setCategory(item.name)}
                className={`${
                  category === item.name
                    ? "bg-black text-white pl-2 pr-2 rounded-lg hover:cursor-pointer capitalize"
                    : "hover:cursor-pointer capitalize"
                }`}
              >
                {item.name}
              </li>
            );
          })}
        </ul>
        <div className=" flex justify-between items-center w-1/3 ">
          <div className="lg:flex hidden items-center pl-8">
            <p className="mr-4">Card Details</p>

            <AiFillCreditCard className="border-gray-300 border-4 text-2xl bg-gray-300" />
          </div>
          <span className="bg-black text-white pt-1 pb-1 pl-4 pr-4 rounded-xl flex">
            <span className="pr-2 pl-1 text-green-500 font-medium">
              {cartItems.length == 0 ? "" : cartItems.length}
            </span>
            <button onClick={openModal} className="pr-2">
              Checkout
            </button>
          </span>
        </div>
      </div>
      <div
        className={`flex w-full h-full mt-8 ${isModalOpen ? "blur-xl" : ""}`}
      >
        <div className="w-full h-full">
          <ul className="grid  grid-cols-1 sm:grid-cols-2 sm:gap-8 md:grid-cols-3 md:gap-y-8 md:gap-x-4 lg:grid-cols-4 lg:gap-6 xl:grid-cols-5 xl:gap-4 xl:gap-x-0.5 2xl:grid-cols-6">
            {products?.map((item: any, index: number) => {
              const isMatched = cartItems.some(
                (matchedItem: any) => matchedItem._id === item._id
              );
              return (
                <li
                  key={index}
                  className={`h-56 bg-gray-300 ${
                    screenWidth <= 640 ? "w-full mb-4" : "w-52 mb-6"
                  } shadow-xl rounded-xl hover:cursor-pointer p-4 relative hover:shadow-gray-400`}
                >
                  <div className="absolute top-1.5 right-1.5 border-2 border-black rounded-full h-5 w-5 bg-black flex items-center justify-center pb-1">
                    {isMatched ? (
                      <TiTick
                        className="text-white text-xl"
                        onClick={() => {
                          handleItemRemove(item);
                        }}
                      />
                    ) : (
                      <p
                        className="text-white text-xl"
                        onClick={() => {
                          handleItemAdd(item);
                        }}
                      >
                        +
                      </p>
                    )}
                  </div>
                  <div className="mt-2 flex items-center justify-center h-2/3 w-full">
                    <img
                      src={item.image ? item.image : "/logo.svg"}
                      className=" w-full h-full object-cover rounded-xl"
                      alt="Image Not Found"
                    />
                  </div>
                  <div className="w-full mt-2">
                    <div className="flex items-center justify-center">
                      <span className="font-semibold">{item.name}</span>
                    </div>
                    <div className="flex justify-between mt-1">
                      <span className="text-sm text-gray-600">
                        Code: {""}
                        {item.code}
                      </span>
                      <span className="text-sm border-2  border-gray-600 text-white bg-gray-600 rounded-xl pl-2 pr-2">
                        Rs {item.sellingPrice}
                      </span>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <Modal isOpen={isModalOpen} closeModal={closeModal}></Modal>
    </div>
  );
}

export default Pos;
