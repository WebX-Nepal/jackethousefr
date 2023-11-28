"use client";
import { useGetProductByIdQuery } from "@/redux/api/secureApi";
import { skipToken } from "@reduxjs/toolkit/query";
import { useEffect, useState } from "react";
import LoadingScreen from "@/components/LoadingScreen";
function InventoryDetailsPage({ params: { slug } }: any) {
  const [data, setData] = useState<any>();
  const [loading, setLoading] = useState(false);
  const {
    data: productIdData,
    isSuccess: isProductIdSuccess,
    isLoading,
  } = useGetProductByIdQuery(slug ?? skipToken);
  useEffect(() => {
    if (productIdData && isProductIdSuccess) {
      setLoading(false);
      setData(productIdData.products);
    }
  }, [productIdData]);
  useEffect(() => {
    if (isLoading) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [isLoading]);
  console.log("data is", data);
  return (
    <div className="rounded-sm border border-stroke bg-[#e3e1e1] shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="py-6 px-4 md:px-6 xl:px-7.5 flex justify-between">
        <h4 className="text-xl font-semibold text-black ">Product</h4>
        <button className="bg-green-600 text-white pt-1 pb-1 pl-3 pr-3 rounded-xl">
          Download Barcode
        </button>
      </div>
      {loading ? (
        <>
          <LoadingScreen message="Loading Product. Please Wait...." />
        </>
      ) : (
        <>
          <section className="text-gray-700 body-font overflow-hidden ">
            <div className="container py-6 mx-auto">
              <div className="lg:w-4/5 mx-auto flex flex-wrap h-100">
                <img
                  alt="ecommerce"
                  className="lg:w-1/2 w-1/2 h-[300px] rounded border border-gray-200"
                  src={data?.productImage}
                />
                <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                  <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                    Product Name: &nbsp; {data?.name}
                  </h1>
                  <h2 className="text-sm title-font text-gray-500 tracking-widest">
                    Category:&nbsp; {data?.category?.name}
                  </h2>
                  <h2 className="text-sm title-font text-gray-500 tracking-widest">
                    Cost Price:&nbsp; {data?.costPrice}
                  </h2>

                  <h2 className="text-sm title-font text-gray-500 tracking-widest">
                    Delivered:&nbsp; {data?.delivered ? <>true</> : <>false</>}
                  </h2>
                  <h2 className="text-sm title-font text-gray-500 tracking-widest">
                    Discount:&nbsp; {data?.discount}
                  </h2>
                  <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5">
                    <div className="flex">
                      <span className="mr-3">Color</span>
                      <button className="border-2 border-gray-300 rounded-full w-6 h-6 focus:outline-none"></button>
                    </div>
                    <div className="flex ml-6 items-center">
                      <span className="mr-3">Size</span>
                      <div className="relative">
                        <select className="rounded border appearance-none border-gray-400 py-2 focus:outline-none  text-base pl-3 pr-10">
                          <option>SM</option>
                          <option>M</option>
                          <option>L</option>
                          <option>XL</option>
                        </select>
                        <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                          <svg
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            className="w-4 h-4"
                            viewBox="0 0 24 24"
                          >
                            <path d="M6 9l6 6 6-6"></path>
                          </svg>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex">
                    <span className="title-font font-medium text-2xl text-gray-900">
                      Price:{data?.sellingPrice}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
}

export default InventoryDetailsPage;
