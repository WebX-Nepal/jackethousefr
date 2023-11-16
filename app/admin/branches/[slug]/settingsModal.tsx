"use client";
import React, { useEffect, useState } from "react";
import LoadingScreen from "../../../../components/LoadingScreen";
import { toast } from "react-toastify";
import Image from "next/image";
import { useForm, SubmitHandler, Controller } from "react-hook-form";

const BranchSettingsModal = ({ isOpen, closeModal }: any) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
    setValue,
  } = useForm({
    defaultValues: {
      name: "",
      category: "",
      costPrice: 0,
      sellingPrice: 0,
      totalItems: 0,
      colors: [""],
      discount: 0,
      size: "",
    },
    // resolver: yupResolver(validationSchema),
  });
  useEffect(() => {
    // setValue("name", selectedRowData?.name);
    // setValue("category", selectedRowData?.category);
    // setValue("costPrice", selectedRowData?.costPrice);
    // setValue("sellingPrice", selectedRowData?.sellingPrice);
    // setValue("totalItems", selectedRowData?.totalItems);
    // setValue("colors", selectedRowData?.colors);
    // setValue("discount", selectedRowData?.discount);
    // setValue("size", selectedRowData?.size);
    // setID(selectedRowData?._id);
  }, []);
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
            Branch Settings
          </h1>

          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2 pr-8">
            <div>
              Branch Name:
              <div className="border rounded-xl border-gray-600  flex items-center justify-center">
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <input
                      type="text"
                      className="w-full h-full p-3 outline-none placeholder-gray-500 bg-white text-black rounded-xl"
                      {...field}
                    />
                  )}
                />
              </div>
              <p className="text-red-600">{errors.name?.message}</p>
            </div>
            <div>
              Branch Location:
              <div className="border border-gray-600 rounded-xl flex items-center justify-center">
                <Controller
                  name="category"
                  control={control}
                  render={({ field }) => (
                    <input
                      type="text"
                      className="w-full h-full p-3 outline-none placeholder-gray-500 bg-white text-black rounded-xl"
                      {...field}
                    />
                  )}
                />
              </div>
              <p className="text-red-600">{errors.category?.message}</p>
            </div>
            <div>
              Branch Username:
              <div className="border border-gray-600 rounded-xl flex items-center justify-center">
                <Controller
                  name="costPrice"
                  control={control}
                  render={({ field }) => (
                    <input
                      type="text"
                      className="w-full h-full p-3 outline-none placeholder-gray-500 bg-white text-black rounded-xl"
                      {...field}
                    />
                  )}
                />
              </div>
              <p className="text-red-600">{errors.costPrice?.message}</p>
            </div>
            <div>
              Branch Password
              <div className="border border-gray-600 rounded-xl flex items-center justify-center">
                <Controller
                  name="sellingPrice"
                  control={control}
                  render={({ field }) => (
                    <input
                      type="text"
                      className="w-full h-full p-3 outline-none placeholder-gray-500 bg-white text-black rounded-xl"
                      {...field}
                    />
                  )}
                />
              </div>
              <p className="text-red-600">{errors.sellingPrice?.message}</p>
            </div>
            <div>
              Branch Phone:
              <div className="border border-gray-600 rounded-xl flex items-center justify-center">
                <Controller
                  name="totalItems"
                  control={control}
                  render={({ field }) => (
                    <input
                      type="text"
                      className="w-full h-full p-3 outline-none placeholder-gray-500 bg-white text-black rounded-xl"
                      {...field}
                    />
                  )}
                />
              </div>
              <p className="text-red-600">{errors.totalItems?.message}</p>
            </div>
          </div>
          <div className="flex justify-end mt-6">
            <button
              className="px-6 py-2 leading-5 text-black transition-colors duration-200 transform bg-transparant border-white border rounded-2xl shadow-md shadow-buttonShadow  focus:outline-none focus:bg-gray-600 focus:text-white"
              type="button"
            >
              Save
            </button>
          </div>
        </section>
      </>
    </div>
  );
};

export default BranchSettingsModal;
