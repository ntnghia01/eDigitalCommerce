import * as React from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import CategoryAddForm from "../../../components/admin/Category/CategoryAddForm";
import CategoryTable from "../../../components/admin/Category/CategoryTable";
import FilterCategoryTable from "../../../components/admin/Category/FilterCategoryTable";


function Categories() {

  return (
    <>
      <h1 style={{ textAlign: "center" }}>QUẢN LÝ DANH MỤC SẢN PHẨM</h1>
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
            <CategoryAddForm />
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
            >
              Nhập Excel
            </Button>
          </Grid>
        </Grid>
        <FilterCategoryTable />
        <CategoryTable />
      </div>
    </>
  );
}

export default Categories;
