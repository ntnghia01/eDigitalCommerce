import { BrowserRouter, Route, Routes, Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

// import Icons

import DeleteIcon from "@mui/icons-material/Delete";

import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";


import AddIcon from "@mui/icons-material/Add";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import DeleteCategory from "../../../components/admin/Category/ConfirmDeleteCategory";
import CategoryEditForm from "../../../components/admin/Category/CategoryEditForm";
import CategoryAddForm from "../../../components/admin/Category/CategoryAddForm";
import CategoryTable from "../../../components/admin/Category/CategoryTable";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";


import { DataGrid } from '@mui/x-data-grid';
import { fetchCategories } from "../../../slices/categorySlice";
import { useEffect } from "react";
import DataGridDemo from "../../../components/admin/Category/CategoryDataTable";
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
        {/* <DataGridDemo /> */}
      </div>
    </>
  );
}

export default Categories;
