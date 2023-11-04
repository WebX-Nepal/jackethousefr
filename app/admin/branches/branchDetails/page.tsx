"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useGetSalesReportsProductsDataQuery } from "../../../../redux/api/secureApi";
import LoadingScreen from "@/components/LoadingScreen";
import DataTable, { createTheme } from "react-data-table-component";
import Datepicker from "react-tailwindcss-datepicker";
import { tableCustomStyles } from "../../../../components/Constant";
import { toast } from "react-toastify";
import BranchSettingsModal from "./settingsModal";
import { IoSettingsSharp } from "react-icons/io5";
import { IoMdCloudDownload } from "react-icons/io";
const BranchDetails = () => {
  const reportUrl = `${process.env.NEXT_PUBLIC_NEXTAUTH_BASE_URL}/report/createPDFReport`;
  const [downloading, setDownloading] = useState(false);
  const [productData, setProducts] = useState([]);
  const [isBranchSettingsModalOpen, setisBranchSettingsModalOpen] =
    useState(false);

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
  const openBranchSettingsModal = () => {
    setisBranchSettingsModalOpen(true);
  };
  const closeBranchSettingsModal = () => {
    setisBranchSettingsModalOpen(false);
  };
  return (
    <>
      <div className=" border border-stroke bg-[#e3e1e1] shadow-default dark:border-strokedark dark:bg-boxdark px-4 rounded-lg">
        <div className="py-6 px-4 md:px-6 xl:px-7.5 flex justify-between ">
          <h4 className="text-xl font-semibold text-black ">Reports</h4>
          <div className="flex w-1/2 justify-between ">
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
                  className="bg-black text-white pt-1 pb-1 pl-3 pr-3 rounded-xl flex items-center justify-center"
                  onClick={handleDownloadReport}
                >
                  <IoMdCloudDownload className="text-lg mr-2" />
                  Download report
                </button>
              </>
            )}
            <>
              <button
                className="bg-black text-white pt-1 pb-1 pl-3 pr-3 rounded-xl flex items-center justify-center"
                onClick={openBranchSettingsModal}
              >
                <IoSettingsSharp className="text-lg mr-2" />
                Settings
              </button>
            </>
          </div>
        </div>
        <div
          className={`${
            isBranchSettingsModalOpen ? "blur-xl" : "px-4 rounded-lg "
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
        <BranchSettingsModal
          isOpen={isBranchSettingsModalOpen}
          closeModal={closeBranchSettingsModal}
        />
      </div>
    </>
  );
};

export default BranchDetails;
