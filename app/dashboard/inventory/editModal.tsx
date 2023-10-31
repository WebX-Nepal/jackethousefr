"use client";
import React, { useEffect, useRef, useState } from "react";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import validationSchema from "./validation";
import { useCreateProductsMutation } from "../../../redux/api/secureApi";
import LoadingScreen from "../../../components/LoadingScreen";
import { toast } from "react-toastify";
import CustomScrollbar from "./ScrollBar";
import SelectSearch from "../../../components/Select";
const InventoryEditModal = ({ isOpen, closeModal, selectedRowData }: any) => {
  console.log("row data selected is", selectedRowData);
  registerPlugin(
    FilePondPluginImageExifOrientation,
    FilePondPluginImagePreview
  );
  const [isDataSending, setIsdataSending] = useState<boolean>(false);
  const [files, setFiles] = useState<any>();
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
    resolver: yupResolver(validationSchema),
  });
  useEffect(() => {
    setValue("name", selectedRowData?.name);
    setValue("category", selectedRowData?.category);
    setValue("costPrice", selectedRowData?.costPrice);
    setValue("sellingPrice", selectedRowData?.sellingPrice);
    setValue("totalItems", selectedRowData?.totalItems);
    setValue("colors", selectedRowData?.colors);
    setValue("discount", selectedRowData?.discount);
    setValue("size", selectedRowData?.size);
  }, [selectedRowData]);
  const [
    sendEditedData,
    { isSuccess: isSendDataSuccess, isLoading: isDataSendingLoading },
  ] = useCreateProductsMutation();
  const onSubmit: SubmitHandler<any> = async (data) => {
    console.log("Data is", data);
    // const formData = new FormData();
    // for (const key in data) {
    //   formData.append(key, data[key]);
    // }
    // formData.append("image", files[0]?.file);
    // await sendData(formData);
    reset();
  };

  useEffect(() => {
    if (isSendDataSuccess) {
      closeModal();
      setFiles(null);
      toast.success("Successfully Edited Product");
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
          <section className="w-1/2 h-2/3 p-6 mx-autorounded-md shadow-2xl bg-modalBackground  mt-20 z-50 rounded-xl">
            <h1 className="text-xl font-bold text-Black capitalize pb-4">
              Edit Products
            </h1>
            <form onSubmit={handleSubmit(onSubmit)}>
              <CustomScrollbar>
                <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2 pr-8">
                  <div>
                    Name:
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
                    Category:
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
                    Cost Price:
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
                    Selling Price:
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
                    <p className="text-red-600">
                      {errors.sellingPrice?.message}
                    </p>
                  </div>
                  <div>
                    Total Items:
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
                  <div>
                    Colors:
                    <div className="border border-gray-600 rounded-xl flex items-center justify-center"></div>
                    <Controller
                      name="colors"
                      control={control}
                      render={({ field }) => (
                        <input
                          type="text"
                          className="w-full h-full p-3 outline-none placeholder-gray-500 bg-white text-black rounded-xl"
                          {...field}
                        />
                      )}
                    />
                    <p className="text-red-600">{errors.colors?.message}</p>
                  </div>
                  <div>
                    Discount (%):
                    <div className="border border-gray-600 rounded-xl flex items-center justify-center">
                      <Controller
                        name="discount"
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
                    <p className="text-red-600">{errors.discount?.message}</p>
                  </div>
                  <div>
                    Size:
                    <div className="border border-gray-600 rounded-xl flex items-center justify-center">
                      <Controller
                        name="size"
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
                      labelIdle={`
                      Drag & Drop your <span class="filepond--label-action">Image</span> Files     `}
                    />
                  </div>
                </div>
              </CustomScrollbar>
              <div className="flex justify-end mt-6">
                <button
                  className="px-6 py-2 leading-5 text-black transition-colors duration-200 transform bg-transparant border-white border rounded-2xl shadow-md shadow-buttonShadow  focus:outline-none focus:bg-gray-600 focus:text-white"
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

export default InventoryEditModal;
