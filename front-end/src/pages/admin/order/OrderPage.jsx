import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import * as React from "react";
import Button from "@mui/material/Button";

// import MUI
import FileUploadIcon from "@mui/icons-material/FileUpload";
import Grid from "@mui/material/Grid";
import Typography from "@mui/joy/Typography";


// import Component
import BrandAddForm from "../../../components/admin/brand/BrandAddForm";
import BrandTable from "../../../components/admin/brand/BrandTable";
import SuppierTable from "../../../components/admin/supplier/SupplierTable";
import SupplierAddForm from "../../../components/admin/supplier/SupplierAddForm";
import OrderTable from "../../../components/admin/order/OrderTable";
import ProductAddForm from "../../../components/admin/product/ProductAddForm";
import FilterOrderTable from "../../../components/admin/order/FilterOrderTable";

function Order() {
  return (
    <>
      <h1 style={{textAlign: 'center'}}>QUẢN LÝ ĐƠN HÀNG</h1>
      <div style={{ height: 400, width: "100%" }}>

        {/* <FilterOrderTable /> */}
        <OrderTable />
      </div>
    </>
  );
}

export default Order;
