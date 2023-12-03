import * as React from "react";

import { useParams, useNavigate, Link } from "react-router-dom";

import { emphasize, styled } from "@mui/material/styles";
import Breadcrumbs from "@mui/material/Breadcrumbs";

import HomeIcon from "@mui/icons-material/Home";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Box, Button, Grid, Paper, Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getOrderByCustomerId } from "../../../slices/orderSlice";
import OrderHistoryDetailComponent from "../../../components/customer/history/OrderHistoryDetailComponent";
import CancelOrderComponent from "../../../components/customer/history/CancelOrderComponent";
import ReviewOrderComponent from "../../../components/customer/history/ReviewOrderComponent";
import { fetchReviews } from "../../../slices/reviewSlice";

import { StyledBreadcrumb } from "../../../components/customize/CustomizeComponent";

function formatNumberWithCommas(input) {
  if (typeof input === "number" && Number.isInteger(input))
    input = input.toString();
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
    dispatch(getOrderByCustomerId(localStorage.getItem("customerID")));
    dispatch(fetchReviews());
  }, [dispatch]);

  const orderHistory = useSelector((state) => state.order.orderHistory);
  const reviews = useSelector((state) => state.review.reviews);

  return (
    <>
      <Breadcrumbs aria-label="breadcrumb" sx={{ marginLeft: 3 }}>
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
          icon={<ShoppingCartIcon fontSize="small" />}
        />
      </Breadcrumbs>

      <Box sx={{ flexGrow: 1, padding: 2, height: '80vh' }}>
        <h3>Lịch sử mua hàng</h3>
        {orderHistory.map((order) => (
          <Paper key={order.orderId} elevation={3} sx={{ padding: 2, marginTop: 2 }}>
            <Grid
              container
              spacing={1}
              direction="row"
              justifyContent="flex-start"
              alignItems="flex-start"
              //   spacing={10}
            >
              <Grid item xs={5}>
                <Stack spacing={3}>
                  <div>Mã đơn hàng: {order.orderCode}</div>
                  <div>Thời gian đặt: {formatDateTime(order.orderTime)}</div>
                  <div>Ngày dự kiến giao: {formatDateTime(order.orderShipExpected)}</div>
                </Stack>
              </Grid>
              <Grid item xs={5}>
                <Stack spacing={3}>
                  <div>Tổng tiền: {formatNumberWithCommas(order.orderTotalAmount)}đ</div>
                  <div>
                    Trạng thái thanh toán:{" "}
                    {order.orderPaid != null
                      ? formatDateTime(order.orderPaid)
                      : "Chưa thanh toán"}
                  </div>
                  <div>
                    Tình trạng đơn hàng:{" "}
                    {order.orderStatus == 1 ? (
                      <span style={{ color: "orange" }}>Đang chờ xử lý</span>
                    ) : order.orderStatus == 2 ? (
                      <span style={{ color: "orange" }}>Đang chờ giao</span>
                    ) : order.orderStatus == 3 ? (
                      "Đang giao"
                    ) : order.orderStatus == 4 ? (
                      <span style={{ color: "green" }}>Đã giao</span>
                    ) : order.orderStatus == 5 ? (
                      <span style={{ color: "green" }}>Hoàn thành</span>
                    ) : order.orderStatus == -1 ? (
                      <span style={{ color: "red" }}>Đã hủy</span>
                    ) : ("Không xác định")}
                  </div>
                </Stack>
              </Grid>
              <Grid item xs={2}>
                <Stack spacing={2}>
                  <OrderHistoryDetailComponent order={order}/>
                  {order.orderConfirmed == null ?
                    <CancelOrderComponent />
                    :
                    ""
                  }
                  <ReviewOrderComponent order={order}/>
                </Stack>
              </Grid>
            </Grid>
          </Paper>
        ))}
      </Box>
    </>
  );
}
