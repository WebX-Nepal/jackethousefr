"use client";
import { useRouter } from "next/navigation";
import BranchSettingsModal from "./addBranches";
import { useEffect, useState } from "react";
import { useGetBranchQuery } from "@/redux/api/secureApi";
const Branches = () => {
  const router = useRouter();
  const [data, setBranchData] = useState([]);
  const {
    data: branchData,
    isLoading,
    isSuccess,
    refetch,
  } = useGetBranchQuery({});
  const [isBranchSettingsModalOpen, setisBranchSettingsModalOpen] =
    useState(false);
  const openBranchSettingsModal = () => {
    setisBranchSettingsModalOpen(true);
  };
  const closeBranchSettingsModal = () => {
    setisBranchSettingsModalOpen(false);
  };
  useEffect(() => {
    if (branchData && isSuccess) {
      console.log("data is", branchData?.branch);
      setBranchData(branchData?.branch);
    }
  }, [branchData, isSuccess]);

  return (
    <div className="p-0 sm:p-2">
      <div className="flex py-6 px-10 justify-between">
        <h4 className="text-xl font-semibold text-black">Branches</h4>
        <button
          className="px-6  bg-black text-white py-1 rounded-lg"
          onClick={openBranchSettingsModal}
        >
          Add Branches
        </button>
      </div>
      <div
        className={`${
          isBranchSettingsModalOpen
            ? "blur-xl"
            : "w-full flex items-center justify-center px-1 sm:px-10 flex-col"
        }`}
      >
        {data?.map((item: any, index) => {
          return (
            <div
              className="bg-primary w-full h-16 rounded-xl flex justify-between items-center px-6 mb-6 shadow-md hover:shadow-xl hover:cursor-pointer"
              key={index}
            >
              <p className="w-1/5">{item.branchName}</p>
              <p className="hidden sm:block w-1/3 pl-10">{item.address}</p>
              <button
                className="px-6 py-2 leading-5 text-black transition-colors duration-200 transform bg-transparant border-white border rounded-2xl shadow-md shadow-buttonShadow  focus:outline-none focus:bg-gray-600 focus:text-white"
                type="button"
                onClick={() => {
                  router.push(`branches/${item._id}`);
                }}
              >
                View
              </button>
            </div>
          );
        })}
      </div>
      <BranchSettingsModal
        isOpen={isBranchSettingsModalOpen}
        closeModal={closeBranchSettingsModal}
        refetch={refetch}
      />
    </div>
  );
};

export default Branches;
