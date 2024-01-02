"use client";
import React, { useState, useEffect } from "react";
import DataTable, { createTheme } from "react-data-table-component";
import { tableCustomStyles } from "../../../components/Constant";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  useCreateCategoryMutation,
  useDeleteCategoryByIdMutation,
  useGetCategoryQuery,
} from "@/redux/api/secureApi";
import { toast } from "react-toastify";

function CategoryPage() {
  const router = useRouter();
  const [categoryData, setCategoryData] = useState([]);
  const [isDataSending, setIsdataSending] = useState<boolean>(false);
  const [files, setFiles] = useState<any>();
  const {
    data: category,
    isSuccess: categoryDataSuccess,
    refetch: categoryRefetch,
  } = useGetCategoryQuery({});
  const [
    sendData,
    { isSuccess: isSendDataSuccess, isLoading: isDataSendingLoading, isError },
  ] = useCreateCategoryMutation();
  const [
    deleteCategory,
    { isSuccess: isdeleteCategorySuccess, isLoading: isdeleteCategoryLoading },
  ] = useDeleteCategoryByIdMutation();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const onSubmit: SubmitHandler<any> = async (data) => {
    await sendData(data);
    reset();
  };
  const handleDeleteCategory = (item: any) => {
    const data = {
      categoryID: item._id,
    };
    deleteCategory(data);
  };
  useEffect(() => {
    if (isdeleteCategorySuccess) {
      toast.success("Successfully deleted");
    }
  }, [isdeleteCategorySuccess]);
  useEffect(() => {
    if (category && categoryDataSuccess) {
      setCategoryData(category.categories);
    } else {
    }
  }, [category]);
  useEffect(() => {
    if (isDataSendingLoading) {
      setIsdataSending(true);
    } else {
      setIsdataSending(false);
    }
  }, [isDataSendingLoading]);
  useEffect(() => {
    if (isError) {
      toast.error("Category must be unique");
    }
  }, [isError]);
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
  createTheme("solarized", {
    background: {
      default: "#e3e1e1",
    },
    divider: {
      default: "#FFFFFF",
    },
  });
  const handleRowClicked = (row: any) => {
    let slug = row._id;
    router.push(`/admin/category/${slug}`);
  };
  const columns = [
    {
      name: "SN",
      cell: (row: any, index: number) => index + 1,
      width: "90px",
    },
    {
      name: "Category Name",
      selector: (row: any) => row.name,
    },
    {
      name: "Stock",
      selector: (row: any) => row.count,
    },
    {
      name: "Actions",
      cell: (row: any) => (
        <div className="w-full flex justify-between ">
          <div>
            <ActionButton
              text="View"
              color="cyan"
              row={row}
              onClick={handleRowClicked}
            />
          </div>
          <ActionButton text="Delete" color="red" row={row} />
        </div>
      ),
      width: "180px",
    },
  ];
  return (
    <>
      <div className="rounded-sm border border-stroke bg-[#e3e1e1] shadow-default dark:border-strokedark dark:bg-boxdark px-2">
        <div className="py-6 px-4 md:px-6 xl:px-7.5 flex justify-between">
          <h4 className="text-xl font-semibold text-black ">Category</h4>
        </div>
        <div className="px-6">
          <DataTable
            customStyles={tableCustomStyles}
            columns={columns}
            data={categoryData}
            pagination
            fixedHeader
            highlightOnHover
            onRowClicked={handleRowClicked}
            responsive
            theme="solarized"
          />
        </div>
      </div>
    </>
  );
}

export default CategoryPage;
