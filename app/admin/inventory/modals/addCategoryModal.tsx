"use client";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import CustomScrollbar from "../../../../components/ScrollBar";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  useCreateCategoryMutation,
  useDeleteCategoryByIdMutation,
} from "@/redux/api/secureApi";
const AddCategoryModal = ({
  isOpen,
  closeModal,
  categoryData,
  refetch,
  categoryRefetch,
}: any) => {
  const [isDataSending, setIsdataSending] = useState<boolean>(false);
  const [files, setFiles] = useState<any>();
  const [
    sendData,
    { isSuccess: isSendDataSuccess, isLoading: isDataSendingLoading, isError },
  ] = useCreateCategoryMutation();
  const [
    deleteCategory,
    { isSuccess: isdeleteCategorySuccess, isLoading: isdeleteCategoryLoading },
  ] = useDeleteCategoryByIdMutation();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const onSubmit: SubmitHandler<any> = async (data) => {
    await sendData(data);
    reset();
  };
  const handleDeleteCategory = (item: any) => {
    const data = {
      categoryID: item._id,
    };
    deleteCategory(data);
  };
  useEffect(() => {
    if (isdeleteCategorySuccess) {
      toast.success("Successfully deleted");
      categoryRefetch();
    }
  }, [isdeleteCategorySuccess]);
  useEffect(() => {
    if (isSendDataSuccess) {
      closeModal();
      setFiles(null);
      toast.success("Successfully Created Category");
      refetch();
      categoryRefetch();
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
    if (isError) {
      toast.error("Category must be unique");
    }
  }, [isError]);
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
            Add New Category
          </h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex w-full justify-between mt-6 mb-3">
              <div className="w-3/4">
                Name:
                <div className="border rounded-xl border-gray-600  flex items-center justify-center">
                  <input
                    id="name"
                    type="text"
                    placeholder="Please Enter Category"
                    className="w-full h-full p-3 outline-none placeholder-gray-500 bg-white text-black rounded-xl"
                    {...register("name")}
                  />
                </div>
                {/* <p className="text-red-600">{errors.name?.message}</p> */}
              </div>
              <div className="w-1/5  flex items-center justify-center">
                <button
                  className="mt-4 px-8 py-2 text-black transition-colors duration-200 transform bg-transparant border-white border rounded-2xl shadow-md shadow-buttonShadow  focus:outline-none focus:bg-gray-600 focus:text-white"
                  onClick={handleSubmit(onSubmit)}
                  type="button"
                >
                  Save
                </button>
              </div>
            </div>

            {categoryData.length > 0 && (
              <CustomScrollbar scrollHeight={350}>
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="">
                    <tr>
                      <th className="px-6 text-left text-md font-semibold text-black  tracking-wider">
                        SN
                      </th>
                      <th className="px-6 text-left text-md font-semibold text-black  tracking-wider">
                        Name
                      </th>
                      <th className="px-6 text-center text-md font-semibold text-black  tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 mt-2">
                    {categoryData.map((item: any, index: number) => {
                      return (
                        <tr key={index}>
                          <td className="px-6 py-2 whitespace-nowrap">
                            {index + 1}
                          </td>
                          <td className="px-6 py-2 whitespace-nowrap">
                            {item?.name}
                          </td>
                          <div className=" flex items-center justify-center">
                            <td className=" whitespace-nowrap">
                              <button
                                className="px-4 py-2 text-white transition-colors duration-200 transform bg-red-500 border-white border rounded-2xl shadow-md shadow-buttonShadow  focus:outline-none focus:bg-gray-600 focus:text-white"
                                onClick={() => handleDeleteCategory(item)}
                                type="button"
                              >
                                Delete
                              </button>
                            </td>
                          </div>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </CustomScrollbar>
            )}
          </form>
        </section>
      </>
    </div>
  );
};

export default AddCategoryModal;
