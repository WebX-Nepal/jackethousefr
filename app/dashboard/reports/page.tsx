"use client";
import { RootState } from "../../../redux/store";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function Reports() {
  const counterValue = useSelector((state: RootState) => state.auth.token);
  return <div>reports</div>;
}

export default Reports;
