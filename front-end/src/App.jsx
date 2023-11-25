import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';

import { useSelector } from 'react-redux'

import * as React from 'react';
import Admin from './pages/admin/Admin';
import CustomerPage from './pages/customer/Customer';
import CustomerLoginPage from './pages/customer/login';
import CustomerSignupPage from './pages/customer/signup';
import AdminLoginPage from './pages/admin/login/AdminLoginPage';


function App() {

  const categories = useSelector((state) => state.categories);

  return (
    <>
      <BrowserRouter>
        {/* <Admin></Admin> */}
        <Routes>
          <Route path='/*' element={<CustomerPage />}></Route>
          {/* <Route path='/login' element={<CustomerLoginPage />}></Route> */}
          {/* <Route path='/signup' element={<CustomerSignupPage />}></Route> */}
          <Route path='/admin/*' element={<Admin />}></Route>
          <Route path="/admin/login" element={<AdminLoginPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}



export default App;