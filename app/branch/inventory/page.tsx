"use client";
import React, { useEffect, useState } from "react";
import { useGetLatestProductQuery } from "../../../redux/api/secureApi";
import InventoryModal from "./Modal";
import InventoryEditModal from "./editModal";
import DataTable, { createTheme } from "react-data-table-component";
import { tableCustomStyles } from "../../../components/Constant";
function Inventory() {
  const [productData, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState();
  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };
  const openModal = () => {
    closeEditModal();
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const openEditModal = (row: any) => {
    setSelectedRowData(row);
    closeModal();
    setIsEditModalOpen(true);
  };
  const {
    data: inventoryData,
    refetch,
    isSuccess,
  } = useGetLatestProductQuery({});
  useEffect(() => {
    if (inventoryData && isSuccess) {
      setProducts(inventoryData.products);
    } else {
    }
  }, [inventoryData]);
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
        return row.image[0] ? (
          <img
            src={row.image[0]}
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
      name: "Total Items",
      selector: (row: any) => row.totalItems,
    },
    {
      name: "Stock",
      selector: (row: any) => row.stock,
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
            <ActionButton
              text="Edit"
              color="cyan"
              row={row}
              onClick={openEditModal}
            />
          </div>

          <ActionButton text="Delete" color="red" />
        </div>
      ),
      width: "170px",
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
  return (
    <>
      <div className="rounded-sm border border-stroke bg-[#e3e1e1] shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="py-6 px-4 md:px-6 xl:px-7.5 flex justify-between">
          <h4 className="text-xl font-semibold text-black ">Inventory</h4>

          <button
            className="bg-black text-white pt-1 pb-1 pl-3 pr-3 rounded-xl "
            onClick={openModal}
          >
            Add Products
          </button>
        </div>
        <div className={`${isModalOpen ? "blur-xl" : "px-4 rounded-lg "}`}>
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
        <InventoryModal
          isOpen={isModalOpen}
          closeModal={closeModal}
          refetch={refetch}
        ></InventoryModal>
        <InventoryEditModal
          isOpen={isEditModalOpen}
          closeModal={closeEditModal}
          selectedRowData={selectedRowData}
          refetch={refetch}
        />
      </div>
    </>
  );
}

export default Inventory;
