"use client";
import React, { useEffect, useState } from "react";
import {
  useGetUserProfileQuery,
  useGetBranchDetailsQuery,
  useSubmitQRCodeForPrintMutation,
} from "@/redux/api/secureApi";
import CustomScrollbar from "@/components/ScrollBar";
const BillModal = ({
  isOpen,
  closeModal,
  cartItems,
  grandTotal,
  discountAmount,
  resetSalesProcess,
  newName,
}: any) => {
  const [branchDetails, setBranchDetails] = useState<any>([]);
  const [userData, setData] = useState<any>();
  const { data, isSuccess } = useGetBranchDetailsQuery({});
  const {
    data: userDetailsData,
    isSuccess: isUserProfileSuccess,
    refetch,
  } = useGetUserProfileQuery({});
  const [
    sendData,
    { isSuccess: isSendDataSuccess, isLoading: isDataSendingLoading },
  ] = useSubmitQRCodeForPrintMutation();
  useEffect(() => {
    if (data && isSuccess) {
      setBranchDetails(data?.data);
    }
  }, [isSuccess]);
  useEffect(() => {
    if (userDetailsData && isUserProfileSuccess) {
      setData(userDetailsData?.user);
    }
  }, [isUserProfileSuccess]);
  useEffect(() => {
    const handleClickOutside = (e: any) => {
      if (isOpen && e.target.classList.contains("modal-container")) {
        closeModal();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, closeModal]);
  if (!isOpen) return null;

  const handleCompleteSales = async () => {
    await sendData({
      cartItems,
      grandTotal,
      discountAmount,
      branchDetails,
      newName,
    });
    resetSalesProcess(); //bill print logic
    closeModal();
  };

  return (
    <div
      className={`fixed inset-0 top-12 flex items-center justify-center z-50 modal-container ${
        isOpen ? "" : "hidden"
      }`}
    >
      <div className="bg-modalBackground p-6 w-1/3 h-1/3 sm:w-1/2 rounded-3xl shadow-2xl mt-5 sm:h-[75vh]">
        <>
          <div className="w-full h-full ">
            <div className="h-8">
              <h1 className="text-2xl w-full text-center font-semibold">
                Jacket House
              </h1>
            </div>
            <p className="w-full text-center">{branchDetails?.branchName}</p>
            <p className="w-full text-center">{branchDetails?.address}</p>
            <p className="w-full text-center">Phone:{userData?.phone}</p>
            <p className="w-full text-center">Retail Invoice</p>
            <p className="w-full text-left pl-6">
              Date : {new Date().toLocaleDateString()}
            </p>
            <p className="w-full text-left pl-6 font-semibold">
              Customer's Name :{newName}
            </p>
            <hr className="pt-1" />
            <CustomScrollbar scrollHeight={150}>
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="">
                  <tr>
                    <th className="px-6 py-3 text-left text-md font-semibold text-black  tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-md font-bold text-black  tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-md font-bold text-black  tracking-wider">
                      Discount(%)
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {cartItems.length > 0 &&
                    cartItems.map((item: any, index: number) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {item?.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {item?.sellingPrice}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {item?.discount}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </CustomScrollbar>
            <div>
              <div className="w-full flex pr-4">
                <p className="w-full text-left pl-6 font-semibold">
                  Total Discount Amount
                </p>
                <p>{discountAmount.toFixed(2)}</p>
              </div>
              <div className="w-full flex pr-4">
                <p className="w-full pl-6">Total Amount</p>
                <p>{grandTotal.toFixed(2)}</p>
              </div>
            </div>
            <div className="flex items-center justify-center h-1/3 flex-col">
              <div className="flex justify-between w-4/5 ">
                <button
                  onClick={handleCompleteSales}
                  className="bg-white text-black rounded-xl px-8 py-2 mr-4"
                >
                  Close
                </button>
                <button
                  onClick={handleCompleteSales}
                  className="bg-black text-white rounded-xl px-8 py-2 ml-4"
                >
                  Print
                </button>
              </div>
            </div>
          </div>
        </>
      </div>
    </div>
  );
};

export default BillModal;
