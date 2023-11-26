import {
  Avatar,
  Badge,
  Box,
  Grid,
  IconButton,
  TextField,
  Tooltip,
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

              <Tooltip title="Tài khoản">
                <Avatar
                  alt="Remy Sharp"
                  src="../../../public/AvarShipper.jpg"
                  style={{ cursor: "pointer" }}
                />
              </Tooltip>
            </Stack>
          </Grid>
        </Grid>
      </Box>
      <Box  sx={{padding: 2}}>

      
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
                  {order.orderId}
                </TableCell>
                <TableCell align="left">{order.user.userName}</TableCell>
                <TableCell align="right">
                  {order.orderPhone}
                </TableCell>
                <TableCell align="left">{order.orderCode}</TableCell>
                <TableCell align="right">
                  {formatNumberWithCommas(order.orderTotalAmount)}đ
                </TableCell>
                <TableCell align="left">{order.payment.paymentName}</TableCell>
                <TableCell align="left">
                  {order.orderPaid == null ? "Chưa" : "Đã thanh toán"}
                </TableCell>
                <TableCell align="left">{order.orderNote}</TableCell>
                <TableCell align="left">
                  { order.orderStatus == 1 ? "Đang chờ xử lý"
                    : order.orderStatus == 2 ? "Đang chờ giao"
                    : order.orderStatus == 3 ? "Đang giao"
                    : order.orderStatus == 4 ? "Đã giao"
                    : order.orderStatus == 5 ? "Đã hoàn thành"
                    : order.orderStatus == -1 ? "Đã hủy"
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
      </TableContainer></Box>
    </>
  );
}
