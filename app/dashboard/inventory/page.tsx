"use client";
import React, { useEffect, useState } from "react";
import { useGetLatestProductQuery } from "../../../redux/api/secureApi";
import InventoryModal from "./Modal";
import DataTable from "react-data-table-component";
function Inventory() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const [productData, setProducts] = useState([]);
  const { data: inventoryData, isSuccess } = useGetLatestProductQuery({});
  useEffect(() => {
    if (inventoryData && isSuccess) {
      setProducts(inventoryData.products);
    } else {
    }
  }, [inventoryData]);
  const columns = [
    {
      name: "SN",
      cell: (row: any, index: number) => index + 1,
      width: "90px",
    },
    {
      name: "Image",
      selector: (row: any) => (
        <img
          src={row.image[0]}
          style={{
            width: "60px",
            height: "40px",
            objectFit: "cover",
          }}
        />
      ),
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
        <button
          className="bg-blue-500 px-4 py-2 rounded-lg text-white"
          onClick={() => {
            alert(row);
          }}
        >
          View
        </button>
      ),
    },
  ];
  return (
    <>
      <div className={`w-full`}>
        <div className="w-full flex justify-between h-8 items-center">
          <div className="w-1/3 flex justify-between items-center">
            <span>
              <button
                className="bg-black text-white pt-1 pb-1 pl-2 pr-2 rounded-xl"
                onClick={openModal}
              >
                + Add Products
              </button>
            </span>
          </div>
        </div>
        <div
          className={`w-full h-full mt-8 ${isModalOpen ? "opacity-25" : ""}`}
        >
          <DataTable
            title="Inventory"
            columns={columns}
            data={productData}
            pagination
            fixedHeader
            highlightOnHover
            responsive
          />
        </div>
        <InventoryModal
          isOpen={isModalOpen}
          closeModal={closeModal}
        ></InventoryModal>
      </div>
    </>
  );
}

export default Inventory;
