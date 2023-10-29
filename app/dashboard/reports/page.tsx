"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useGetSalesReportsProductsDataQuery } from "../../../redux/api/secureApi";
import LoadingScreen from "@/components/LoadingScreen";
import DataTable from "react-data-table-component";
import Datepicker from "react-tailwindcss-datepicker";

function Reports() {
  const reportUrl = `${process.env.NEXT_PUBLIC_NEXTAUTH_BASE_URL}/report/createPDFReport`;
  const [downloading, setDownloading] = useState(false);
  const [productData, setProducts] = useState([]);
  const { data: reportData, isSuccess } = useGetSalesReportsProductsDataQuery(
    {}
  );
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
      name: "Items Sold",
      selector: (row: any) => row.totalItemsSold,
    },
    {
      name: "Profit",
      selector: (row: any) => <p>Rs {row.profit}</p>,
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
      } catch (err) {}
      setDownloading(false);
    }
  };
  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="py-6 px-4 md:px-6 xl:px-7.5 flex justify-between">
        <h4 className="text-xl font-semibold text-black ">Reports</h4>
        <div className="flex w-1/3 justify-between">
          <div className="hover:cursor-pointer">
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
