"use client";
import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import validationSchema from "./validation";
import { useRecordLocalProductMutation } from "../../../redux/api/secureApi";
import LoadingScreen from "../../../components/LoadingScreen";
import { toast } from "react-toastify";
const BarcodeInventoryModal = ({ isOpen, closeModal, refetch }: any) => {
  const [isDataSending, setIsdataSending] = useState<boolean>(false);
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
  ] = useRecordLocalProductMutation();
  const onSubmit: SubmitHandler<any> = async (data) => {
    await sendData(data);
    reset();
  };

  useEffect(() => {
    if (isSendDataSuccess) {
      closeModal();
      toast.success("Successfully Added Product");
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
          <section className="w-1/2 h-1/3 p-6 mx-autorounded-md shadow-2xl bg-modalBackground  mt-20 z-50 rounded-xl">
            <h1 className="text-xl font-bold text-Black capitalize pb-4">
              Add Products Manually
            </h1>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                Product ID:
                <div className="border rounded-xl border-gray-600  flex items-center justify-center mt-2">
                  <input
                    id="currentProducts"
                    type="text"
                    placeholder="Please Enter Barcode ID"
                    className="w-full h-full p-3 outline-none placeholder-gray-500 bg-white text-black rounded-xl"
                    {...register("currentProducts")}
                  />
                </div>
                <p className="text-red-600">
                  {errors.currentProducts?.message}
                </p>
              </div>
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

export default BarcodeInventoryModal;
