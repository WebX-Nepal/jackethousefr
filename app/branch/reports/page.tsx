"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  useGetSalesReportsProductsDataQuery,
  useGetBranchSalesDetailsQuery,
} from "../../../redux/api/secureApi";
import LoadingScreen from "@/components/LoadingScreen";
import DataTable, { createTheme } from "react-data-table-component";
import Datepicker from "react-tailwindcss-datepicker";
import { tableCustomStyles } from "../../../components/Constant";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { skipToken } from "@reduxjs/toolkit/query";

function Reports() {
  const userData = useSelector((state: any) => state.auth);
  const reportUrl = `${process.env.NEXT_PUBLIC_NEXTAUTH_BASE_URL}/report/createPDFReport`;
  const [downloading, setDownloading] = useState(false);
  const [productData, setProducts] = useState([]);
  const [salesDetailsData, setSalesDetailsData] = useState<any>();
  const { data: reportData, isSuccess } = useGetSalesReportsProductsDataQuery(
    {}
  );
  const { data: salesDetails, isSuccess: isSalesDetailsSuccess } =
    useGetBranchSalesDetailsQuery(userData?.userDetail?.branch ?? skipToken);
  const [value, setValue] = useState<any>({
    startDate: new Date(),
    endDate: new Date().setMonth(11),
  });
  const handleValueChange = (newValue: any) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (reportData && isSuccess) {
      setProducts(reportData.data);
    } else {
    }
  }, [reportData]);
  useEffect(() => {
    if (salesDetails && isSalesDetailsSuccess) {
      setSalesDetailsData(salesDetails.data[0]);
    } else {
    }
  }, [salesDetails]);
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
      selector: (row: any) => row.productName,
    },
    {
      name: "Category",
      selector: (row: any) => row.productCategory,
    },
    {
      name: "Payment Method",
      selector: (row: any) => row.paymentMethod,
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
  ];
  const handleDownloadReport = async () => {
    toast.success("Please Wait");
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
      } catch (err) {}
      setDownloading(false);
    }
  };
  createTheme("solarized", {
    background: {
      default: "#e3e1e1",
    },
    divider: {
      default: "#FFFFFF",
    },
  });
  return (
    <div className=" border border-stroke bg-[#e3e1e1] shadow-default dark:border-strokedark dark:bg-boxdark px-4 rounded-lg">
      <h4 className="text-xl font-semibold text-black pt-4 pl-4">Reports</h4>
      <div className="py-6 px-4 md:px-6 xl:px-7.5 flex justify-between ">
        <h4 className="text-xl font-semibold text-black ">
          Total Profits: {salesDetailsData?.totalProfit}
        </h4>
        <h4 className="text-xl font-semibold text-black ">
          Total Items Sold: {salesDetailsData?.totalItemsSold}
        </h4>

        <div className="flex w-1/3 justify-between">
          <div className="hover:cursor-pointer w-60">
            <Datepicker
              primaryColor={"red"}
              value={value}
              onChange={handleValueChange}
            />
          </div>
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
      </div>

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
  );
}

export default Reports;
