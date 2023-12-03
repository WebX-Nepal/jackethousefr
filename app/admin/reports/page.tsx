"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  useGetTotalSalesDataOfAllBranchesQuery,
  useGenerateLatestSalesDataForAdminQuery,
} from "../../../redux/api/secureApi";
import LoadingScreen from "@/components/LoadingScreen";
import DataTable, { createTheme } from "react-data-table-component";
import Datepicker from "react-tailwindcss-datepicker";
import { tableCustomStyles } from "../../../components/Constant";
import { toast } from "react-toastify";
function Reports() {
  const reportUrl = `${process.env.NEXT_PUBLIC_NEXTAUTH_BASE_URL}/report/createReportForSuperAdmin`;
  const [downloading, setDownloading] = useState(false);
  const [productData, setProducts] = useState<any>([]);
  const [totalSalesData, setTotalSalesData] = useState<any>([]);

  const { data: reportData, isSuccess } =
    useGetTotalSalesDataOfAllBranchesQuery({});
  const {
    data: salesData,
    isSuccess: isTotalSalesDataSuccess,
    refetch,
  } = useGenerateLatestSalesDataForAdminQuery({});
  const [value, setValue] = useState<any>({
    startDate: new Date(),
    endDate: new Date().setMonth(11),
  });

  const handleValueChange = (newValue: any) => {
    setValue(newValue);
  };
  useEffect(() => {
    if (salesData && isTotalSalesDataSuccess) {
      setTotalSalesData(salesData.data);
    } else {
    }
  }, [salesData]);
  useEffect(() => {
    refetch();
  }, []);
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
  console.log("product data is", productData);
  return (
    <div className=" border border-stroke bg-[#e3e1e1] shadow-default dark:border-strokedark dark:bg-boxdark px-4 rounded-lg">
      <div className="py-6 px-4 md:px-6 xl:px-7.5 flex justify-between ">
        <h4 className="text-xl font-semibold text-black ">Reports</h4>
        <div className="flex w-1/3 justify-between">
          <div className="hover:cursor-pointer w-60">
            <Datepicker value={value} onChange={handleValueChange} />
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
      <div className="pl-4">
        {productData.map((item: any) => {
          return (
            <div className="ml-2 mb-2 rounded-lg flex w-1/2 justify-between">
              <div className="capitalize">
                total items sold: {item?.totalItemsSold}
              </div>
              <div className="capitalize">
                total profits: {item?.totalProfit}
              </div>
            </div>
          );
        })}
      </div>
      <DataTable
        customStyles={tableCustomStyles}
        columns={columns}
        data={totalSalesData}
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
