"use client";
import React, { useEffect, useState } from "react";
import { useGetSoldLocalProductsQuery } from "../../../redux/api/secureApi";
import DataTable, { createTheme } from "react-data-table-component";
import { tableCustomStyles } from "../../../components/Constant";

function Inventory() {
  const [historyData, setHistoryData] = useState([]);
  const { data, isSuccess, refetch } = useGetSoldLocalProductsQuery({});
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
  useEffect(() => {
    refetch();
  }, []);
  const columns = [
    {
      name: "SN",
      cell: (row: any, index: number) => index + 1,
      width: "90px",
    },
    {
      name: "Image",
      selector: (row: any) => {
        return row.productImage ? (
          <img
            src={row.productImage}
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
    <>
      <div className="rounded-sm border border-stroke bg-[#e3e1e1] shadow-default dark:border-strokedark dark:bg-boxdark px-2">
        <div className="py-6 px-4 md:px-6 xl:px-7.5 flex justify-between">
          <h4 className="text-xl font-semibold text-black ">Sold Products</h4>
        </div>
        <div className="px-6">
          <DataTable
            customStyles={tableCustomStyles}
            columns={columns}
            data={historyData}
            pagination
            fixedHeader
            highlightOnHover
            responsive
            theme="solarized"
          />
        </div>
      </div>
    </>
  );
}

export default Inventory;
