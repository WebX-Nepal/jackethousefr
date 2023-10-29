"use client";
import React, { useEffect, useState } from "react";
import { useGetLatestProductQuery } from "../../../redux/api/secureApi";
import InventoryModal from "./Modal";
import DataTable from "react-data-table-component";
import { tableCustomStyles } from "../../../components/Constant";
function Inventory() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const [productData, setProducts] = useState([]);
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
  ];
  return (
    <>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
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
          />
        </div>
        <InventoryModal
          isOpen={isModalOpen}
          closeModal={closeModal}
          refetch={refetch}
        ></InventoryModal>
      </div>
    </>
  );
}

export default Inventory;
