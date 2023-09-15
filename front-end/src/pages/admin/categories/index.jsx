import { BrowserRouter, Route, Routes, Link } from "react-router-dom";

import { useSelector } from "react-redux";

import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

// import Icons

import DeleteIcon from '@mui/icons-material/Delete';

import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

import { DataGrid } from "@mui/x-data-grid";

import AddIcon from "@mui/icons-material/Add";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import DeleteCategory from "../../../components/admin/Category/ConfirmDeleteCategory";
import CategoryEditForm from "../../../components/admin/Category/CategoryEditForm";
import CategoryAddForm from "../../../components/admin/Category/CategoryAddForm";
import CategoryTable from "../../../components/admin/Category/CategoryTable";

// import Component

// example data



function Categories() {
  const categories = useSelector((state) => state.categories);
  return (
    <>
      {/* <Typography variant='body1' color='text.red'>Test nhe</Typography> */}

      {/* <Stack spacing={2} direction="row">
          <Link to='/add-category' type='button'><Button variant="contained"><ThreeDRotation />Thêm danh mục mới</Button></Link><br />
          <Link to='/' type='button'><Button variant="outlined"><HomeIcon></HomeIcon>Trang chủ</Button></Link>
        </Stack> */}

      <h1 style={{textAlign: 'center'}}>QUẢN LÝ DANH MỤC SẢN PHẨM</h1>
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
        <CategoryTable />
      </div>
    </>
  );
}

export default Categories;
