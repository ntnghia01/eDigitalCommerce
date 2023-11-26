import { useState } from "react";
import viteLogo from "/vite.svg";
import "../../App.css";
import {
  BrowserRouter,
  Route,
  Routes,
  Link,
  useNavigate,
} from "react-router-dom";

import { useSelector } from "react-redux";

import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import {
  AccessAlarm,
  BarChart,
  ChatRounded,
  Dashboard,
  Padding,
  ThreeDRotation,
} from "@mui/icons-material";
import HomeIcon from "@mui/icons-material/Home";
import Typography from "@mui/material/Typography";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import TwoWheelerIcon from '@mui/icons-material/TwoWheeler';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import Person3Icon from '@mui/icons-material/Person3';

import { useColorScheme } from "@mui/material/styles";

import {
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
} from "react-pro-sidebar";

// Icons
import BarChartIcon from "@mui/icons-material/BarChart";
import NumbersIcon from "@mui/icons-material/Numbers";
import CategoryIcon from "@mui/icons-material/Category";
import BrandingWatermarkIcon from "@mui/icons-material/BrandingWatermark";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import InventoryIcon from "@mui/icons-material/Inventory";
import PreviewIcon from "@mui/icons-material/Preview";
import CommentIcon from "@mui/icons-material/Comment";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import FactoryIcon from "@mui/icons-material/Factory";

import Categories from "./categories";
import AddCategoryForm from "../../components/admin/Category/AddCategoryForm";
import { Box, Paper } from "@mui/material";
import AdminTopBar from "../../components/admin/AdminTopBar";
import AdminDashboard from "./dashboard/Dashboard";
import Brands from "./brands";
import Supplier from "./supplier";
import Product from "./product";
import Import from "./import";
import Order from "./order/OrderPage";
import ShipperAccountPage from "./account/ShipperAccountPage";
import CustomerAccountPage from "./account/CustomerAccountPage";
import AdminAccountPage from "./account/AdminAccountPage";
import AdminLoginPage from "./login/AdminLoginPage";
import ReviewPage from "./review/ReviewPage";

// import '../../../public/avatar.png'

function Admin() {
  const navigate = useNavigate();
  const [collapse, setCollapse] = useState(false);

  const changeCollapseStatus = () => {
    if (collapse == true) {
      setCollapse(false);
    } else {
      setCollapse(true);
    }
  };

  return (
    <>
      <div style={{ display: "flex" }}>
        <Sidebar backgroundColor="none" collapsed={collapse}>
          <Menu
            style={{ height: "100vh" }}
            menuItemStyles={{
              button: {
                // the active class will be added automatically by react router
                // so we can use it to style the active menu item
                [`&.active`]: {
                  backgroundColor: "#ff5722",
                  color: "#dd2c00",
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
                  style={{
                    cursor: "pointer",
                    borderRadius: "50%",
                    width: collapse ? "50px" : "100px", // Sử dụng điều kiện để thay đổi kích thước
                    height: collapse ? "50px" : "100px",
                  }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h4"
                  fontWeight="bold"
                  sx={{
                    m: "10px 0 0 0",
                    fontSize: collapse ? "1.5rem" : "2.125rem",
                  }}
                >
                  {localStorage.getItem('adminName') ? 
                    localStorage.getItem('adminName') : "Chưa đăng nhập"}
                </Typography>
                <Typography
                  variant="h5"
                  sx={{ fontSize: collapse ? "0.9rem" : "1.5rem" }}
                >
                  Quản Trị Viên
                </Typography>
              </Box>
            </Box>
            <MenuItem
              active={true}
              icon={<Dashboard />}
              style={{ fontSize: "0.99rem" }}
              component={<Link to="/admin/dashboard" />}
            >
              {" "}
              Tổng Quan{" "}
            </MenuItem>
            <MenuItem
              icon={<CategoryIcon />}
              style={{ fontSize: "0.99rem" }}
              component={<Link to="/admin/categories" />}
            >
              {" "}
              Quản Lý Danh Mục{" "}
            </MenuItem>
            <MenuItem
              icon={<BrandingWatermarkIcon />}
              style={{ fontSize: "0.99rem" }}
              component={<Link to="/admin/brands" />}
            >
              {" "}
              Quản Lý Thương Hiệu{" "}
            </MenuItem>
            <MenuItem
              icon={<FactoryIcon />}
              style={{ fontSize: "0.99rem" }}
              component={<Link to="/admin/supplier" />}
            >
              Quản Lý Nhà Cung Cấp
            </MenuItem>
            <MenuItem
              icon={<PhoneAndroidIcon />}
              style={{ fontSize: "0.99rem" }}
              component={<Link to="/admin/product" />}
            >
              Quản Lý Sản Phẩm
            </MenuItem>
            <MenuItem
              icon={<ImportExportIcon />}
              style={{ fontSize: "0.99rem" }}
              component={<Link to="/admin/import" />}
            >
              {" "}
              Quản Lý Nhập/Xuất{" "}
            </MenuItem>
            <MenuItem 
              icon={<InventoryIcon />} 
              style={{ fontSize: "0.99rem" }}
              component={<Link to="/admin/order" />}
            >
              {" "}
              Quản Lý Đơn Hàng{" "}
            </MenuItem>
            <MenuItem 
              icon={<PreviewIcon />} 
              style={{ fontSize: "0.99rem" }}
              component={<Link to="/admin/review" />}
            >
              {" "}
              Quản Lý Đánh Giá{" "}
            </MenuItem>
            <MenuItem icon={<CommentIcon />} style={{ fontSize: "0.99rem" }}>
              {" "}
              Quản Lý Bình Luận{" "}
            </MenuItem>
            <SubMenu
              label="Quản Lý Tài Khoản"
              icon={<ManageAccountsOutlinedIcon />}
              style={{ fontSize: "0.99rem" }}
            >
              <MenuItem icon={<Person3Icon />} component={<Link to="/admin/account/customer" />}> Khách  hàng </MenuItem>
              <MenuItem
                rootStyles={{ background: "none" }}
                component={<Link to="/admin/account/shipper" />}
                icon={<TwoWheelerIcon />}
              >
                {" "}
                Shipper{" "}
              </MenuItem>
              <MenuItem icon={<SupportAgentIcon />} component={<Link to="/admin/account/admin" />}> Quản trị viên </MenuItem>
            </SubMenu>
          </Menu>
        </Sidebar>

        <div style={{ width: "100%", padding: 20 }}>
          <AdminTopBar />
          <Routes>
            <Route path="/admin/login" element={<AdminLoginPage />} />
            <Route path="/dashboard" element={<AdminDashboard />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/brands" element={<Brands />} />
            <Route path="/add-category" element={<AddCategoryForm />} />
            <Route path="/supplier" element={<Supplier />} />
            <Route path="/product" element={<Product />} />
            <Route path="/import" element={<Import />} />
            <Route path="/order" element={<Order />} />
            <Route path="/account/shipper" element={<ShipperAccountPage />} />
            <Route path="/account/customer" element={<CustomerAccountPage />} />
            <Route path="/account/admin" element={<AdminAccountPage />} />
            <Route path="/review" element={<ReviewPage />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default Admin;
