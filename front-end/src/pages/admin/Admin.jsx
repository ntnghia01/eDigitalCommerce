import { useState} from 'react'
import viteLogo from '/vite.svg'
import '../../App.css'
import { BrowserRouter, Route, Routes, Link, useNavigate } from 'react-router-dom';
import Test from '../../components/test'

import { useSelector } from 'react-redux'

import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { AccessAlarm, BarChart, ChatRounded, Dashboard, Padding, ThreeDRotation } from '@mui/icons-material';
import HomeIcon from '@mui/icons-material/Home';
import Typography from '@mui/material/Typography';
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";

import { useColorScheme } from '@mui/material/styles';

import { Sidebar, Menu, MenuItem, SubMenu, useProSidebar } from 'react-pro-sidebar';

// Icons
import DashboardIcon from '@mui/icons-material/Dashboard';
import BarChartIcon from '@mui/icons-material/BarChart';
import NumbersIcon from '@mui/icons-material/Numbers';
import CategoryIcon from '@mui/icons-material/Category';
import BrandingWatermarkIcon from '@mui/icons-material/BrandingWatermark';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import InventoryIcon from '@mui/icons-material/Inventory';
import PreviewIcon from '@mui/icons-material/Preview';
import CommentIcon from '@mui/icons-material/Comment';

import Categories from './categories';
import AddCategoryForm from '../../components/admin/Category/AddCategoryForm';
import { Paper } from '@mui/material';
import { css } from '@emotion/react';
import AdminTopBar from '../../components/admin/AdminTopBar';


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

  const navigate = useNavigate();
  const [collapse, setCollapse] = useState(false); 

  const changeCollapseStatus = () => {
    if (collapse == true) {
      setCollapse(false);
    } else {
      setCollapse(true);
    }
  }
  

  return (
    <>
      <div style={{ display: 'flex'}}>
        <Sidebar  backgroundColor='none' collapsed={collapse}>
          <Menu 
          style={{ height: "100vh" }}
          menuItemStyles={{
            button: {
              // the active class will be added automatically by react router
              // so we can use it to style the active menu item
              [`&.active`]: {
                backgroundColor: '#13395e',
                color: '#b6c8d9',
              },
            },
          }} >
          <MenuItem
              icon={<MenuOutlinedIcon />}
              onClick={() => {
                changeCollapseStatus();
              }}
              style={{ textAlign: "center" }}
            >
              {" "}
              <h2>QUẢN TRỊ</h2>
            </MenuItem>
            <SubMenu label="Tổng Quan" icon={<Dashboard />}>
              <MenuItem onClick={() => {
                navigate('/');
              }} icon={<BarChartIcon/>}> Thống Kê Theo Biểu Đồ </MenuItem>
              <MenuItem icon={<NumbersIcon/>}> Thống Kê Số Liệu </MenuItem>
            </SubMenu>
            <MenuItem icon={<CategoryIcon/>} component={<Link to='/categories' />}> Quản Lý Danh Mục </MenuItem>
            <MenuItem icon={<BrandingWatermarkIcon/>}> Quản Lý Thương Hiệu </MenuItem>
            <MenuItem icon={<PhoneAndroidIcon/>}> Quản Lý Sản Phẩm </MenuItem>
            <MenuItem icon={<ImportExportIcon/>}> Quản Lý Xuất/Nhập </MenuItem>
            <MenuItem icon={<InventoryIcon/>}> Quản Lý Đơn Hàng </MenuItem>
            <MenuItem icon={<PreviewIcon/>}> Quản Lý Đánh Giá </MenuItem>
            <MenuItem icon={<CommentIcon/>}> Quản Lý Bình Luận </MenuItem>
            <ModeToggle />
          </Menu>
        </Sidebar>
        
        <div 
          style={{ width: '100%', padding: 20 }}
        >
          <AdminTopBar />
          <Routes>
            <Route path="/categories" element={<Categories />} />
            <Route path="/add-category" element={<AddCategoryForm />} />
            <Route path="/" element={<Test />} ></Route>
          </Routes>
        </div>

      </div>
        
    </>
  );
}



export default Admin;