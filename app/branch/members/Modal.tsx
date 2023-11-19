"use client";
import React, { useEffect, useState } from "react";
import { useGetMemberSalesHistoryQuery } from "../../../redux/api/secureApi";
import { skipToken } from "@reduxjs/toolkit/query";
import CustomScrollbar from "@/components/ScrollBar";

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
              <h1 className="font-semibold">Purchase History</h1>
            </div>

            <div className="flex flex-col">
              <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                  <div className="overflow-hidden">
                    <CustomScrollbar scrollHeight={250}>
                      <table className="min-w-full text-left text-sm font-light">
                        <thead className="border-b font-medium dark:border-neutral-500">
                          <tr>
                            <th scope="col" className="px-6 py-4">
                              SN
                            </th>
                            <th scope="col" className="px-6 py-4">
                              Payment
                            </th>
                            <th scope="col" className="px-6 py-4">
                              Products
                            </th>
                            <th scope="col" className="px-6 py-4">
                              Total Price
                            </th>
                            <th scope="col" className="px-6 py-4">
                              Date
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {productData.map((item: any, key) => {
                            return (
                              <tr className="border-b transition duration-300 ease-in-out hover:bg-primary font-normal">
                                <td className="whitespace-nowrap px-6 py-4">
                                  {key + 1}
                                </td>
                                <td className="whitespace-nowrap px-6 py-4">
                                  {item.paymentMethod}
                                </td>
                                <td className="whitespace-nowrap px-6 py-4">
                                  {/* Render products within this cell */}
                                  <ul>
                                    {item.products.map(
                                      (product: any, index: number) => (
                                        <li key={index}>
                                          {product.productName}
                                        </li>
                                      )
                                    )}
                                  </ul>
                                </td>
                                <td className="whitespace-nowrap px-6 py-4">
                                  {item.totalAmount}
                                </td>
                                <td className="whitespace-nowrap px-6 py-4">
                                  {new Date(
                                    item.createdAt
                                  ).toLocaleDateString()}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </CustomScrollbar>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      </div>
    </div>
  );
};

export default ViewModal;
