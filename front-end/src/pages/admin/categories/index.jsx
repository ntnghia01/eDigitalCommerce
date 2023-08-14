import { BrowserRouter, Route, Routes, Link } from "react-router-dom";

import { useSelector } from "react-redux";

import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

// import Icons
import UpdateIcon from '@mui/icons-material/Update';
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

// import Component

// example data

const rows = [
  {
    cate_id: 1,
    cate_name: "Điện thoại",
    cate_desc: "Điện thoại di động",
    cate_status: 1,
    cate_created: "2023-8-14 11:11:11",
    cate_updated: "2023-8-14 11:11:11",
  },
  {
    cate_id: 2,
    cate_name: "Laptop",
    cate_desc: "Máy tính xách tay (laptop)",
    cate_status: 1,
    cate_created: "2023-8-14 11:11:11",
    cate_updated: "2023-8-14 11:11:11",
  },
  {
    cate_id: 3,
    cate_name: "Máy ảnh",
    cate_desc: "Máy ảnh kỹ thuật số",
    cate_status: 1,
    cate_created: "2023-8-14 11:11:11",
    cate_updated: "2023-8-14 11:11:11",
  },
];

function Categories() {
  const categories = useSelector((state) => state.categories);
  return (
    <>
      {/* <Typography variant='body1' color='text.red'>Test nhe</Typography> */}

      {/* <Stack spacing={2} direction="row">
          <Link to='/add-category' type='button'><Button variant="contained"><ThreeDRotation />Thêm danh mục mới</Button></Link><br />
          <Link to='/' type='button'><Button variant="outlined"><HomeIcon></HomeIcon>Trang chủ</Button></Link>
        </Stack> */}

      <h1>QUẢN LÝ DANH MỤC SẢN PHẨM</h1>
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
            <Button startIcon={<AddIcon />} variant="contained">
              Thêm mới
            </Button>
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
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align="center">Tên Danh Mục</TableCell>
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
                  key={row.cate_id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.cate_id}
                  </TableCell>
                  <TableCell align="center">{row.cate_name}</TableCell>
                  <TableCell align="center">{row.cate_desc}</TableCell>
                  <TableCell align="center">{row.cate_status}</TableCell>
                  <TableCell align="right">{row.cate_created}</TableCell>
                  <TableCell align="right">{row.cate_updated}</TableCell>
                  <TableCell align="left">
                    <Stack direction="row" spacing={2}>
                      <Button variant="contained" color="warning" startIcon={<UpdateIcon />}>Cập nhật</Button>
                      <Button variant="contained" href="#outlined-buttons" color="error" startIcon={<DeleteIcon />}>Xóa</Button>
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

export default Categories;
