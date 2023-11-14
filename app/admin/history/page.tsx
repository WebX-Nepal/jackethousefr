"use client";
import React, { useEffect, useState } from "react";
import {
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
import { AiTwotoneDelete } from "react-icons/ai";
function Inventory() {
  const router = useRouter();
  const [productData, setProducts] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState();
  const {
    data: inventoryData,
    refetch,
    isSuccess,
  } = useGetLatestProductQuery({});
  const { data: category, isSuccess: categoryDataSuccess } =
    useGetCategoryQuery({});
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
      selector: (row: any) => row.name,
    },
    {
      name: "Category",
      selector: (row: any) => row.category,
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
          <ActionButton text="Delete" color="red" />
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

  return (
    <>
      <div className="rounded-sm border border-stroke bg-[#e3e1e1] shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="py-6 px-4 md:px-6 xl:px-7.5 flex justify-between">
          <h4 className="text-xl font-semibold text-black ">Inventory</h4>
          <div>
            <button
              className="bg-red-600 text-white pt-1 pb-1 pl-3 pr-3 rounded-xl ml-1 flex items-center"
              onClick={openModal}
            >
              <AiTwotoneDelete className="text-xl mr-2" />
              Delete History
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
          refetch={refetch}
        />
      </div>
    </>
  );
}

export default Inventory;
