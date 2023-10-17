"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useGetSalesReportsProductsDataQuery } from "../../../redux/api/secureApi";
import LoadingScreen from "@/components/LoadingScreen";
import DataTable from "react-data-table-component";

function Reports() {
  const reportUrl = `${process.env.NEXT_PUBLIC_NEXTAUTH_BASE_URL}/report/createPDFReport`;
  const [downloading, setDownloading] = useState(false);
  const [productData, setProducts] = useState([]);
  const { data: reportData, isSuccess } = useGetSalesReportsProductsDataQuery(
    {}
  );
  useEffect(() => {
    if (reportData && isSuccess) {
      setProducts(reportData.data);
    } else {
    }
  }, [reportData]);
  const columns = [
    {
      name: "SN",
      cell: (row: any, index: number) => index + 1,
      width: "90px",
    },
    {
      name: "Image",
      selector: (row: any) => (
        <img
          src={row.image}
          style={{
            width: "60px",
            height: "40px",
            objectFit: "cover",
          }}
        />
      ),
    },
    {
      name: "Name",
      selector: (row: any) => row.productName,
    },
    {
      name: "Category",
      selector: (row: any) => row.productCategory,
    },
    {
      name: "Cost Price",
      selector: (row: any) => row.cost,
    },
    {
      name: "Selling Price",
      selector: (row: any) => row.sellingPrice,
    },
    {
      name: "Items Sold",
      selector: (row: any) => row.totalItemsSold,
    },
    {
      name: "Profit",
      selector: (row: any) => <p>Rs {row.profit}</p>,
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
  const handleDownloadReport = async () => {
    setDownloading(true);
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const axiosConfig = {
          responseType: "arraybuffer" as "arraybuffer",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        axios.get(reportUrl, axiosConfig).then((res: any) => {
          const url = window.URL.createObjectURL(new Blob([res.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "report.pdf");
          document.body.appendChild(link);
          link.click();
        });
      } catch (err) {
        console.log("err ", err);
      }
      setDownloading(false);
    }
  };
  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="py-6 px-4 md:px-6 xl:px-7.5 flex justify-between">
        <h4 className="text-xl font-semibold text-black ">Recent Sales</h4>
        {downloading ? (
          <>
            <LoadingScreen message="Downloading" />
          </>
        ) : (
          <>
            <button
              className="bg-black text-white pt-1 pb-1 pl-3 pr-3 rounded-xl "
              onClick={handleDownloadReport}
            >
              Download report
            </button>
          </>
        )}
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

export default Reports;
