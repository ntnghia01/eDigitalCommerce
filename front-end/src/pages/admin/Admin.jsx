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
import TwoWheelerIcon from "@mui/icons-material/TwoWheeler";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import Person3Icon from "@mui/icons-material/Person3";

import { useColorScheme } from "@mui/material/styles";

import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";

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
import ArticleIcon from '@mui/icons-material/Article';

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
import CommentPage from "./comment/CommentPage";
import AdminBlogPage from "./blog/AdminBlogPage";
import AdminContactPage from "./contact/AdminContactPage";

// import '../../../public/avatar.png'

const activeStyles = {
  backgroundColor: "#1565c0",
  color: "#ffffff", // Màu chữ trắng
  fontSize: "0.99rem",
  borderRadius: "10px 0 0 10px",
  // transform: 'scale(1.1)'
};

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

  const [selectedMenuItem, setSelectedMenuItem] = useState("");

  return (
    <>
      <div style={{ display: "flex" }}>
        <Sidebar backgroundColor="none" collapsed={collapse} style={{ padding: 3 }}>
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
                  {localStorage.getItem("adminName")
                    ? localStorage.getItem("adminName")
                    : "Chưa đăng nhập"}
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
              // style={{ fontSize: "0.99rem" }}
              component={<Link to="/admin/dashboard" />}
              style={{
                ...(selectedMenuItem === "/admin/dashboard"
                  ? activeStyles
                  : {fontSize: '0.95rem'}), // Sử dụng activeStyles nếu MenuItem được chọn
              }}
              onClick={() => {
                setSelectedMenuItem("/admin/dashboard");
              }}
            >
              {" "}
              Tổng Quan{" "}
            </MenuItem>
            <MenuItem
              icon={<CategoryIcon />}
              style={{
                ...(selectedMenuItem === "/admin/categories"
                  ? activeStyles
                  : {fontSize: '0.95rem'}), // Sử dụng activeStyles nếu MenuItem được chọn
              }}
              onClick={() => {
                setSelectedMenuItem("/admin/categories");
              }}
              component={<Link to="/admin/categories" />}
            >
              {" "}
              Quản Lý Danh Mục{" "}
            </MenuItem>
            <MenuItem
              icon={<BrandingWatermarkIcon />}
              style={{
                ...(selectedMenuItem === "/admin/brands" ? activeStyles : {fontSize: '0.95rem'}), // Sử dụng activeStyles nếu MenuItem được chọn
              }}
              onClick={() => {
                setSelectedMenuItem("/admin/brands");
              }}
              component={<Link to="/admin/brands" />}
            >
              {" "}
              Quản Lý Thương Hiệu{" "}
            </MenuItem>
            <MenuItem
              icon={<FactoryIcon />}
              style={{
                ...(selectedMenuItem === "/admin/supplier" ? activeStyles : {fontSize: '0.95rem'}), // Sử dụng activeStyles nếu MenuItem được chọn
              }}
              onClick={() => {
                setSelectedMenuItem("/admin/supplier");
              }}
              component={<Link to="/admin/supplier" />}
            >
              Quản Lý Nhà Cung Cấp
            </MenuItem>
            <MenuItem
              icon={<PhoneAndroidIcon />}
              style={{
                ...(selectedMenuItem === "/admin/product" ? activeStyles : {fontSize: '0.95rem'}), // Sử dụng activeStyles nếu MenuItem được chọn
              }}
              onClick={() => {
                setSelectedMenuItem("/admin/product");
              }}
              component={<Link to="/admin/product" />}
            >
              Quản Lý Sản Phẩm
            </MenuItem>
            <MenuItem
              icon={<ImportExportIcon />}
              style={{
                ...(selectedMenuItem === "/admin/import" ? activeStyles : {fontSize: '0.95rem'}), // Sử dụng activeStyles nếu MenuItem được chọn
              }}
              onClick={() => {
                setSelectedMenuItem("/admin/import");
              }}
              component={<Link to="/admin/import" />}
            >
              {" "}
              Quản Lý Nhập/Xuất{" "}
            </MenuItem>
            <MenuItem
              icon={<InventoryIcon />}
              style={{
                ...(selectedMenuItem === "/admin/order" ? activeStyles : {fontSize: '0.95rem'}), // Sử dụng activeStyles nếu MenuItem được chọn
              }}
              onClick={() => {
                setSelectedMenuItem("/admin/order");
              }}
              component={<Link to="/admin/order" />}
            >
              {" "}
              Quản Lý Đơn Hàng{" "}
            </MenuItem>
            <MenuItem
              icon={<PreviewIcon />}
              style={{
                ...(selectedMenuItem === "/admin/review" ? activeStyles : {fontSize: '0.95rem'}), // Sử dụng activeStyles nếu MenuItem được chọn
              }}
              onClick={() => {
                setSelectedMenuItem("/admin/review");
              }}
              component={<Link to="/admin/review" />}
            >
              {" "}
              Quản Lý Đánh Giá{" "}
            </MenuItem>
            <MenuItem
              icon={<CommentIcon />}
              style={{
                ...(selectedMenuItem === "/admin/comment" ? activeStyles : {fontSize: '0.95rem'}), // Sử dụng activeStyles nếu MenuItem được chọn
              }}
              onClick={() => {
                setSelectedMenuItem("/admin/comment");
              }}
              component={<Link to="/admin/comment" />}
            >
              {" "}
              Quản Lý Bình Luận{" "}
            </MenuItem>
            <MenuItem
              icon={<ArticleIcon />}
              style={{
                ...(selectedMenuItem === "/admin/blog" ? activeStyles : {fontSize: '0.95rem'}), // Sử dụng activeStyles nếu MenuItem được chọn
              }}
              onClick={() => {
                setSelectedMenuItem("/admin/blog");
              }}
              component={<Link to="/admin/blog" />}
            >
              {" "}
              Quản Lý Bài Viết{" "}
            </MenuItem>
            <MenuItem
              icon={<ArticleIcon />}
              style={{
                ...(selectedMenuItem === "/admin/contact" ? activeStyles : {fontSize: '0.95rem'}), // Sử dụng activeStyles nếu MenuItem được chọn
              }}
              onClick={() => {
                setSelectedMenuItem("/admin/contact");
              }}
              component={<Link to="/admin/contact" />}
            >
              {" "}
              Quản Lý Liên Hệ{" "}
            </MenuItem>
            <SubMenu
              label="Quản Lý Tài Khoản"
              icon={<ManageAccountsOutlinedIcon />}
              // style={{
              //   ...(selectedMenuItem === "/admin/comment" ? activeStyles : {fontSize: '0.95rem'}), // Sử dụng activeStyles nếu MenuItem được chọn
              // }}
              // onClick={() => {
              //   setSelectedMenuItem("/admin/comment");
              // }}
            >
              <MenuItem
                icon={<Person3Icon />}
                
                style={{
                  ...(selectedMenuItem === "/admin/account/customer"
                    ? activeStyles
                    : {fontSize: '0.95rem'}), // Sử dụng activeStyles nếu MenuItem được chọn
                }}
                onClick={() => {
                  setSelectedMenuItem("/admin/account/customer");
                }}
                component={
                  <Link
                    to="/admin/account/customer"
                  />
                }
              >
                {" "}
                Khách hàng{" "}
              </MenuItem>
              <MenuItem
                rootStyles={{ background: "none" }}
                component={<Link to="/admin/account/shipper" />}
                icon={<TwoWheelerIcon />}
                style={{
                  ...(selectedMenuItem === "/admin/account/shipper"
                    ? activeStyles
                    : {fontSize: '0.95rem'}), // Sử dụng activeStyles nếu MenuItem được chọn
                }}
                onClick={() => {
                  setSelectedMenuItem("/admin/account/shipper");
                }}
              >
                {" "}
                Shipper{" "}
              </MenuItem>
              <MenuItem
                icon={<SupportAgentIcon />}
                style={{
                  ...(selectedMenuItem === "/admin/account/admin"
                    ? activeStyles
                    : {fontSize: '0.95rem'}), // Sử dụng activeStyles nếu MenuItem được chọn
                }}
                onClick={() => {
                  setSelectedMenuItem("/admin/account/admin");
                }}
                component={<Link to="/admin/account/admin" />}
              >
                {" "}
                Quản trị viên{" "}
              </MenuItem>
            </SubMenu>
          </Menu>
        </Sidebar>

        <div style={{ width: "100%", padding: 20 }}>
          <AdminTopBar />
          <Routes>
            <Route path="/admin" element={<AdminDashboard />} />
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
            <Route path="/comment" element={<CommentPage />} />
            <Route path="/blog" element={<AdminBlogPage />} />
            <Route path="/contact" element={<AdminContactPage />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default Admin;
