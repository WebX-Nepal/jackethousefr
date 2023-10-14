"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useGetSalesReportsProductsDataQuery } from "../../../redux/api/secureApi";
function Reports() {
  const [productData, setProducts] = useState([]);
  const { data, isSuccess } = useGetSalesReportsProductsDataQuery({});

  useEffect(() => {
    if (data && isSuccess) {
      setProducts(data.data);
    } else {
    }
  }, [data]);
  const handleDownloadReport = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      console.log("token is", token);
      try {
        const axiosConfig = {
          responseType: "arraybuffer" as "arraybuffer",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        };

        axios
          .get("http://localhost:5000/api/report/createPDFReport", axiosConfig)
          .then((res: any) => {
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
    }
  };
  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="py-6 px-4 md:px-6 xl:px-7.5 flex justify-between">
        <h4 className="text-xl font-semibold text-black ">Recent Sales</h4>
        <button
          className="bg-black text-white pt-1 pb-1 pl-3 pr-3 rounded-xl"
          onClick={handleDownloadReport}
        >
          Download report
        </button>
      </div>

      <div className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5 mb-3 p-5">
        <div className="col-span-2 hidden items-center sm:flex">
          <p className="font-medium">Product</p>
        </div>
        <div className="col-span-2 hidden items-center sm:flex">
          <p className="font-medium">Category</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Cost Price</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Selling Price</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Profit</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Items Sold</p>
        </div>
      </div>

      {productData?.map((product: any, key: number) => (
        <div
          className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5 p-5"
          key={key}
        >
          <div className="col-span-2 hidden items-center sm:flex">
            <p className="text-sm text-black ">{product.productName}</p>
          </div>
          <div className="col-span-2 hidden items-center sm:flex">
            <p className="text-sm text-black ">{product.productCategory}</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-black ">${product.cost}</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-black ">{product.sellingPrice}</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-meta-3">${product.profit}</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-black ">{product.totalItemsSold}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Reports;
