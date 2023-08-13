import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';

import { useSelector } from 'react-redux'

import * as React from 'react';
import Admin from './pages/admin/Admin'


function App() {

  const categories = useSelector((state) => state.categories);

  return (
    <>
      <BrowserRouter>
        <Admin></Admin>
      </BrowserRouter>
    </>
  );
}



export default App;