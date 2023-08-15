import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

// import Icons
import UpdateIcon from '@mui/icons-material/Update';
import DeleteIcon from '@mui/icons-material/Delete';
import FileUploadIcon from "@mui/icons-material/FileUpload";

import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

// import Component
import DeleteBrand from "../../../components/admin/brand/ConfirmDeleteBrand";
import BrandAddForm from "../../../components/admin/brand/BrandAddForm";
import BrandEditForm from "../../../components/admin/brand/BrandEditForm";



// example data
const rows = [
  {
    brand_id: 1,
    brand_name: "IPhone",
    brand_desc: "Hoa Kỳ",
    brand_status: 1,
    brand_created: "2023-8-14 11:11:11",
    brand_updated: "2023-8-14 11:11:11",
  },
  {
    brand_id: 2,
    brand_name: "Realme",
    brand_desc: "Trung Quốc",
    brand_status: 0,
    brand_created: "2023-8-14 11:11:11",
    brand_updated: "2023-8-14 11:11:11",
  },
  {
    brand_id: 3,
    brand_name: "Xiaomi",
    brand_desc: "Trung Quốc",
    brand_status: 1,
    brand_created: "2023-8-14 11:11:11",
    brand_updated: "2023-8-14 11:11:11",
  },
];

function Brands() {
  const Brands = useSelector((state) => state.Brands);
  return (
    <>

      <h1>QUẢN LÝ THƯƠNG HIỆU SẢN PHẨM</h1>
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
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align="center">Tên Thương Hiệu</TableCell>
                <TableCell align="center">Mô Tả</TableCell>
                <TableCell align="center">Trạng Thái</TableCell>
                <TableCell align="right">
                  Ngày Tạo&nbsp;(yyyy-mm-dd hh-mm-ss)
                </TableCell>
                <TableCell align="right">
                  Ngày Cập Nhật&nbsp;(yyyy-mm-dd hh-mm-ss)
                </TableCell>
                <TableCell align="left">Thao Tác</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.brand_id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.brand_id}
                  </TableCell>
                  <TableCell align="center">{row.brand_name}</TableCell>
                  <TableCell align="center">{row.brand_desc}</TableCell>
                  <TableCell align="center">{row.brand_status}</TableCell>
                  <TableCell align="right">{row.brand_created}</TableCell>
                  <TableCell align="right">{row.brand_updated}</TableCell>
                  <TableCell align="left">
                    <Stack direction="row" spacing={2}>
                      <BrandEditForm data={{id: row.brand_id, name: row.brand_name, desc: row.brand_desc, status: row.brand_status}} />
                      {/* <Button variant="contained" href="#outlined-buttons" color="error" startIcon={<DeleteIcon />}>Xóa</Button> */}
                      <DeleteBrand deleteID={row.brand_id}/>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}

export default Brands;
