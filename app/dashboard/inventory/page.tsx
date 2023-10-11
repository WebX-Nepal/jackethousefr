"use client";
import React, { useState } from "react";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import validationSchema from "./validation";
import { useCreateProductsMutation } from "../../../redux/api/secureApi";
function Inventory() {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema), // Use the imported schema
  });

  const [sendData, { isSuccess, data, isLoading }] =
    useCreateProductsMutation();
  registerPlugin(
    FilePondPluginImageExifOrientation,
    FilePondPluginImagePreview
  );

  const [files, setFiles] = useState<any>();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const onSubmit: SubmitHandler<any> = (data) => {
    const formData = new FormData();
    for (const key in data) {
      formData.append(key, data[key]);
    }
    console.log("files is ", files[0].file);
    formData.append("image", files[0].file);
    sendData(formData);
  };
  return (
    <div>
      <h1 className="mb-5">Inventory</h1>
      <span>
        <button
          className="bg-black text-white pt-1 pb-1 pl-2 pr-2 rounded-xl float-left"
          onClick={openModal}
        >
          + Add Inventory
        </button>
      </span>
      {isModalOpen && (
        <section className="w-2/3 p-6 mx-auto bg-indigo-600 rounded-md shadow-2xl dark:bg-gray-800 mt-20">
          <h1 className="text-xl font-bold text-white capitalize dark:text-white">
            Add Products
          </h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
              <div>
                <label className="text-white dark:text-gray-200">Name</label>
                <input
                  id="name"
                  type="text"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600  "
                  {...register("name")}
                />
                <p className="text-red-600">{errors.name?.message}</p>
              </div>
              <div>
                <label className="text-white dark:text-gray-200">
                  Category
                </label>
                <input
                  type="text"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600  "
                  {...register("category")}
                />
                <p className="text-red-600">{errors.category?.message}</p>
              </div>
              <div>
                <label className="text-white dark:text-gray-200">
                  Cost Price
                </label>
                <input
                  type="text"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600  "
                  {...register("costPrice")}
                />
                <p className="text-red-600">{errors.costPrice?.message}</p>
              </div>
              <div>
                <label className="text-white dark:text-gray-200">
                  Selling Price
                </label>
                <input
                  type="text"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600  "
                  {...register("sellingPrice")}
                />
                <p className="text-red-600">{errors.sellingPrice?.message}</p>
              </div>
              <div>
                <label className="text-white dark:text-gray-200">
                  Total Items
                </label>
                <input
                  type="text"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600  "
                  {...register("totalItems")}
                />
                <p className="text-red-600">{errors.totalItems?.message}</p>
              </div>
              <div>
                <label className="text-white dark:text-gray-200">Color</label>
                <input
                  type="text"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600  "
                  {...register("colors")}
                />
                <p className="text-red-600">{errors.colors?.message}</p>
              </div>
              <div>
                <label className="text-white dark:text-gray-200">
                  Discount
                </label>
                <input
                  type="text"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600  "
                  {...register("discount")}
                />
                <p className="text-red-600">{errors.discount?.message}</p>
              </div>
              <div>
                <label className="text-white dark:text-gray-200">Size</label>
                <input
                  type="text"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600  "
                  {...register("size")}
                />
                <p className="text-red-600">{errors.size?.message}</p>
              </div>

              <div className="w-full">
                <label className="text-white dark:text-gray-200">Image</label>
                <FilePond
                  files={files}
                  allowMultiple={false}
                  allowRevert
                  allowDrop
                  onupdatefiles={setFiles}
                  styleButtonRemoveItemPosition="left"
                  // styleButtonRemoveItemAlign
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
      )}
    </div>
  );
}

export default Inventory;
