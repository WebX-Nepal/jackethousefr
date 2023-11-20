"use client";
import React, { useEffect, useState } from "react";
import { useGetDeliveredProductsQuery } from "../../../redux/api/secureApi";

import DataTable, { createTheme } from "react-data-table-component";
import { tableCustomStyles } from "../../../components/Constant";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { AiTwotoneDelete } from "react-icons/ai";
function Inventory() {
  const router = useRouter();
  const [historyData, setHistoryData] = useState([]);
  const { data, isSuccess } = useGetDeliveredProductsQuery({});
  useEffect(() => {
    if (data && isSuccess) {
      setHistoryData(data?.products);
    }
  }, [data]);
  const ActionButton = ({ text, onClick, color, row }: any) => (
    <button
      className={`bg-${color}-500 px-4 py-2 rounded-lg text-white`}
      onClick={() => {
        onClick(row);
      }}
    >
      {text}
    </button>
  );
  const columns = [
    {
      name: "SN",
      cell: (row: any, index: number) => index + 1,
      width: "90px",
    },
    {
      name: "Image",
      selector: (row: any) => {
        return row.image ? (
          <img
            src={row.image}
            style={{
              width: "60px",
              height: "40px",
              objectFit: "cover",
            }}
          />
        ) : (
          <img
            src="/logo.svg"
            style={{
              width: "60px",
              height: "40px",
              objectFit: "cover",
            }}
          />
        );
      },
    },
    {
      name: "Name",
      selector: (row: any) => row.name,
    },
    {
      name: "Category",
      selector: (row: any) => row.category?.name,
    },
    {
      name: "Selling Price",
      selector: (row: any) => row.sellingPrice,
    },
    {
      name: "Cost Price",
      selector: (row: any) => row.costPrice,
    },
    {
      name: "Delivered To",
      selector: (row: any) => row.deliveredTo,
    },

    // {
    //   name: "Actions",
    //   cell: (row: any) => (
    //     <div className="w-full flex justify-between ">
    //       <ActionButton text="Delete" color="red" />
    //     </div>
    //   ),
    //   width: "180px",
    // },
  ];
  createTheme("solarized", {
    background: {
      default: "#e3e1e1",
    },
    divider: {
      default: "#FFFFFF",
    },
  });
  const handleRowClicked = (row: any) => {
    let slug = row._id;
    router.push(`/admin/inventory/${slug}`);
  };

  return (
    <>
      <div className="rounded-sm border border-stroke bg-[#e3e1e1] shadow-default dark:border-strokedark dark:bg-boxdark px-2">
        <div className="py-6 px-4 md:px-6 xl:px-7.5 flex justify-between">
          <h4 className="text-xl font-semibold text-black ">
            Delivered Products
          </h4>
          <div>
            <button className="bg-red-600 text-white pt-1 pb-1 pl-3 pr-3 rounded-xl ml-1 flex items-center">
              <AiTwotoneDelete className="text-xl mr-2" />
              Delete History
            </button>
          </div>
        </div>
        <div className="px-6">
          <DataTable
            customStyles={tableCustomStyles}
            columns={columns}
            data={historyData}
            pagination
            fixedHeader
            highlightOnHover
            onRowClicked={handleRowClicked}
            responsive
            theme="solarized"
          />
        </div>
      </div>
    </>
  );
}

export default Inventory;
