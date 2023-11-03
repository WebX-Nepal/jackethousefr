"use client";
import React, { useEffect, useState } from "react";
import { useGetBranchQuery } from "../../../redux/api/secureApi";
const Branches = () => {
  const { data: branchData, isSuccess } = useGetBranchQuery({});
  const [data, setData] = useState();
  useEffect(() => {
    if (branchData && isSuccess) {
      setData(branchData?.branch);
    }
  }, [branchData]);
  console.log("datais", data);
  return <div>Branches</div>;
};

export default Branches;
