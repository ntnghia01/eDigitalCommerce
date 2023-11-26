import * as React from "react";

// import Redux
import { useSelector, useDispatch } from "react-redux";

// import MUI
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from '@mui/material/Typography';

import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import { fetchImports } from "../../../slices/importSlice";
import { fetchOrder, getOrderDetailByOrderId } from "../../../slices/orderSlice";
import { useEffect } from "react";
import { fetchReviews } from "../../../slices/reviewSlice";

const formatDateTime = (oriDateTime) => {
    const dateTime = new Date(oriDateTime);
    const date = dateTime.getDate();
    const month = dateTime.getMonth() + 1;
    const year = dateTime.getFullYear();
    const hour = dateTime.getHours();
    const minute = dateTime.getMinutes();
    const second = dateTime.getSeconds();

    const newDateTime = `${date < 10 ? '0' : ''}${date}-${month < 10 ? '0' : ''}${month}-${year} ${hour < 10 ? '0' : ''}${hour}:${minute < 10 ? '0' : ''}${minute}:${second < 10 ? '0' : ''}${second}`;
    return newDateTime;
}

function formatNumberWithCommas(input) {
    if (typeof input === "number" && Number.isInteger(input)) input = input.toString();
    if (typeof input !== "string") return "Invalid input";
    if (!/^\d+$/.test(input)) return "Invalid input";
    return input.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
  

export default function ReviewTableComponent() {
    console.log("check render ReviewTableComponent");

    const dispatch = useDispatch();
    const reviews = useSelector((state) => state.review.reviews);

    useEffect(() => {
        dispatch(fetchReviews());
    }, [dispatch]);
    // console.log(products);

    
    return (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align="left">Thời điểm đánh giá</TableCell>
                <TableCell align="left">Đơn hàng</TableCell>
                <TableCell align="right">Mức đánh giá</TableCell>
                <TableCell align="left">Nội dung</TableCell>
                <TableCell align="left">Người đánh giá</TableCell>
                <TableCell align="center">Thao Tác</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reviews.map((review) => (
                <TableRow
                  key={review.reviewId}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">{review.reviewId}</TableCell>
                  <TableCell align="left">{review.reviewTime}</TableCell>
                  <TableCell align="left">{review.order.orderCode}</TableCell>
                  <TableCell align="right">{review.reviewRate}</TableCell>
                  {/* <TableCell align="right">{formatDateTime(order.orderShipExpected)}</TableCell> */}
                  <TableCell align="left">{review.reviewContent}</TableCell>
                  {/* <TableCell align="left">{order.admin==null?'Trống':order.admin.adminName}</TableCell> */}
                  <TableCell align="left">{review.user.userName}</TableCell>
                  <TableCell align="center">
                    {/* <Stack spacing={2}> */}
                    
                      {/* <ConfirmPayment order={order} /> */}
                        <Button>Chi tiết</Button>
                    {/* </Stack> */}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
    )
}