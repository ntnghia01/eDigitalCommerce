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
import FilterCategoryTable from "../../../components/admin/Category/FilterCategoryTable";
import FilterBrandTable from "../../../components/admin/brand/FilterBrandTable";

function Brands() {
  const Brands = useSelector((state) => state.Brands);
  return (
    <>
      <h1 style={{textAlign: 'center'}}>QUẢN LÝ THƯƠNG HIỆU SẢN PHẨM</h1>
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
            <BrandAddForm />
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
        <FilterBrandTable />
        <BrandTable />
      </div>
    </>
  );
}

export default Brands;
