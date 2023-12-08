import * as React from "react";

import { useParams, useNavigate, Link } from "react-router-dom";

import { emphasize, styled } from "@mui/material/styles";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import SearchIcon from "@mui/icons-material/Search";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

import HomeIcon from "@mui/icons-material/Home";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {
  Box,
  Button,
  Grid,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getOrderByCustomerId, searchOrderHistory } from "../../../slices/orderSlice";
import OrderHistoryDetailComponent from "../../../components/customer/history/OrderHistoryDetailComponent";
import CancelOrderComponent from "../../../components/customer/history/CancelOrderComponent";
import ReviewOrderComponent from "../../../components/customer/history/ReviewOrderComponent";
import { fetchReviews } from "../../../slices/reviewSlice";

import { StyledBreadcrumb } from "../../../components/customize/CustomizeComponent";
import { useState } from "react";

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

  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getOrderByCustomerId(localStorage.getItem("customerID")));
    dispatch(fetchReviews());
  }, [dispatch]);

  const orderHistory = useSelector((state) => state.order.orderHistory);
  const reviews = useSelector((state) => state.review.reviews);

  const [searchText, setSearchText] = useState("");
  const handleSearch = (event) => {
    setSearchText(event.target.value);
    // Điều chỉnh logic tìm kiếm dựa trên searchText ở đây
    // Ví dụ: lọc danh sách sản phẩm theo searchText
  };

  const changeSearchData = (e) => {
    e.preventdefault;
    console.log(e.target.value);
    const searchData = { customerId: localStorage.getItem("customerID"), orderCode: e.target.value };
    dispatch(searchOrderHistory(searchData));
  };

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

      <Box sx={{ flexGrow: 1, padding: 2, height: "100%" }}>
        <Grid
          container
          alignItems="center"
          justifyContent="space-between"
          sx={{ paddingLeft: 3 }}
        >
          <Grid item>
            <h3>Lịch sử mua hàng</h3>
          </Grid>
          <Grid item xs={6} sm={4} md={3} lg={2}>
            {" "}
            {/* Điều chỉnh kích thước cho phù hợp */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <TextField
                id="search"
                label="Tìm kiếm"
                variant="outlined"
                // value={searchText}
                size="small"
                onChange={e=>{changeSearchData(e)}}
              />
              <IconButton>
                <SearchIcon />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
        {orderHistory.map((order) => (
          <Paper
            key={order.orderId}
            elevation={3}
            sx={{ padding: 2, marginTop: 2 }}
          >
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
                  <div>
                    Mã đơn hàng: {order.orderCode}
                    <IconButton
                      onClick={() =>
                        navigator.clipboard.writeText(order.orderCode)
                      }
                      aria-label="Copy order code"
                      size="small"
                    >
                      <ContentCopyIcon fontSize="small"/>
                    </IconButton>
                  </div>
                  <div>Thời gian đặt: {formatDateTime(order.orderTime)}</div>
                  <div>
                    Ngày dự kiến giao: {formatDateTime(order.orderShipExpected)}
                  </div>
                </Stack>
              </Grid>
              <Grid item xs={5}>
                <Stack spacing={3}>
                  <div>
                    Tổng tiền: {formatNumberWithCommas(order.orderTotalAmount)}đ
                  </div>
                  <div>
                    Trạng thái thanh toán:{" "}
                    {order.orderPaid != null
                      ? formatDateTime(order.orderPaid)
                      : "Chưa thanh toán"}
                  </div>
                  <div>
                    Tình trạng đơn hàng:{" "}
                    {order.orderStatus == 1 ? (
                      <Typography sx={{ color: "#3f51b5", display: "inline" }}>
                        Đang chờ xử lý
                      </Typography>
                    ) : order.orderStatus == 2 ? (
                      <Typography sx={{ color: "#b2a429", display: "inline" }}>
                        Đang chờ giao
                      </Typography>
                    ) : order.orderStatus == 3 ? (
                      <Typography sx={{ color: "#b23c17", display: "inline" }}>
                        Đang giao
                      </Typography>
                    ) : order.orderStatus == 4 ? (
                      <Typography sx={{ color: "#618833", display: "inline" }}>
                        Đã giao
                      </Typography>
                    ) : order.orderStatus == 5 ? (
                      <Typography sx={{ color: "#00a152", display: "inline" }}>
                        Đã hoàn thành
                      </Typography>
                    ) : order.orderStatus == -1 ? (
                      <Typography sx={{ color: "#ab003c", display: "inline" }}>
                        Đã hủy
                      </Typography>
                    ) : (
                      "Không xác định"
                    )}
                  </div>
                </Stack>
              </Grid>
              <Grid item xs={2}>
                <Stack spacing={2}>
                  <OrderHistoryDetailComponent order={order} />
                  {
                  order.orderConfirmed == null && order.orderCancelled == null ? (

                  <CancelOrderComponent order={order}/>)
                   : order.orderConfirmed == null && order.orderCancelled != null ? <Button disabled variant="error">Đã yêu cầu hủy</Button>
                   : ""
                   }
                  <ReviewOrderComponent order={order} />
                </Stack>
              </Grid>
            </Grid>
          </Paper>
        ))}
      </Box>
    </>
  );
}
