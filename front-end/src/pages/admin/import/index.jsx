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
import ProductTable from "../../../components/admin/product/ProductTable";
import ProductAddForm from "../../../components/admin/product/ProductAddForm";
import ImportTable from "../../../components/admin/import/ImportTable";
import ImportAddForm from "../../../components/admin/import/ImportAddForm";
import FilterCategoryTable from "../../../components/admin/Category/FilterCategoryTable";
import FilterImportTable from "../../../components/admin/import/FilterImportTable";

function Import() {
  return (
    <>
      <h1 style={{textAlign: 'center'}}>QUẢN LÝ NHẬP HÀNG</h1>
      <div style={{ height: 400, width: "100%" }}>
        <Grid container spacing={2} marginBottom={2}>
          <Grid
            item
            xs={6}
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
          >
            <ImportAddForm />
          </Grid>
          <Grid
            item
            xs={6}
            container
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
          >
            <Button
              startIcon={<FileUploadIcon />}
              variant="contained"
              color="success"
              type="file"
            >
              Nhập Excel
            </Button>
          </Grid>
        </Grid>
        <FilterImportTable />
        <ImportTable />
      </div>
    </>
  );
}

export default Import;
