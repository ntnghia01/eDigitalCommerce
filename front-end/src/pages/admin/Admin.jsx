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

import { Sidebar, Menu, MenuItem, SubMenu, sidebarClasses } from 'react-pro-sidebar';

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
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';

import Categories from './categories';
import AddCategoryForm from '../../components/admin/Category/AddCategoryForm';
import { Box, Paper } from '@mui/material';
import { css } from '@emotion/react';
import AdminTopBar from '../../components/admin/AdminTopBar';
import AdminDashboard from './dashboard/Dashboard';
import Brands from './brands';

// import '../../../public/avatar.png'
const actions = [
  { icon: <FileCopyIcon />, name: 'Copy' },
  { icon: <SaveIcon />, name: 'Save' },
  { icon: <PrintIcon />, name: 'Print' },
  { icon: <ShareIcon />, name: 'Share' },
];

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
        <Sidebar backgroundColor='none' collapsed={collapse}>
          <Menu 
          style={{ height: "100vh" }}
          menuItemStyles={{
            button: {
              // the active class will be added automatically by react router
              // so we can use it to style the active menu item
              [`&.active`]: {
                backgroundColor: '#ff5722',
                color: '#dd2c00',
              },
            },
          }} 
          >
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
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  src={`../../../public/avar.jpg`}
                  style={{ cursor: "pointer", borderRadius: "50%", 
                    width: collapse ? "50px" : "100px", // Sử dụng điều kiện để thay đổi kích thước
                    height: collapse ? "50px" : "100px", }}
                />
              </Box>
              <Box textAlign="center" >
                <Typography
                  variant="h4"
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0", fontSize: collapse ? '1.5rem' : '2.125rem' }}
                >
                  Nghĩa
                </Typography>
                <Typography variant="h5" sx={{ fontSize: collapse ? '1rem' : '1.5rem' }}>
                  Quản Trị Viên
                </Typography>
              </Box>
            </Box>
            <MenuItem active={true} icon={<Dashboard/>} component={<Link to='/admin/dashboard' />}> Tổng Quan </MenuItem>
            <MenuItem icon={<CategoryIcon/>} component={<Link to='/admin/categories' />}> Quản Lý Danh Mục </MenuItem>
            <MenuItem icon={<BrandingWatermarkIcon/>} component={<Link to='/admin/brands'/>}> Quản Lý Thương Hiệu </MenuItem>
            <MenuItem icon={<PhoneAndroidIcon/>}> Quản Lý Sản Phẩm </MenuItem>
            <MenuItem icon={<ImportExportIcon/>}> Quản Lý Xuất/Nhập </MenuItem>
            <MenuItem icon={<InventoryIcon/>}> Quản Lý Đơn Hàng </MenuItem>
            <MenuItem icon={<PreviewIcon/>}> Quản Lý Đánh Giá </MenuItem>
            <MenuItem icon={<CommentIcon/>}> Quản Lý Bình Luận </MenuItem>
            <SubMenu label="Quản Lý Tài Khoản" icon={<ManageAccountsOutlinedIcon />}>
              <MenuItem rootStyles={{background: 'none'}} 
                 onClick={() => {navigate('/')}} icon={<BarChartIcon/>}> Thống Kê Theo Biểu Đồ </MenuItem>
              <MenuItem icon={<NumbersIcon/>}> Thống Kê Số Liệu </MenuItem>
            </SubMenu>
          </Menu>
        </Sidebar>
        
        <div 
          style={{ width: '100%', padding: 20 }}
        >
          <AdminTopBar />
          <Routes>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/categories" element={<Categories />} />
            <Route path="/admin/brands" element={<Brands />} />
            <Route path="/add-category" element={<AddCategoryForm />} />
            <Route path="/" element={<Test />} ></Route>
          </Routes>
        </div>

      </div>
      
    </>
  );
}



export default Admin;