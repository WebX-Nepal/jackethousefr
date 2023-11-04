"use client";
import React, { useEffect, useState } from "react";
import LoadingScreen from "../../../components/LoadingScreen";
import { toast } from "react-toastify";
import CustomScrollbar from "./ScrollBar";
import Image from "next/image";

const QrModal = ({ isOpen, closeModal }: any) => {
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
            Edit Products
          </h1>

          <CustomScrollbar>
            <div>hello</div>
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
