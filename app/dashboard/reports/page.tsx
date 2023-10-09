"use client";
import { RootState } from "@/redux/store";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function Reports() {
  const counterValue = useSelector((state: RootState) => state.counter.value);

  return <div>reports{counterValue}</div>;
}

export default Reports;
