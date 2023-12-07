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
  import { fetchOrderByShipper } from "../../slices/shipperSlice";
  import StartShipComponent from "../../components/shipper/StartShipComponent";
  import ShippedComponent from "../../components/shipper/ShippedComponent";
  import OrderDetailShipperComponent from "../../components/shipper/OrderDetailShipperComponent";
  import { useState } from "react";
  import { Route, Routes, useNavigate } from "react-router-dom";
  import FilterShipperTable from "../../components/shipper/FilterShipperTable";
  import ShipperInformationPage from "./ShipperInformationPage";
  import ContentCopyIcon from '@mui/icons-material/ContentCopy';
  
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
  
  export default function ShipperTable() {
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
  
    return (
      <>
        
        <Box  sx={{padding: 2}}>
        <FilterShipperTable />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align="left">Khách hàng</TableCell>
                <TableCell align="right">Số điện thoại</TableCell>
                <TableCell align="left">Mã đơn hàng</TableCell>
                <TableCell align="right">Tổng tiền</TableCell>
                <TableCell align="left">Hình thức thanh toán</TableCell>
                <TableCell align="left">Thanh toán</TableCell>
                <TableCell align="left">Ghi chú</TableCell>
                <TableCell align="left">Trạng thái</TableCell>
                <TableCell align="center">Thao Tác</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <TableRow
                  key={order.orderId}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    #{order.orderId}
                  </TableCell>
                  <TableCell align="left">{order.user.userName}</TableCell>
                  <TableCell align="right">
                    {order.orderPhone}
                  </TableCell>
                  <TableCell align="left">{order.orderCode}
                  <IconButton
                    onClick={() =>
                      navigator.clipboard.writeText(order.orderCode)
                    }
                    aria-label="Copy order code"
                    size="small"
                  >
                    <ContentCopyIcon fontSize="small" />
                  </IconButton>
                  </TableCell>
                  <TableCell align="right">
                    {formatNumberWithCommas(order.orderTotalAmount)}đ
                  </TableCell>
                  <TableCell align="left">{order.payment.paymentName}</TableCell>
                  <TableCell align="left">
                    {order.orderPaid == null ? "Chưa" : "Đã thanh toán"}
                  </TableCell>
                  <TableCell align="left">{order.orderNote}</TableCell>
                  <TableCell align="left">
                  { order.orderStatus == 1 ? <Typography variant="body1" sx={{color: '#3f51b5'}}>Đang chờ xử lý</Typography>
                      : order.orderStatus == 2 ? <Typography variant="body1" sx={{color: '#b2a429'}}>Đang chờ giao</Typography>
                      : order.orderStatus == 3 ? <Typography variant="body1" sx={{color: '#b23c17'}}>Đang giao</Typography>
                      : order.orderStatus == 4 ? <Typography variant="body1" sx={{color: '#618833'}}>Đã giao</Typography>
                      : order.orderStatus == 5 ? <Typography variant="body1" sx={{color: '#00a152'}}>Đã hoàn thành</Typography>
                      : order.orderStatus == -1 ? <Typography variant="body1" sx={{color: '#ab003c'}}>Đã hủy</Typography>
                      : "Không xác định"}
                  </TableCell>
                  <TableCell align="center">
                      <Stack spacing={2}>
                      {order.orderStatus == 2 ? <StartShipComponent order={order} /> : order.orderStatus == 3 ? <ShippedComponent order={order} /> : ""}
                      <OrderDetailShipperComponent order={order} /></Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        </Box>
      </>
    );
  }
  