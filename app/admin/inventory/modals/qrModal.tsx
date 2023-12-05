"use client";
import React, { useEffect } from "react";
import CustomScrollbar from "@/components/ScrollBar";
import Barcode from "react-jsbarcode";

const QrModal = ({ isOpen, closeModal, selectedRowData }: any) => {
  let selectedRows = selectedRowData?.selectedRows;
  console.log("slected rows are", selectedRows);
  if (!selectedRows) {
    // Handle the case where selectedRows is undefined
    console.error("selectedRows is undefined");
    // You can return or render an appropriate fallback content here
    return null;
  }

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
      className={`fixed inset-0 flex items-center justify-center z-50 modal-container ${
        isOpen ? "" : "hidden"
      }`}
    >
      <>
        <section className="w-1/2 h-2/3 p-6 mx-autorounded-md shadow-2xl bg-modalBackground  mt-20 z-50 rounded-xl">
          <h1 className="text-xl font-bold text-Black capitalize pb-4">
            Products Barcode
          </h1>

          <CustomScrollbar scrollHeight={250}>
            {selectedRows && (
              <div className="grid  grid-cols-3 w-full ">
                {selectedRows.map((item: any, index: number) => (
                  <div key={index} className="mb-4">
                    <Barcode value={item?._id.slice(-6)} />
                  </div>
                ))}
              </div>
            )}
          </CustomScrollbar>
          <div className="flex justify-end mt-6">
            <button
              className="px-6 py-2 leading-5 text-black transition-colors duration-200 transform bg-transparant border-white border rounded-2xl shadow-md shadow-buttonShadow  focus:outline-none focus:bg-gray-600 focus:text-white"
              type="button"
            >
              Print
            </button>
          </div>
        </section>
      </>
    </div>
  );
};

export default QrModal;
