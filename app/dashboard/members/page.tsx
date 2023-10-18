"use client";
import React, { useEffect, useState } from "react";
import { useGetAllMembersQuery } from "../../../redux/api/secureApi";
import DataTable from "react-data-table-component";
import ViewModal from "./Modal";
import RewardsModal from "./RewardsModal";
function Members() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRewardsModalOpen, setIsRewardsModalOpen] = useState(false);
  const [productData, setProducts] = useState([]);
  const [memberId, setMemberId] = useState();
  const { data: memberData, isSuccess } = useGetAllMembersQuery({});
  const openModal = () => {
    setIsModalOpen(true);
    setIsRewardsModalOpen(false);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const openRewardsModal = () => {
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
  const handleViewMember = (row: any) => {
    console.log("row is ", row);
    openModal();
    setMemberId(row._id);
  };
  const ActionButton = ({ text, onClick, color }: any) => (
    <button
      className={`bg-${color}-500 px-4 py-2 rounded-lg text-white ${
        color === "cyan" ? "mr-2" : "ml-2"
      }`}
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
          <div className="p-1 bg-green-500 rounded-full">{row.points}</div>
        ) : (
          <div className="p-1">{row.points}</div>
        );
      },
      width: "100px",
    },
    {
      name: "Actions",
      cell: (row: any) => (
        <>
          <ActionButton
            text="View"
            onClick={() => handleViewMember(row)}
            color="cyan"
          />
          {row.points === 10 && (
            <ActionButton
              text="Give Rewards"
              onClick={() => openRewardsModal()}
              color="yellow"
            />
          )}
        </>
      ),
    },
  ];
  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="py-6 px-4 md:px-6 xl:px-7.5 flex justify-between">
        <h4 className="text-xl font-semibold text-black ">Members</h4>
      </div>
      <div
        className={`${isModalOpen ? "blur-xl" : ""} ${
          isRewardsModalOpen ? "blur-xl" : ""
        }`}
      >
        <DataTable
          columns={columns}
          data={productData}
          pagination
          fixedHeader
          highlightOnHover
          responsive
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
      />
    </div>
  );
}

export default Members;
