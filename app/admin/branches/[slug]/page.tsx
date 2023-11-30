"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  useGetBranchSalesReportsQuery,
  useGetLocalProductsByBranchAdminQuery,
  useGetBranchSalesDetailsQuery,
} from "../../../../redux/api/secureApi";
import LoadingScreen from "@/components/LoadingScreen";
import DataTable, { createTheme } from "react-data-table-component";
import Datepicker from "react-tailwindcss-datepicker";
import { tableCustomStyles } from "../../../../components/Constant";
import { toast } from "react-toastify";
import BranchSettingsModal from "./settingsModal";
import { IoSettingsSharp } from "react-icons/io5";
import { IoMdCloudDownload } from "react-icons/io";
import { skipToken } from "@reduxjs/toolkit/query";
const BranchDetails = ({ params: { slug } }: any) => {
  const reportUrl = `${process.env.NEXT_PUBLIC_NEXTAUTH_BASE_URL}/report/createBranchReportForAdmin/${slug}`;
  const [downloading, setDownloading] = useState(false);
  const [productData, setProducts] = useState([]);
  const [salesDetailsData, setSalesDetailsData] = useState<any>();
  const [inventoryData, setInventoryData] = useState<any>([]);
  const [toggleTable, setToggleTable] = useState<"reports" | "inventory">(
    "reports"
  );
  const { data: salesDetails, isSuccess: isSalesDetailsSuccess } =
    useGetBranchSalesDetailsQuery(slug ?? skipToken);
  const [isBranchSettingsModalOpen, setisBranchSettingsModalOpen] =
    useState(false);
  const { data: reportData, isSuccess } = useGetBranchSalesReportsQuery(
    slug ?? skipToken
  );
  const { data: inventory, isSuccess: isInventoryDataSuccess } =
    useGetLocalProductsByBranchAdminQuery(slug ?? skipToken);
  const [value, setValue] = useState<any>({
    startDate: new Date(),
    endDate: new Date().setMonth(11),
  });
  const handleValueChange = (newValue: any) => {
    setValue(newValue);
  };
  useEffect(() => {
    if (salesDetails && isSalesDetailsSuccess) {
      setSalesDetailsData(salesDetails.data[0]);
    } else {
    }
  }, [salesDetails]);
  useEffect(() => {
    if (reportData && isSuccess) {
      setProducts(reportData.data);
    } else {
    }
  }, [reportData]);
  useEffect(() => {
    if (inventory && isInventoryDataSuccess) {
      setInventoryData(inventory?.products);
    } else {
    }
  }, [inventory]);
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
  const inventoryColumns = [
    {
      name: "SN",
      cell: (row: any, index: number) => index + 1,
      width: "90px",
    },
    {
      name: "Image",
      selector: (row: any) => {
        return row?.productImage ? (
          <img
            src={row?.productImage}
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
      name: "Actions",
      cell: (row: any) => (
        <div className="w-[150px] flex justify-between ">
          <div>
            <ActionButton
              text="View"
              color="cyan"
              row={row}
              //onClick={() => openViewDetails(row)}
            />
          </div>
          <ActionButton
            text="Delete"
            color="red"
            row={row}
            // onClick={useDeleteProduct}
          />
        </div>
      ),
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
    borderRadius: "0px",
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
  const handleToggle = () => {
    if (toggleTable == "inventory") {
      setToggleTable("reports");
    } else {
      setToggleTable("inventory");
    }
  };
  return (
    <>
      <div className=" border border-stroke bg-[#e3e1e1] shadow-default dark:border-strokedark dark:bg-boxdark px-4 rounded-lg">
        <div className=" m-2 mb-5">
          <div className="pt-4 pb-0 md:px-6 xl:px-7.5 flex justify-between">
            <div className="flex hover:cursor-pointer shadow-sm pl-0 -ml-[8px]">
              <div className="trapezoid">
                <button
                  className={`text-black text-center pt-1.5 hover:text-lg pl-4`}
                  onClick={handleToggle}
                >
                  Reports
                </button>
              </div>
              <div className="trapezoid">
                <button
                  className="text-black text-center pt-1.5 hover:text-lg pl-4"
                  onClick={handleToggle}
                >
                  Inventory
                </button>
              </div>
            </div>
            <div className="flex w-1/2 justify-between -mt-2">
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
                    className="bg-black text-white px-4 mb-2  rounded-xl flex items-center justify-center"
                    onClick={handleDownloadReport}
                  >
                    <IoMdCloudDownload className="text-lg mr-2" />
                    Download report
                  </button>
                </>
              )}
              <>
                <button
                  className="bg-black text-white px-4 mb-2 rounded-xl flex items-center justify-center"
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
              isBranchSettingsModalOpen ? "blur-xl" : "px-4 rounded-lg hidden"
            }${toggleTable == "inventory" ? "" : "hidden"}`}
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
          <div
            className={`${
              isBranchSettingsModalOpen ? "blur-xl" : "px-4 rounded-lg hidden"
            }${toggleTable == "reports" ? "" : "hidden"}`}
          >
            <DataTable
              customStyles={tableCustomStyles}
              columns={inventoryColumns}
              data={inventoryData}
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
            slug={slug}
          />
        </div>
      </div>
    </>
  );
};

export default BranchDetails;
