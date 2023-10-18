"use client";
import React, { useEffect, useRef, useState } from "react";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import validationSchema from "./validation";
import { useCreateProductsMutation } from "../../../redux/api/secureApi";
import LoadingScreen from "../../../components/LoadingScreen";
import { toast } from "react-toastify";
const InventoryModal = ({ isOpen, closeModal, refetch }: any) => {
  registerPlugin(
    FilePondPluginImageExifOrientation,
    FilePondPluginImagePreview
  );
  const [isDataSending, setIsdataSending] = useState<boolean>(false);
  const [files, setFiles] = useState<any>();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const [
    sendData,
    { isSuccess: isSendDataSuccess, isLoading: isDataSendingLoading },
  ] = useCreateProductsMutation();
  const onSubmit: SubmitHandler<any> = async (data) => {
    const formData = new FormData();
    for (const key in data) {
      formData.append(key, data[key]);
    }
    formData.append("image", files[0]?.file);
    await sendData(formData);
    reset();
  };

  useEffect(() => {
    if (isSendDataSuccess) {
      closeModal();
      setFiles(null);
      toast.success("Successfully Created Sale");
      refetch();
    } else {
    }
  }, [isSendDataSuccess]);
  useEffect(() => {
    if (isDataSendingLoading) {
      setIsdataSending(true);
    } else {
      setIsdataSending(false);
    }
  }, [isDataSendingLoading]);
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
      {isDataSending ? (
        <>
          <LoadingScreen message="Sending Data. Please Wait...." />
        </>
      ) : (
        <>
          <section className="w-1/2 p-6 mx-autorounded-md shadow-2xl bg-modalBackground  mt-20 z-50">
            <h1 className="text-xl font-bold text-Black capitalize">
              Add Products
            </h1>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                <div className="border border-gray-600 rounded-xl flex items-center justify-center">
                  <input
                    id="name"
                    type="text"
                    placeholder="Please Enter Name"
                    className=" w-full h-full p-2 outline-none placeholder-gray-500 bg-transparent text-black"
                    {...register("name")}
                  />
                  <p className="text-red-600">{errors.name?.message}</p>
                </div>
                <div className="border border-gray-600 rounded-xl flex items-center justify-center">
                  <input
                    id="name"
                    type="text"
                    placeholder="Please Enter Category"
                    className=" w-full h-full p-2 outline-none placeholder-gray-500 bg-transparent text-black"
                    {...register("category")}
                  />
                  <p className="text-red-600">{errors.category?.message}</p>
                </div>
                <div className="border border-gray-600 rounded-xl flex items-center justify-center">
                  <input
                    id="name"
                    type="text"
                    placeholder="Please Enter Cost Price"
                    className=" w-full h-full p-2 outline-none placeholder-gray-500 bg-transparent text-black"
                    {...register("costPrice")}
                  />
                  <p className="text-red-600">{errors.costPrice?.message}</p>
                </div>
                <div className="border border-gray-600 rounded-xl flex items-center justify-center">
                  <input
                    id="name"
                    type="text"
                    placeholder="Please Enter Selling Price"
                    className=" w-full h-full p-2 outline-none placeholder-gray-500 bg-transparent text-black"
                    {...register("sellingPrice")}
                  />
                  <p className="text-red-600">{errors.sellingPrice?.message}</p>
                </div>
                <div className="border border-gray-600 rounded-xl flex items-center justify-center">
                  <input
                    id="name"
                    type="text"
                    placeholder="Please Enter Total Items"
                    className=" w-full h-full p-2 outline-none placeholder-gray-500 bg-transparent text-black"
                    {...register("totalItems")}
                  />
                  <p className="text-red-600">{errors.totalItems?.message}</p>
                </div>
                <div className="border border-gray-600 rounded-xl flex items-center justify-center">
                  <input
                    id="name"
                    type="text"
                    placeholder="Please Enter Colors"
                    className=" w-full h-full p-2 outline-none placeholder-gray-500 bg-transparent text-black"
                    {...register("colors")}
                  />
                  <p className="text-red-600">{errors.colors?.message}</p>
                </div>
                <div className="border border-gray-600 rounded-xl flex items-center justify-center">
                  <input
                    id="name"
                    type="text"
                    placeholder="Please Enter Discount (%)"
                    className=" w-full h-full p-2 outline-none placeholder-gray-500 bg-transparent text-black"
                    {...register("discount")}
                  />
                  <p className="text-red-600">{errors.discount?.message}</p>
                </div>
                <div className="border border-gray-600 rounded-xl flex items-center justify-center">
                  <input
                    id="name"
                    type="text"
                    placeholder="Please Enter Size"
                    className=" w-full h-full p-2 outline-none placeholder-gray-500 bg-transparent text-black"
                    {...register("size")}
                  />
                  <p className="text-red-600">{errors.size?.message}</p>
                </div>

                <div className="w-full">
                  <FilePond
                    files={files}
                    allowMultiple={false}
                    allowRevert
                    allowDrop
                    onupdatefiles={setFiles}
                    styleButtonRemoveItemPosition="left"
                  />
                </div>
              </div>
              <div className="flex justify-end mt-6">
                <button
                  className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-red-600 rounded-md hover:bg-pink-700 focus:outline-none focus:bg-gray-600"
                  onClick={handleSubmit(onSubmit)}
                  type="button"
                >
                  Save
                </button>
              </div>
            </form>
          </section>
        </>
      )}
    </div>
  );
};

export default InventoryModal;
