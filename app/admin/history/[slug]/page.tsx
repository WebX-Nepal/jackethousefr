"use client";
import {
  useGetProductByIdQuery,
  useGetCategoryQuery,
  useUpdateProductByIdMutation,
} from "@/redux/api/secureApi";
import { skipToken } from "@reduxjs/toolkit/query";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { MdDone } from "react-icons/md";

import LoadingScreen from "@/components/LoadingScreen";
import { FilePond } from "react-filepond";
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import { toast } from "react-toastify";
function InventoryDetailsPage({ params: { slug } }: any) {
  const [data, setData] = useState<any>();
  const [files, setFiles] = useState<any>([]);
  const [categoryData, setCategoryData] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [
    sendData,
    {
      isLoading: isSendingDataLoading,
      isSuccess: isSendingDataSuccess,
      isError,
    },
  ] = useUpdateProductByIdMutation({});
  const {
    data: productIdData,
    isSuccess: isProductIdSuccess,
    isLoading,
    refetch,
  } = useGetProductByIdQuery(slug ?? skipToken);
  const {
    data: category,
    isSuccess: categoryDataSuccess,
    refetch: categoryRefetch,
  } = useGetCategoryQuery({});
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
    setValue,
  } = useForm({
    defaultValues: {
      name: "",
      costPrice: 0,
      sellingPrice: 0,
      color: "",
      size: "",
      discount: 0,
    },
    // resolver: yupResolver(validationSchema),
  });
  useEffect(() => {
    if (category && categoryDataSuccess) {
      setCategoryData(category.category);
    } else {
    }
  }, [category]);
  useEffect(() => {
    if (isSendingDataSuccess) {
      setLoading(false);
      toast.success("Successfully updated product");
      refetch();
    } else if (isError) {
      setLoading(false);
      toast.error("Please Retry Something went wrong");
      refetch();
    }
  }, [isSendingDataSuccess, isError]);
  useEffect(() => {
    if (productIdData && isProductIdSuccess) {
      setLoading(false);
      setData(productIdData.products);
      setValue("name", productIdData.products?.name);
      setValue("costPrice", productIdData.products?.costPrice);
      setValue("sellingPrice", productIdData.products?.sellingPrice);
      setValue("color", productIdData.products?.color);
      setValue("size", productIdData.products?.size);
      setValue("discount", productIdData.products?.discount);
    }
  }, [productIdData]);
  const onSubmit: SubmitHandler<any> = async (data: any) => {
    setLoading(true);
    const formData = new FormData();
    for (const key in data) {
      const value =
        data[key] !== undefined && data[key] !== null ? data[key] : "";
      formData.append(key, value);
    }
    if (files && files.length > 0) {
      formData.append("productImage", files[0]?.file);
    }
    await sendData([formData, slug]);
  };

  return (
    <div className="p-4">
      <div className="py-6 px-4 md:px-6 xl:px-7.5 flex justify-between">
        <p className="font-semibold text-xl">
          Product Details Of Delivered Product
        </p>
      </div>
      {loading ? (
        <>
          <LoadingScreen message="Updating. Please Wait" />
        </>
      ) : (
        <>
          <div className="mt-1 block w-full items-center justify-center xl:flex">
            <div className="bg-transparent">
              {data?.productImage ? (
                <img
                  src={data?.productImage}
                  height={"250px"}
                  width={"250px"}
                />
              ) : (
                <img src={"/logo.svg"} height={"250px"} width={"250px"} />
              )}
              {/* <div className="flex mt-2 w-[250px]">
                <div className="w-full">
                  <FilePond
                    files={files}
                    allowMultiple={false}
                    allowRevert
                    allowImagePreview={false}
                    allowDrop
                    onupdatefiles={setFiles}
                    styleButtonRemoveItemPosition="left"
                    labelIdle={`Update Image`}
                  />
                </div>
                {files.length > 0 && (
                  <button className="pb-4" onClick={onSubmit}>
                    <MdDone className="text-3xl font-semibold " />
                  </button>
                )}
              </div> */}
            </div>
            <div className="xl:w-2/3 w-full">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="2xl:grid 2xl:grid-cols-1 pl-4 pr-4 pt-4 mb-0">
                  <div className="flex  w-full  justify-between p-2">
                    <p className="text-xl flex items-center justify-center">
                      Product Name
                    </p>
                    <div className="flex items-center rounded-xl border border-gray-600 p-2 justify-between bg-white w-2/3">
                      <Controller
                        name="name"
                        control={control}
                        render={({ field }) => (
                          <input
                            className="outline-none placeholder-gray-500 bg-white text-black flex  flex-grow "
                            type="text"
                            placeholder="Enter Product Name"
                            {...field}
                            disabled
                          />
                        )}
                      />
                    </div>
                  </div>
                  <div className="flex  w-full justify-between p-2">
                    <p className="text-xl flex items-center justify-center">
                      Cost Price
                    </p>
                    <div className="flex items-center rounded-xl border border-gray-600 p-2 justify-between bg-white w-2/3">
                      <Controller
                        name="costPrice"
                        control={control}
                        render={({ field }) => (
                          <input
                            className="outline-none placeholder-gray-500 bg-white text-black flex  flex-grow "
                            type="text"
                            placeholder="Enter Cost Price"
                            {...field}
                            disabled
                          />
                        )}
                      />
                    </div>
                  </div>

                  <div className="flex  w-full justify-between p-2">
                    <p className="text-xl flex items-center justify-center">
                      Selling Price
                    </p>
                    <div className="flex items-center rounded-xl border border-gray-600 p-2 justify-between bg-white w-2/3">
                      <Controller
                        name="sellingPrice"
                        control={control}
                        render={({ field }) => (
                          <input
                            className="outline-none placeholder-gray-500 bg-white text-black flex flex-grow"
                            placeholder="Enter Selling Price"
                            {...field}
                            disabled
                          />
                        )}
                      />
                    </div>
                  </div>
                  <div className="flex  w-full justify-between p-2">
                    <p className="text-xl flex items-center justify-center">
                      Color
                    </p>
                    <div className="flex items-center rounded-xl border border-gray-600 p-2 justify-between bg-white w-2/3">
                      <Controller
                        name="color"
                        control={control}
                        render={({ field }) => (
                          <input
                            className="outline-none placeholder-gray-500 bg-white text-black flex flex-grow"
                            placeholder="Enter Color"
                            {...field}
                            disabled
                          />
                        )}
                      />
                    </div>
                  </div>
                  <div className="flex  w-full justify-between p-2">
                    <p className="text-xl flex items-center justify-center">
                      Size
                    </p>
                    <div className="flex items-center rounded-xl border border-gray-600 p-2 justify-between bg-white w-2/3">
                      <Controller
                        name="size"
                        control={control}
                        render={({ field }) => (
                          <input
                            className="outline-none placeholder-gray-500 bg-white text-black flex flex-grow"
                            placeholder="Enter Size"
                            {...field}
                            disabled
                          />
                        )}
                      />
                    </div>
                  </div>
                  <div className="flex  w-full justify-between p-2">
                    <p className="text-xl flex items-center justify-center">
                      Discount %
                    </p>
                    <div className="flex items-center rounded-xl border border-gray-600 p-2 justify-between bg-white w-2/3">
                      <Controller
                        name="discount"
                        control={control}
                        render={({ field }) => (
                          <input
                            className="outline-none placeholder-gray-500 bg-white text-black flex flex-grow"
                            placeholder="Enter Discount"
                            {...field}
                            disabled
                          />
                        )}
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default InventoryDetailsPage;
