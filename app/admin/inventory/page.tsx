"use client";
import React, { useEffect, useState } from "react";
import {
  useDeleteProductByIdQuery,
  useGetCategoryQuery,
  useGetLatestProductQuery,
} from "../../../redux/api/secureApi";
import InventoryModal from "./modals/addProductsModal";
import QrModal from "./modals/qrModal";
import InventoryEditModal from "./modals/editModal";
import DataTable, { createTheme } from "react-data-table-component";
import { tableCustomStyles } from "../../../components/Constant";
import { useRouter } from "next/navigation";
import AddCategoryModal from "./modals/addCategoryModal";
import { toast } from "react-toastify";
import { skipToken } from "@reduxjs/toolkit/query";
function Inventory() {
  const router = useRouter();
  const [productData, setProducts] = useState([]);
  const [filterOptions, setFilterOptions] = useState("category");
  const [categoryData, setCategoryData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState();
  const [sortBy, selectSortBy] = useState("default");
  const [deleteProductId, setDeleteProductID] = useState();
  const options = [{ name: "Date" }, { name: "category" }];
  const {
    data: inventoryData,
    refetch,
    isSuccess,
  } = useGetLatestProductQuery(filterOptions ?? skipToken);
  const {
    data: category,
    isSuccess: categoryDataSuccess,
    refetch: categoryRefetch,
  } = useGetCategoryQuery({});
  const { data: deleteProduct, isSuccess: isDeleteSuccess } =
    useDeleteProductByIdQuery(deleteProductId);
  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };
  const openModal = () => {
    if (categoryData.length > 0) {
      closeEditModal();
      setIsModalOpen(true);
    } else {
      toast.error("Please Add a Category First");
    }
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const openEditModal = (row: any) => {
    setSelectedRowData(row);
    closeModal();
    setIsEditModalOpen(true);
  };
  const openAddCategoryModal = (row: any) => {
    setSelectedRowData(row);
    setIsAddCategoryModalOpen(true);
  };
  const closeAddCategoryModal = () => {
    setIsAddCategoryModalOpen(false);
  };
  const useDeleteProductById = (row: any) => {
    setDeleteProductID(row._id);
  };
  const openQrModal = (row: any) => {
    setSelectedRowData(row);
    setIsQrModalOpen(true);
  };
  const closeQrModal = () => {
    setIsQrModalOpen(false);
  };
  useEffect(() => {
    if (inventoryData && isSuccess) {
      setProducts(inventoryData.products);
    } else {
    }
  }, [inventoryData]);
  useEffect(() => {
    if (isDeleteSuccess) {
      toast.success("Deleted Successfully");
    }
    refetch();
  }, [isDeleteSuccess]);
  useEffect(() => {
    if (category && categoryDataSuccess) {
      setCategoryData(category.category);
    } else {
    }
  }, [category]);
  useEffect(() => {
    refetch();
  }, []);
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
        return row?.category?.categoryImage ? (
          <img
            src={row?.category?.categoryImage}
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
      name: "Cost Price",
      selector: (row: any) => row.costPrice,
    },
    {
      name: "Actions",
      cell: (row: any) => (
        <div className="w-full flex justify-between ">
          <div>
            {/* <ActionButton
              text="Edit"
              color="cyan"
              row={row}
              onClick={openEditModal}
            /> */}
          </div>
          <ActionButton
            text="Delete"
            color="red"
            row={row}
            onClick={useDeleteProductById}
          />
        </div>
      ),
      width: "180px",
    },
  ];
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
    router.push(`/admin/inventory/${slug}`);
  };
  const handleSelectChange = () => {
    if (sortBy == "Date") {
      selectSortBy("Category");
      setFilterOptions("category");
    } else {
      selectSortBy("Date");
      setFilterOptions("createdAt");
    }
  };
  return (
    <>
      <div className="rounded-sm border border-stroke bg-[#e3e1e1] shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="py-6 px-4 md:px-6 xl:px-7.5 flex justify-between">
          <h4 className="text-xl font-semibold text-black ">Inventory</h4>
          <div>
            {/* <button
              className="bg-black text-white pt-1 pb-1 pl-3 pr-3 rounded-xl mr-1"
              onClick={openAddCategoryModal}
            >
              Sort By
            </button> */}
            <select
              value={sortBy}
              onChange={handleSelectChange}
              className="p-1 px-2 outline-none placeholder-gray-500 bg-white text-black rounded-xl mr-2 hover:cursor-pointer"
            >
              {options.map((option) => (
                <option key={option.name} value={option.name}>
                  {option.name}
                </option>
              ))}
            </select>
            <button
              className="bg-black text-white pt-1 pb-1 pl-3 pr-3 rounded-xl mr-1"
              onClick={openAddCategoryModal}
            >
              Add Category
            </button>
            <button
              className="bg-black text-white pt-1 pb-1 pl-3 pr-3 rounded-xl ml-1"
              onClick={openModal}
            >
              Add Products
            </button>
          </div>
        </div>
        <div
          className={`${
            isModalOpen ||
            isQrModalOpen ||
            isEditModalOpen ||
            isAddCategoryModalOpen
              ? "blur-xl"
              : "px-4 rounded-lg "
          }`}
        >
          <DataTable
            customStyles={tableCustomStyles}
            columns={columns}
            data={productData}
            pagination
            fixedHeader
            highlightOnHover
            onRowClicked={handleRowClicked}
            responsive
            theme="solarized"
          />
        </div>
        <InventoryModal
          isOpen={isModalOpen}
          closeModal={closeModal}
          refetch={refetch}
          categoryData={categoryData}
        ></InventoryModal>
        <InventoryEditModal
          isOpen={isEditModalOpen}
          closeModal={closeEditModal}
          selectedRowData={selectedRowData}
          refetch={refetch}
          categoryData={categoryData}
        />
        <QrModal
          isOpen={isQrModalOpen}
          closeModal={closeQrModal}
          selectedRowData={selectedRowData}
          refetch={refetch}
        />
        <AddCategoryModal
          isOpen={isAddCategoryModalOpen}
          closeModal={closeAddCategoryModal}
          selectedRowData={selectedRowData}
          categoryData={categoryData}
          refetch={refetch}
          categoryRefetch={categoryRefetch}
        />
      </div>
    </>
  );
}

export default Inventory;
