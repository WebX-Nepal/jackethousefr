"use client";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import {
  useGetBranchDetailsForAdminQuery,
  useUpdateBranchDetailsMutation,
} from "../../../../redux/api/secureApi";
import { skipToken } from "@reduxjs/toolkit/query";
const BranchSettingsModal = ({ isOpen, closeModal, slug }: any) => {
  const { data: branchAdminData, isSuccess: isbranchAdminDataSuccess } =
    useGetBranchDetailsForAdminQuery(slug ?? skipToken);
  const [
    sendData,
    { isSuccess: isDataUpdateSuccess, isLoading: isDataUpdateLoading },
  ] = useUpdateBranchDetailsMutation({});
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
    setValue,
  } = useForm({
    defaultValues: {
      branchName: "",
      address: "",
      name: "",
      email: "",
      phone: "",
      password: "",
    },
    // resolver: yupResolver(validationSchema),
  });
  useEffect(() => {
    if (branchAdminData && isbranchAdminDataSuccess) {
      setValue("branchName", branchAdminData?.data?.branchName);
      setValue("address", branchAdminData?.data?.address);
      setValue("name", branchAdminData?.data?.name);
      setValue("email", branchAdminData?.data?.email);
      setValue("phone", branchAdminData?.data?.phone);
      setValue("password", branchAdminData?.data?.password);
    }
  }, [branchAdminData]);
  const onSubmit: SubmitHandler<any> = async (data) => {
    const ID: string = slug;
    sendData({ ID, data });
  };
  useEffect(() => {
    if (isDataUpdateSuccess) {
      toast.success("Successfully Updated");
      closeModal();
    }
  }, [isDataUpdateSuccess]);
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
          <form>
            <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2 pr-8">
              <div>
                Branch Name:
                <div className="border rounded-xl border-gray-600  flex items-center justify-center">
                  <Controller
                    name="branchName"
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
                {/* <p className="text-red-600">{errors.name?.message}</p> */}
              </div>
              <div>
                Branch Location:
                <div className="border border-gray-600 rounded-xl flex items-center justify-center">
                  <Controller
                    name="address"
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
                {/* <p className="text-red-600">{errors.category?.message}</p> */}
              </div>
              <div>
                Branch Manager Name:
                <div className="border border-gray-600 rounded-xl flex items-center justify-center">
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
                {/* <p className="text-red-600">{errors.costPrice?.message}</p> */}
              </div>
              <div>
                Branch Phone:
                <div className="border border-gray-600 rounded-xl flex items-center justify-center">
                  <Controller
                    name="phone"
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
                {/* <p className="text-red-600">{errors.totalItems?.message}</p> */}
              </div>
              <div>
                Branch Email:
                <div className="border border-gray-600 rounded-xl flex items-center justify-center">
                  <Controller
                    name="email"
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
                {/* <p className="text-red-600">{errors.totalItems?.message}</p> */}
              </div>

              <div>
                Branch Password
                <div className="border border-gray-600 rounded-xl flex items-center justify-center">
                  <Controller
                    name="password"
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
              </div>
            </div>
            <div className="flex justify-end mt-6">
              <button
                className="px-6 py-2 leading-5 text-black transition-colors duration-200 transform bg-transparant border-white border rounded-2xl shadow-md shadow-buttonShadow  focus:outline-none focus:bg-gray-600 focus:text-white"
                type="button"
                onClick={handleSubmit(onSubmit)}
              >
                Save
              </button>
            </div>
          </form>
        </section>
      </>
    </div>
  );
};

export default BranchSettingsModal;
