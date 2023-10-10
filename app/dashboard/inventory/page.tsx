"use client";
import React, { useState } from "react";
import ReactDOM from "react-dom";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

// Register the plugins
function Inventory() {
  registerPlugin(
    FilePondPluginImageExifOrientation,
    FilePondPluginImagePreview
  );

  const [files, setFiles] = useState<any>([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
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
          <form>
            <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
              <div>
                <label className="text-white dark:text-gray-200">Name</label>
                <input
                  id="username"
                  type="text"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600  "
                />
              </div>
              <div>
                <label className="text-white dark:text-gray-200">
                  Category
                </label>
                <input
                  id="emailAddress"
                  type="email"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600  "
                />
              </div>
              <div>
                <label className="text-white dark:text-gray-200">
                  Cost Price
                </label>
                <input
                  id="emailAddress"
                  type="email"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600  "
                />
              </div>
              <div>
                <label className="text-white dark:text-gray-200">
                  Selling Price
                </label>
                <input
                  id="emailAddress"
                  type="email"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600  "
                />
              </div>
              <div>
                <label className="text-white dark:text-gray-200">
                  Total Items
                </label>
                <input
                  id="emailAddress"
                  type="email"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600  "
                />
              </div>
              <div>
                <label className="text-white dark:text-gray-200">Color</label>
                <input
                  id="emailAddress"
                  type="email"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600  "
                />
              </div>
              <div>
                <label className="text-white dark:text-gray-200">
                  Discount
                </label>
                <input
                  id="emailAddress"
                  type="email"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600  "
                />
              </div>
              <div>
                <label className="text-white dark:text-gray-200">Size</label>
                <input
                  id="emailAddress"
                  type="email"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600  "
                />
              </div>

              <div className="w-full">
                <label className="text-white dark:text-gray-200">Image</label>
                <FilePond
                  files={files}
                  allowMultiple={true}
                  allowRevert
                  allowDrop
                  onupdatefiles={setFiles}
                  styleButtonRemoveItemPosition="left"
                  // styleButtonRemoveItemAlign
                />
              </div>
            </div>
            <div className="flex justify-end mt-6">
              <button className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-pink-500 rounded-md hover:bg-pink-700 focus:outline-none focus:bg-gray-600">
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
