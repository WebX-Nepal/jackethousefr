"use client";
import React, { useEffect, useState } from "react";
import { useGetLocalProductsByBranchQuery } from "../../../redux/api/secureApi";
import { useRouter } from "next/navigation";
import BarcodeInventoryModal from "./barcodeModal";
import DataTable, { createTheme } from "react-data-table-component";
import { tableCustomStyles } from "../../../components/Constant";
function Inventory() {
  const router = useRouter();
  const [productData, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const category = "";
  const productName = "";
  const {
    data: inventoryData,
    refetch,
    isSuccess,
  } = useGetLocalProductsByBranchQuery({ category, productName });
  useEffect(() => {
    if (inventoryData && isSuccess) {
      setProducts(inventoryData.products);
    } else {
    }
  }, [inventoryData]);
  useEffect(() => {
    refetch();
  }, []);
  const openViewDetails = (row: any) => {
    console.log("row is", row);
    let slug = row._id;
    router.push(`/branch/inventory/${slug}`);
  };
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
      selector: (row: any) => row.category?.name,
    },

    {
      name: "Selling Price",
      selector: (row: any) => row.sellingPrice,
    },

    {
      name: "Actions",
      cell: (row: any) => (
        <div className="w-[150px] flex justify-between ">
          <div>
            <ActionButton
              text="View"
              color="cyan"
              row={row}
              onClick={() => openViewDetails(row)}
            />
          </div>
          <ActionButton
            text="Delete"
            color="red"
            row={row}
            // onClick={useDeleteProduct}
          />
        </div>
      ),
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
          <h4 className="text-xl font-semibold text-black ">Local Inventory</h4>

          {/* <button
            className="bg-black text-white pt-1 pb-1 pl-3 pr-3 rounded-xl "
            onClick={openModal}
          >
            Add Products
          </button> */}
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
        <BarcodeInventoryModal
          isOpen={isModalOpen}
          closeModal={closeModal}
          refetch={refetch}
        ></BarcodeInventoryModal>
      </div>
    </>
  );
}

export default Inventory;
