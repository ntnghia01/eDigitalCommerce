
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';

import { useSelector } from 'react-redux'

import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { AccessAlarm, BarChart, ChatRounded, Dashboard, ThreeDRotation } from '@mui/icons-material';
import HomeIcon from '@mui/icons-material/Home';
import Typography from '@mui/material/Typography';

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

import { DataGrid } from '@mui/x-data-grid';

import AddIcon from '@mui/icons-material/Add';
import FileUploadIcon from '@mui/icons-material/FileUpload';

// import Component

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'firstName', headerName: 'First name', width: 130 },
  { field: 'lastName', headerName: 'Last name', width: 130 },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 90,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
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
      <div style={{ height: 400, width: '100%' }}>
      <Grid container spacing={2} marginBottom={2}>
        <Grid item xs={6} container direction="row" justifyContent="flex-start" alignItems="center">
          <Button startIcon={<AddIcon />} variant="contained">Thêm mới</Button>
        </Grid>
        <Grid item xs={6} container direction="row" justifyContent="flex-end" alignItems="center">
          <Button startIcon={<FileUploadIcon />} variant="contained" color="success">Nhập Excel</Button>
        </Grid>
      </Grid>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      /></div>

    </>
  );
}



export default Categories;