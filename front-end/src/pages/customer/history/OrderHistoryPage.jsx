import * as React from "react";

import { useParams, useNavigate, Link } from "react-router-dom";

import { emphasize, styled } from "@mui/material/styles";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Chip from "@mui/material/Chip";
import HomeIcon from "@mui/icons-material/Home";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Box, Button, Grid, Paper, Stack, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getCustomerInfo } from "../../../slices/customerSlice";
import { useEffect } from "react";
import Badge from "@mui/material/Badge";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import IconButton from "@mui/material/IconButton";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";
import PaymentIcon from "@mui/icons-material/Payment";
import { calcCart, fetchCartDetail } from "../../../slices/cartSlice";
import AddAddressComponent from "../../../components/customer/address/AddAddressComponent";
import {
  fetchAddresses,
  getDefaultAddress,
} from "../../../slices/addressSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import ConfirmDeleteAddress from "../../../components/customer/address/ConfirmDeleteAddress";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useState } from "react";
import EditAddressComponent from "../../../components/customer/address/EditAddressComponent";
import { fetchPayments } from "../../../slices/paymentSlice";
import { createOrder, getOrderByCustomerId } from "../../../slices/orderSlice";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";


const StyledBreadcrumb = styled(Chip)(({ theme }) => {
    const backgroundColor =
      theme.palette.mode === "light"
        ? theme.palette.grey[200]
        : theme.palette.grey[800];
    return {
      backgroundColor,
      height: theme.spacing(3),
      color: theme.palette.text.primary,
      fontWeight: theme.typography.fontWeightRegular,
      "&:hover, &:focus": {
        backgroundColor: emphasize(backgroundColor, 0.06),
      },
      "&:active": {
        boxShadow: theme.shadows[1],
        backgroundColor: emphasize(backgroundColor, 0.12),
      },
    };
  });

  function formatNumberWithCommas(input) {
    if (typeof input === "number" && Number.isInteger(input)) input = input.toString();
    if (typeof input !== "string") return "Invalid input";
    if (!/^\d+$/.test(input)) return "Invalid input";
    return input.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

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

export default function OrderHistoryPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrderByCustomerId(sessionStorage.getItem("customerID")));
  }, [dispatch]);

  const orderHistory = useSelector((state) => state.order.orderHistory);

  return (
    <>
    <Breadcrumbs aria-label="breadcrumb" sx={{ margin: 3 }}>
        <StyledBreadcrumb
          label="Trang chủ"
          component="a"
          // href="#"
          onClick={() => {
            navigate("/");
          }}
          icon={<HomeIcon fontSize="small" />}
        />
        <StyledBreadcrumb
          label="Lịch sử mua hàng"
          component="a"
          //   href="#"
        //   onClick={() => {
        //     navigate(`/cart/${customerId}`);
        //   }}
          icon={<ShoppingCartIcon fontSize="small" />}
        />
        {/* <StyledBreadcrumb
          label="Thanh toán"
          // component="a"
          icon={<ShoppingCartCheckoutIcon fontSize="small" />}
        /> */}
      </Breadcrumbs>
      
      <Box sx={{ flexGrow: 1, padding: 2 }}>
      <h3>Lịch sử mua hàng</h3>
      {orderHistory.map((order) => (
      <Paper elevation={3} sx={{ padding: 2, marginTop: 2 }}>
        <Grid
            container
            spacing={1}
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
            //   spacing={10}
          >
            <Grid item xs={6}>
          <Stack spacing={3}>
            <div>Mã đơn hàng: {order.orderCode}</div>
            <div>Thời gian đặt: {formatDateTime(order.orderTime)}</div>
            <div>Ngày dự kiến giao: {formatDateTime(order.orderShipExpected)}</div>
            
          </Stack></Grid>
          <Grid item xs={6}>
          <Stack spacing={3}>
            
            <div>Tổng tiền: {formatNumberWithCommas(order.orderTotalAmount)}đ</div>
            <div>Trạng thái thanh toán: {order.orderPaid != null
                    ? formatDateTime(order.orderPaid)
                    : "Chưa thanh toán"}</div>
            <div>
              Tình trạng đơn hàng:{" "}
              {order.orderStatus == 1
                ? <span style={{color: 'orange'}}>Đang chờ xử lý</span>
                : order.orderStatus == 2
                ? <span style={{color: 'orange'}}>Đang chờ giao</span>
                : order.orderStatus == 3
                ? "Đã giao"
                : order.orderStatus == 4
                ? "Đã hoàn thành"
                : "Đã hủy"}
            </div>
          </Stack></Grid>
          </Grid>
      </Paper>))}</Box>
    </>
  );
}
