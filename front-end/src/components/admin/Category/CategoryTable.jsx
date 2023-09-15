// import * as React from 'react';
import Stack from "@mui/material/Stack";
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Paper from "@mui/material/Paper";
import Typography from '@mui/material/Typography';
// import Input from '@mui/joy/Input';

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
import { fetchCategories } from "../../../slices/categorySlice";

const formatDateTime = (oriDateTime) => {
  const dateTime = new Date(oriDateTime);
  const date = dateTime.getDate();
  const month = dateTime.getMonth() + 1;
  const year = dateTime.getFullYear();
  const hour = dateTime.getHours();
  const minute = dateTime.getMinutes();
  const second = dateTime.getSeconds();

  const newDateTime = `${date < 10 ? '0' : ''}${date}-${month < 10 ? '0' : ''}${month}-${year} ${hour < 10 ? '0' : ''}${hour}:${minute < 10 ? '0' : ''}${minute}:${second < 10 ? '0' : ''}${second}`;
  return newDateTime;
}

export default function CategoryTable () {

    const dispatch = useDispatch();
    const categories = useSelector((state) => state.categories.categories);
    const isLoading = useSelector((state) => state.categories.isLoading);
    const error = useSelector((state) => state.categories.error);

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    console.log(categories);

    return (
        <TableContainer component={Paper}>
          <Table style={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align="left">Tên Danh Mục</TableCell>
                <TableCell align="left">Mô Tả</TableCell>
                <TableCell align="left">Trạng Thái</TableCell>
                <TableCell align="right">
                  Ngày Tạo&nbsp;(dd-mm-yyyy hh-mm-ss)
                </TableCell>
                <TableCell align="right">
                  Ngày Cập Nhật&nbsp;(dd-mm-yyyy hh-mm-ss)
                </TableCell>
                <TableCell align="center">Thao Tác</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categories.map((category) => (
                <TableRow
                  key={category.cateId}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {category.cateId}
                  </TableCell>
                  <TableCell align="left">{category.cateName}</TableCell>
                  <TableCell align="left">{category.cateDesc}</TableCell>
                  <TableCell align="left" color="red">
                    {category.cateStatus == 1 ? <Typography sx={{backgroundColor:'#4caf50', color:'white', paddingLeft: '1rem', borderRadius: '5rem', maxWidth: "95%"}}>Đang hoạt động</Typography>
                    : <Typography sx={{backgroundColor:'#ff3d00', color:'white', paddingLeft: '1rem', borderRadius: '5rem', maxWidth: "75%"}}>Vô hiệu hóa</Typography>}
                  </TableCell>
                  <TableCell align="right">{formatDateTime(category.cateCreatedAt)}</TableCell>
                  <TableCell align="right">{formatDateTime(category.cateUpdatedAt)}</TableCell>
                  <TableCell align="left">
                    <Stack direction="row" spacing={2}>
                      <CategoryEditForm data={{id: category.cateId, name: category.cateName, desc: category.cateDesc, status: category.cateStatus}}/>
                      <DeleteCategory deleteID={category.cateId}/>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
    )
}