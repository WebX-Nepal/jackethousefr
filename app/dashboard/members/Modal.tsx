"use client";
import React, { useEffect, useState } from "react";
import { useGetMemberSalesHistoryQuery } from "../../../redux/api/secureApi";
import { SkipToken, skipToken } from "@reduxjs/toolkit/query";
const ViewModal = ({ isOpen, closeModal, memberId }: any) => {
  const [productData, setProductData] = useState([]);
  const { data: salesHistoryData, isSuccess: salesHistoryDataSuccess } =
    useGetMemberSalesHistoryQuery(memberId ?? skipToken);
  useEffect(() => {
    if (salesHistoryData && salesHistoryDataSuccess) {
      setProductData(salesHistoryData?.member?.salesHistory);
    }
  }, [salesHistoryData]);
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
  console.log("product data is", productData);
  return (
    <div
      className={`fixed inset-0 top-12 flex items-center justify-center z-50 modal-container ${
        isOpen ? "" : "hidden"
      }`}
    >
      <div className="bg-modalBackground p-6 w-2/3 h-2/3 sm:w-1/2 rounded-3xl shadow-2xl mt-5 sm:h-[75vh]">
        <>
          <div className="w-full h-full ">
            <div className="h-8">
              <h1>Purchase History</h1>
            </div>
          </div>
        </>
        
      </div>
    </div>
  );
};

export default ViewModal;
