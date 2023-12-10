"use client";
import React, { useEffect, useState } from "react";
import { useGetAllMembersQuery } from "../../../redux/api/secureApi";
import DataTable, { createTheme } from "react-data-table-component";
import ViewModal from "./Modal";
import RewardsModal from "./RewardsModal";
import Image from "next/image";
import { tableCustomStyles } from "../../../components/Constant";
function Members() {
  const [ID, setID] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRewardsModalOpen, setIsRewardsModalOpen] = useState(false);
  const [productData, setProducts] = useState([]);
  const [memberId, setMemberId] = useState();
  const { data: memberData, isSuccess, refetch } = useGetAllMembersQuery({});
  const openModal = () => {
    setIsModalOpen(true);
    setIsRewardsModalOpen(false);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const openRewardsModal = (row: any) => {
    setID(row._id);
    setIsModalOpen(false);
    setIsRewardsModalOpen(true);
  };
  const closeRewardsModal = () => {
    setIsRewardsModalOpen(false);
  };
  useEffect(() => {
    if (memberData && isSuccess) {
      setProducts(memberData.member);
    } else {
    }
  }, [memberData]);
  useEffect(() => {
    refetch();
  }, []);
  const handleViewMember = (row: any) => {
    openModal();
    setMemberId(row._id);
  };
  const ActionButton = ({ text, onClick, color }: any) => (
    <button
      className={`bg-${color}-500 px-4 py-2 rounded-lg text-white`}
      onClick={onClick}
    >
      {text}
    </button>
  );
  const columns: any = [
    {
      name: "SN",
      cell: (row: any, index: number) => index + 1,
      width: "90px",
    },

    {
      name: "Name",
      selector: (row: any) => row.name,
    },
    {
      name: "Phone",
      selector: (row: any) => row.phone,
    },
    {
      name: "Created At",
      selector: (row: any) => new Date(row.createdAt).toLocaleDateString(),
    },
    {
      name: "Points",
      selector: (row: any) => {
        return row.points === 10 ? (
          <div className="flex items-center justify-center w-full">
            <Image src={"/rewardpoint.png"} alt="logo" width={30} height={30} />
          </div>
        ) : (
          <div className="pl-2.5">{row.points}</div>
        );
      },
      width: "100px",
    },
    {
      name: "Actions",
      cell: (row: any) => (
        <div className="flex justify-between">
          <ActionButton
            text="View"
            onClick={() => handleViewMember(row)}
            color="cyan"
          />
          <div className="ml-2">
            {row.points === 10 && (
              <ActionButton
                text="Give Rewards"
                onClick={() => openRewardsModal(row)}
                color="yellow"
              />
            )}
          </div>
        </div>
      ),
      width: "220px",
    },
  ];
  createTheme("solarized", {
    background: {
      default: "#e3e1e1",
    },
    divider: {
      default: "#FFFFFF",
    },
  });
  return (
    <div className="rounded-sm border border-stroke bg-[#e3e1e1] shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="py-6 px-4 md:px-6 xl:px-7.5 flex justify-between">
        <h4 className="text-xl font-semibold text-black ">Members</h4>
      </div>
      <div
        className={`${isModalOpen ? "blur-xl" : "px-4 rounded-lg "} ${
          isRewardsModalOpen ? "blur-xl" : ""
        }`}
      >
        <DataTable
          customStyles={tableCustomStyles}
          columns={columns}
          data={productData}
          pagination
          fixedHeader
          highlightOnHover
          responsive
          theme="solarized"
        />
      </div>
      <ViewModal
        isOpen={isModalOpen}
        closeModal={closeModal}
        memberId={memberId}
      />
      <RewardsModal
        isOpen={isRewardsModalOpen}
        closeModal={closeRewardsModal}
        ID={ID}
      />
    </div>
  );
}

export default Members;
