"use client";
import React, { useEffect, useState } from "react";

function Reports() {
  const [data, setData] = useState("1");
  useEffect(() => {
    console.log("ASdasd");
  }, []);
  return (
    <div>
      reports {data} <button onClick={() => setData("2")}>asd</button>
    </div>
  );
}

export default Reports;
