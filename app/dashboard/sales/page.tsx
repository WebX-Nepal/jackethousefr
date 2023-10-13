"use client";
import React, { useEffect, useState } from "react";
import { useGetSalesDataQuery } from "../../../redux/api/secureApi";
function Sales() {
  const [productData, setProducts] = useState([]);
  const { data, isSuccess } = useGetSalesDataQuery({});
  useEffect(() => {
    if (data && isSuccess) {
      setProducts(data.data);
    } else {
    }
  }, [data]);
  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="py-6 px-4 md:px-6 xl:px-7.5">
        <h4 className="text-xl font-semibold text-black ">Recent Sales</h4>
      </div>
      <div className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5 mb-3 p-5">
        <div className="col-span-2 hidden items-center sm:flex">
          <p className="font-medium">Product</p>
        </div>
        <div className="col-span-2 hidden items-center sm:flex">
          <p className="font-medium">Payment Method</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Total Amount</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Date</p>
        </div>
      </div>
      {productData.map((item: any) => (
        <div
          className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5 p-5"
          key={item.products[0]?.product._id}
        >
          <div className="col-span-2 hidden items-center sm:flex">
            <p className="text-sm text-black ">
              {item.products[0]?.product.name}
            </p>
          </div>
          <div className="col-span-2 hidden items-center sm:flex">
            <p className="text-sm text-black ">{item.paymentMethod}</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-black ">$ {item.totalAmount}</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-black ">
              {new Date(item.soldAt).toLocaleString()}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Sales;
