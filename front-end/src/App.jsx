import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import CategoryList from './components/Category/categoryList.jsx'
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import Test from './components/test'

import { useSelector } from 'react-redux'
import AddCategoryForm from './components/Category/AddCategoryForm'
import EditCategory from './components/Category/EditCategory'

import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { AccessAlarm, ThreeDRotation } from '@mui/icons-material';
import HomeIcon from '@mui/icons-material/Home';
import Typography from '@mui/material/Typography';
import Admin from './pages/admin/Admin'


function App() {

  const categories = useSelector((state) => state.categories);

  return (
    <>
      <Admin></Admin>
    </>
  );
}



export default App;