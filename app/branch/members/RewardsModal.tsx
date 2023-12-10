"use client";
import React, { useEffect } from "react";
import { useResetMemberPointsMutation } from "../../../redux/api/secureApi";
import { toast } from "react-toastify";
const RewardsModal = ({ isOpen, closeModal, ID }: any) => {
  const [sendData, { isSuccess }] = useResetMemberPointsMutation();

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
  const handleGiveRewards = () => {
    sendData(ID);
    closeModal();
  };
  useEffect(() => {
    if (isSuccess) {
      toast.success("Successfully Updated");
    }
  }, [isSuccess]);
  return (
    <div
      className={`fixed inset-0 top-12 flex items-center justify-center z-50 modal-container ${
        isOpen ? "" : "hidden"
      }`}
    >
      <div className="bg-modalBackground p-6 w-1/3 h-1/3 sm:w-1/2 rounded-3xl shadow-2xl mt-5 sm:h-[75vh]">
        <>
          <div className="w-full h-full ">
            <div className="h-8">
              <h1 className="text-2xl"> Rewards</h1>
            </div>
            <div className="flex items-center justify-center h-1/3 flex-col">
              <p className="text-xl">Are You Sure You Want To Give Rewards?</p>
              <div className="p-8 justify-between">
                <button
                  onClick={closeModal}
                  className="bg-white text-black rounded-xl px-8 py-2 mr-4"
                >
                  Cancel
                </button>
                <button
                  onClick={handleGiveRewards}
                  className="bg-black text-white rounded-xl px-8 py-2 ml-4"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </>
      </div>
    </div>
  );
};

export default RewardsModal;
