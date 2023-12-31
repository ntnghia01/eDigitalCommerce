import {
  Avatar,
  Badge,
  Box,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useColorScheme } from "@mui/material/styles";

import Paper from "@mui/material/Paper";

import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import Stack from "@mui/material/Stack";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrder } from "../../slices/orderSlice";
import { useEffect } from "react";
import { fetchOrderByShipper, searchOrderByShipperID } from "../../slices/shipperSlice";
import StartShipComponent from "../../components/shipper/StartShipComponent";
import ShippedComponent from "../../components/shipper/ShippedComponent";
import OrderDetailShipperComponent from "../../components/shipper/OrderDetailShipperComponent";
import { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import FilterShipperTable from "../../components/shipper/FilterShipperTable";
import ShipperInformationPage from "./ShipperInformationPage";
import ShipperTable from "./ShipperTable";

// import "../../../public/avatar.png";

const formatDateTime = (oriDateTime) => {
  const dateTime = new Date(oriDateTime);
  const date = dateTime.getDate();
  const month = dateTime.getMonth() + 1;
  const year = dateTime.getFullYear();
  const hour = dateTime.getHours();
  const minute = dateTime.getMinutes();
  const second = dateTime.getSeconds();

  const newDateTime = `${date < 10 ? "0" : ""}${date}-${
    month < 10 ? "0" : ""
  }${month}-${year} ${hour < 10 ? "0" : ""}${hour}:${
    minute < 10 ? "0" : ""
  }${minute}:${second < 10 ? "0" : ""}${second}`;
  return newDateTime;
};

function formatNumberWithCommas(input) {
  if (typeof input === "number" && Number.isInteger(input))
    input = input.toString();
  if (typeof input !== "string") return "Invalid input";
  if (!/^\d+$/.test(input)) return "Invalid input";
  return input.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export default function Shipper() {
  const { mode, setMode } = useColorScheme();
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.shipper.orderByShipper);

  useEffect(() => {
    dispatch(fetchOrderByShipper(localStorage.getItem("shipperID")));
  }, [dispatch]);

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const navigate = useNavigate();

  const handleSignout = () => {
    localStorage.removeItem("shipperID");
    localStorage.removeItem("shipperName");
    localStorage.removeItem("shipperToken");

    handleCloseUserMenu();
    navigate("/shipper/login")
  };


  const changeSearchData = (e) => {
    e.preventdefault;
    console.log(e.target.value);
    const searchData = { shipperId: localStorage.getItem("shipperID"), orderCode: e.target.value };
    dispatch(searchOrderByShipperID(searchData));
  };

  return (
    <>
      <Box sx={{ flexGrow: 1, padding: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={6} md={8}>
            <Box sx={{ display: "flex", alignItems: "flex-end" }}>
              <SearchIcon
                sx={{ color: "action.active", mr: 1, my: 0.5, fontSize: 40 }}
              />
              <TextField
                id="input-with-sx"
                label="Tìm kiếm"
                variant="outlined"
                style={{ width: "100%" }}
                onChange={e=>{changeSearchData(e)}}
              />
            </Box>
          </Grid>
          <Grid
            item
            xs={6}
            md={4}
            container
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
          >
            <Stack direction="row" spacing={3}>
              {mode === "light" ? (
                <DarkModeOutlinedIcon
                  style={{ cursor: "pointer" }}
                  fontSize="large"
                  onClick={() => {
                    setMode(mode === "light" ? "dark" : "light");
                  }}
                />
              ) : (
                <LightModeOutlinedIcon
                  style={{ cursor: "pointer" }}
                  fontSize="large"
                  onClick={() => {
                    setMode(mode === "light" ? "dark" : "light");
                  }}
                />
              )}
              {/* <Tooltip title="Thông báo">
                <Badge color="secondary" badgeContent={3}>
                  <NotificationsActiveOutlinedIcon
                    style={{ cursor: "pointer" }}
                    fontSize="large"
                  />
                </Badge>
              </Tooltip> */}
              <Tooltip title="Cài đặt">
                <Badge color="secondary" variant="dot">
                  <SettingsOutlinedIcon
                    style={{ cursor: "pointer" }}
                    fontSize="large"
                  />
                </Badge>
              </Tooltip>
              <Box sx={{ flexGrow: 0, marginLeft: 2 }}>
              <Tooltip title="Tài khoản">
              <IconButton
                    onClick={handleOpenUserMenu}
                    sx={{ p: 0, marginLeft: 1 }}
                  >
                <Avatar
                  alt="Remy Sharp"
                  src="../../../public/AvarShipper.jpg"
                  style={{ cursor: "pointer" }}
                />
                </IconButton>
              </Tooltip>
              <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {/* {settings.map((setting) => (
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  ))} */}
                  <MenuItem>
                  
                  <Typography
                    textAlign="center"
                    onClick={() => {
                      navigate("/shipper")
                      handleCloseUserMenu();
                    }}
                  >
                    Trang chủ
                  </Typography>
                </MenuItem>
                  <MenuItem>
                  
                    <Typography
                      textAlign="center"
                      onClick={() => {
                        navigate("/shipper/info")
                        handleCloseUserMenu();
                      }}
                    >
                      Thông tin cá nhân
                    </Typography>
                  </MenuItem>
                  <MenuItem onClick={() => handleSignout()}>
                    <Typography textAlign="center">Đăng xuất</Typography>
                  </MenuItem>
                </Menu>
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </Box>
      <Box  sx={{padding: 2}}>

      <Routes>

        <Route path="/info" element={<ShipperInformationPage />} />
        <Route path="/" element={<ShipperTable />} />
      </Routes>
      
      </Box>
    </>
  );
}
