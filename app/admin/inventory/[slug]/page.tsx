"use client";
import React from "react";
import DataTable, { createTheme } from "react-data-table-component";

function InventoryDetailsPage({ params: { slug } }: any) {
  createTheme("solarized", {
    background: {
      default: "#e3e1e1",
    },
    divider: {
      default: "#FFFFFF",
    },
  });
  console.log("params is", slug);
  return (
    <div className="rounded-sm border border-stroke bg-[#e3e1e1] shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="py-6 px-4 md:px-6 xl:px-7.5 flex justify-between">
        <h4 className="text-xl font-semibold text-black ">Inventory</h4>

        <button className="bg-green-600 text-white pt-1 pb-1 pl-3 pr-3 rounded-xl">
          Download Barcode
        </button>
      </div>
      <div className={"px-4 rounded-lg "}>
        {/* <DataTable
          // customStyles={tableCustomStyles}
          // columns={columns}
          // data={productData}
          pagination
          fixedHeader
          highlightOnHover
          // onRowClicked={handleRowClicked}
          responsive
          theme="solarized"
        /> */}
      </div>
    </div>
  );
}

export default InventoryDetailsPage;
