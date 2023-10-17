"use client";
import React, { useEffect, useState } from "react";
import { useGetSalesDataQuery } from "../../../redux/api/secureApi";
import DataTable from "react-data-table-component";

function Sales() {
  const [productData, setProducts] = useState([]);
  const { data: salesData, isSuccess } = useGetSalesDataQuery({});
  useEffect(() => {
    if (salesData && isSuccess) {
      setProducts(salesData.data);
    } else {
    }
  }, [salesData]);
  const columns = [
    {
      name: "SN",
      cell: (row: any, index: number) => index + 1,
      width: "90px",
    },
    {
      name: "Product",
      selector: (row: any) => {
        return row.products[0]?.product.category || "-";
      },
    },
    {
      name: "Category",
      selector: (row: any) => {
        return row.products[0]?.product.category || "-";
      },
    },
    {
      name: "Payment Method",
      selector: (row: any) => row.paymentMethod,
    },
    {
      name: "Total Amount",
      selector: (row: any) => row.totalAmount,
    },
    {
      name: "Customer Name",
      selector: (row: any) => row.membersId.name,
    },
    {
      name: "Date",
      selector: (row: any) => new Date(row.soldAt).toLocaleDateString(),
      width: "190px",
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
      <div className="py-6 px-4 md:px-6 xl:px-7.5">
        <h4 className="text-xl font-semibold text-black ">Recent Sales</h4>
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

export default Sales;
