import CustomerTopBar from "../../components/customer/CustomerTopBar";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import ProductListComponent from "./ProductListComponent";
import ProductDetail from "./ProductDetail";
import { BrowserRouter, Route, Routes, Link, useNavigate } from "react-router-dom";
import CustomerLoginPage from "./login";
import CustomerSignupPage from "./signup";
import Cart from "./cart";
import CheckoutPage from "./checkout/CheckoutPage";

import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import FileCopyIcon from "@mui/icons-material/FileCopyOutlined";
import SaveIcon from "@mui/icons-material/Save";
import PrintIcon from "@mui/icons-material/Print";
import ShareIcon from "@mui/icons-material/Share";
import OrderHistoryPage from "./history/OrderHistoryPage";
import SuccessfulPaymentPage from "./success/SuccessfulPaymentPage";
import PersonalPage from "./personal/PersonalPage";
import { AppBar, Button, Stack, Switch, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import TelegramIcon from '@mui/icons-material/Telegram';
import CallIcon from '@mui/icons-material/Call';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import CategoryListComponent from "../../components/customer/CategoryListComponent";
import BrandListComponent from "../../components/customer/BrandListComponent";
import SlideShowComponent from "../../components/customer/SlideShowComponent";
import BlogPage from "./blog/BlogPage";
import ContactPage from "./contact/ContactPage";
import LookupPage from "./lookup/LookupPage";
import BlogDetailPage from "./blog/BlogDetailPage";

const actions = [
  { icon: <FileCopyIcon />, name: "Copy" },
  { icon: <SaveIcon />, name: "Save" },
  { icon: <PrintIcon />, name: "Print" },
  { icon: <ShareIcon />, name: "Share" },
];

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function CustomerPage() {
  console.log("Check render");
  const [inputValue, setInputChat] = useState('');
  const isHomepage = window.location.href === "http://localhost:5173";
  const navigate = useNavigate();
  return (
    <>
      <Box sx={{ flexGrow: 1, backgroundColor: "#f5f5f5" }}>
        
        <CustomerTopBar />
        <CategoryListComponent key={1}/>
        <BrandListComponent key={2}/>
        <Routes>
              <Route path="/" element={<SlideShowComponent />} />
            </Routes>
        {/* <SlideShowComponent key={3}/> */}
        <Grid container spacing={2} sx={{marginTop: 1}}>
          <Grid item xs={2} sm={0} md={0} lg={0}></Grid>
          <Grid
            item
            xs={8}
            sx={{ backgroundColor: "white" }}
            style={{ paddingLeft: 0 }}
          >

            <Routes>
              <Route path="/" element={<ProductListComponent />} />
              <Route path="/login" element={<CustomerLoginPage />} />
              <Route path="/signup" element={<CustomerSignupPage />} />
              <Route path="/product/detail/:proId" element={<ProductDetail />} />
              <Route path="/cart/:customerId" element={<Cart />} />
              <Route path="/checkout/:customerId" element={<CheckoutPage />} />
              <Route path="/history/:customerId" element={<OrderHistoryPage />} />
              <Route path="/successfulpayment" element={<SuccessfulPaymentPage />} />
              <Route path="/personal" element={<PersonalPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/lookup" element={<LookupPage />} />
              <Route path="/blog/:blogId" element={<BlogDetailPage />} />
            </Routes>
            
            <Box>
              <Grid container backgroundColor={"#f5f5f5"}  sx={{padding: 3}}>
                <Grid item xs={12} sm={4}>
                  <Stack spacing={0}>
                    <img
                      alt="LOGO"
                      src="../../../public/logo2.png"
                      style={{ cursor: "pointer", width: 70, padding: 5, borderRadius: 100 }}
                      onClick={() => navigate("/")}
                    />
                    <Typography variant="body1"
                      sx={{
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          fontSize: '1.2em', // Kích thước chữ lớn hơn khi hover
                          color: 'blue', // Đổi màu chữ thành xanh khi hover
                          cursor: 'pointer', // Thay đổi con trỏ chuột khi hover
                        },
                      }}>Chính sách sử dụng</Typography>
                    <Typography variant="body1"
                      sx={{
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          fontSize: '1.2em', // Kích thước chữ lớn hơn khi hover
                          color: 'blue', // Đổi màu chữ thành xanh khi hover
                          cursor: 'pointer', // Thay đổi con trỏ chuột khi hover
                        },
                      }}>Điều khoản sử dụng</Typography>
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Stack spacing={2}>
                    <Typography variant="body2"><CallIcon />  0559303471</Typography>
                    <Typography variant="body2"><LocationOnIcon />  Đường 3/2, Xuân Khánh, Ninh Kiều - TP.Cần Thơ</Typography>
                    <Typography variant="body2"><EmailIcon />  nghiab1910265@student.ctu.edu.vn</Typography>
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Stack spacing={2}>
                    <Box
                      onClick={() => {
                        navigate("/contact");
                      }}
                      sx={{
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          fontSize: '1.2em', // Kích thước chữ lớn hơn khi hover
                          color: 'blue', // Đổi màu chữ thành xanh khi hover
                          cursor: 'pointer', // Thay đổi con trỏ chuột khi hover
                        },
                      }}
                    >
                      Gửi liên hệ
                    </Box>
                    <div>Hoặc kết nối với chúng tôi</div>
                    <Stack direction="row" spacing={2}>
                      <FacebookIcon sx={{
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          fontSize: '3em', // Kích thước chữ lớn hơn khi hover
                          color: 'blue', // Đổi màu chữ thành xanh khi hover
                          cursor: 'pointer', // Thay đổi con trỏ chuột khi hover
                        },
                      }}/>
                      <InstagramIcon sx={{
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          fontSize: '3em', // Kích thước chữ lớn hơn khi hover
                          color: 'blue', // Đổi màu chữ thành xanh khi hover
                          cursor: 'pointer', // Thay đổi con trỏ chuột khi hover
                        },
                      }}/>
                      <TwitterIcon sx={{
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          fontSize: '3em', // Kích thước chữ lớn hơn khi hover
                          color: 'blue', // Đổi màu chữ thành xanh khi hover
                          cursor: 'pointer', // Thay đổi con trỏ chuột khi hover
                        },
                      }}/>
                      <TelegramIcon sx={{
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          fontSize: '3em', // Kích thước chữ lớn hơn khi hover
                          color: 'blue', // Đổi màu chữ thành xanh khi hover
                          cursor: 'pointer', // Thay đổi con trỏ chuột khi hover
                        },
                      }}/>
                      </Stack>
                  </Stack>
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid item xs={2} sm={0}></Grid>
        </Grid>
      </Box>





      <Box sx={{ position: "relative" }}>
        <Box
          sx={{
            position: "fixed",
            bottom: 16,
            right: 16,
            zIndex: 1,
          }}
        >
          <SpeedDial
            ariaLabel="SpeedDial basic example"
            icon={<SpeedDialIcon />}
          >
            {actions.map((action) => (
              <SpeedDialAction
                key={action.name}
                icon={action.icon}
                tooltipTitle={action.name}
              />
            ))}
          </SpeedDial>
        </Box>
      </Box>
    </>
  );
}
