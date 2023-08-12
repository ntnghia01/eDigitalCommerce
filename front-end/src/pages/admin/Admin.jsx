import { useState } from 'react'
import viteLogo from '/vite.svg'
import '../../App.css'
import CategoryList from '../../components/Category/categoryList'
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import Test from '../../components/test'

import { useSelector } from 'react-redux'
import AddCategoryForm from '../../components/Category/AddCategoryForm'
import EditCategory from '../../components/Category/EditCategory'

import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { AccessAlarm, ThreeDRotation } from '@mui/icons-material';
import HomeIcon from '@mui/icons-material/Home';
import Typography from '@mui/material/Typography';

import { useColorScheme } from '@mui/material/styles';

function ModeToggle() {
  const { mode, setMode } = useColorScheme();
  return (
    <Button
      onClick={() => {
        setMode(mode === 'light' ? 'dark' : 'light');
      }}
    >
      {mode === 'light' ? 'Turn dark' : 'Turn light'}
    </Button>
  );
}

function Admin() {

  const categories = useSelector((state) => state.categories);

  return (
    <>
      {/* <Test></Test> */}
      <ModeToggle />
      <Typography variant='body1' color='text.red'>Test nhe</Typography>
      <BrowserRouter>

        <Stack spacing={2} direction="row">
          <Link to='/categories' type='button'><Button variant="contained" color="success"><AccessAlarm />Liệt kê danh mục</Button></Link><br />
          <Link to='/add-category' type='button'><Button variant="contained"><ThreeDRotation />Thêm danh mục mới</Button></Link><br />
          <Link to='/' type='button'><Button variant="outlined"><HomeIcon></HomeIcon>Trang chủ</Button></Link>
        </Stack>
        <CategoryList />

        <Routes>
          <Route path="/categories" element={<CategoryList />} />
          <Route path="/" element={<Test />} ></Route>
          <Route path='/add-category' element={<AddCategoryForm />} />
          <Route path='/edit/:categoryId' element={<EditCategory />} />
        </Routes>

      </BrowserRouter>
    </>
  );
}



export default Admin;