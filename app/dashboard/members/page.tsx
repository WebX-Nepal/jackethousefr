"use client";
import React, { useEffect, useState } from "react";
import { useGetAllMembersQuery } from "../../../redux/api/secureApi";
import DataTable from "react-data-table-component";

function Members() {
  const [productData, setProducts] = useState([]);
  const { data: memberData, isSuccess } = useGetAllMembersQuery({});
  useEffect(() => {
    if (memberData && isSuccess) {
      setProducts(memberData.member);
    } else {
    }
  }, [memberData]);
  const columns = [
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
      selector: (row: any) => row.points,
    },
    {
      name: "Actions",
      cell: (row: any) => (
        <button
          className="bg-blue-500 px-4 py-2 rounded-lg text-white"
          onClick={() => {
            alert(row);
          }}
        >
          View
        </button>
      ),
    },
  ];
  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="py-6 px-4 md:px-6 xl:px-7.5 flex justify-between">
        <h4 className="text-xl font-semibold text-black ">Members</h4>
      </div>
      <DataTable
        columns={columns}
        data={productData}
        pagination
        fixedHeader
        highlightOnHover
        responsive
      />
    </div>
  );
}

export default Members;
