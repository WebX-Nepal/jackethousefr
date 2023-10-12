import React, { useEffect, useState } from "react";
import CustomScrollbar from "./ScrollBar";
import {
  useGetProductByIdQuery,
  useGetMemberByIDQuery,
} from "../redux/api/secureApi";
import { addItems } from "@/redux/slices/counterSlice";
import { RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";

const Modal = ({ isOpen, closeModal }: any) => {
  const dispatch = useDispatch();
  const [productID, setProductID] = useState("");
  const [isPaymentModal, setIsPaymentModal] = useState(false);
  const [billPrice, setBillPrice] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [memberName, setMemberName] = useState("");
  const counterValue: any = useSelector(
    (state: RootState) => state.counter.cartItem
  );
  const { data: productIdData, isSuccess: isProductIdSuccess } =
    useGetProductByIdQuery(productID);
  const { data: MemberData, isSuccess: MemberSearchSuccess } =
    useGetMemberByIDQuery(phoneNumber);
  const handleChange = (e: any) => {
    setProductID(e.target.value);
  };
  const addItemToCart = () => {
    if (productIdData && isProductIdSuccess) {
      dispatch(addItems(productIdData.products));
    }
  };
  const handleNumberChange = (e: any) => {
    setPhoneNumber(e.target.value);
  };
  const openPaymentModal = () => {
    setIsPaymentModal(true);
    const totalPrice = counterValue.reduce(
      (accumulator: number, currentObject: any) => {
        return accumulator + currentObject.sellingPrice;
      },
      0
    );
    setBillPrice(totalPrice);
  };
  useEffect(() => {
    if (MemberData && MemberSearchSuccess) {
      setMemberName(MemberData.member.name);
    }
  }, [MemberData]);

  useEffect(() => {
    const handleClickOutside = (e: any) => {
      if (isOpen && e.target.classList.contains("modal-container")) {
        closeModal();
        setIsPaymentModal(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, closeModal]);
  if (!isOpen) return null;
  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 modal-container ${
        isOpen ? "" : "hidden"
      }`}
    >
      <div className="bg-slate-500 p-6 w-2/3 h-2/3 sm:w-1/2 rounded-3xl">
        {isPaymentModal ? (
          <>
            <div>
              <h2 className="text-xl font-semibold mb-4">Payment</h2>
            </div>
            <div className="flex items-center justify-between">
              <div className="">
                <h2 className="text-xl font-semibold ">
                  Total Amount : {billPrice}
                </h2>
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
                  onChange={handleNumberChange}
                />
              </div>
              <h2 className="font-semibold ml-8">Name:</h2>
              <div className="ml-4 flex items-center rounded-xl border border-gray-600 p-1 bg-white w-1/2">
                <input
                  className="outline-none placeholder-gray-500 bg-transparent text-black ml-6"
                  type="text"
                  placeholder="Name"
                  value={memberName}
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
          </>
        ) : (
          <>
            <div>
              <h2 className="text-xl font-semibold mb-4">Item Details</h2>
            </div>
            <div className="flex">
              <div className="flex items-center rounded-xl border border-gray-600 p-2 justify-between bg-white w-4/5">
                <input
                  className="outline-none placeholder-gray-500 bg-white text-black flex  flex-grow "
                  type="text"
                  placeholder="Enter Product ID"
                  onChange={handleChange}
                />
              </div>
              <button
                className="bg-black text-white ml-8 pl-4 pr-4 pt-3 pb-3 rounded-2xl"
                onClick={addItemToCart}
              >
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
                        Category
                      </th>

                      <th className="px-6 py-3 text-left text-md font-bold text-black  tracking-wider">
                        Price
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {counterValue.length > 0 &&
                      counterValue.map((item: any, index: number) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {index + 1}
                          </td>

                          <td className="px-6 py-4 whitespace-nowrap">
                            {item?.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {item?.category}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {item?.sellingPrice}
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
          </>
        )}
      </div>
    </div>
  );
};

export default Modal;
