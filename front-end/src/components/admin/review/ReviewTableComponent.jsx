import * as React from "react";

// import Redux
import { useSelector, useDispatch } from "react-redux";

// import MUI
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';

import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import RateReviewIcon from '@mui/icons-material/RateReview';

import { fetchImports } from "../../../slices/importSlice";
import { fetchOrder, getOrderDetailByOrderId } from "../../../slices/orderSlice";
import { useEffect } from "react";
import { fetchReviews } from "../../../slices/reviewSlice";
import ReviewDetailComponent from "./ReviewDetailComponent";
import { formatDateTime, Alert, formatNumberWithCommas } from "../../customize/CustomizeComponent";
import { useState } from "react";
  

export default function ReviewTableComponent() {
    console.log("check render ReviewTableComponent");

    const dispatch = useDispatch();
    const reviews = useSelector((state) => state.review.reviews);

    useEffect(() => {
        dispatch(fetchReviews());
    }, [dispatch]);
    // console.log(products);

    const [selectedReview, setSelectedReview] = useState(null);

    
    return (
      <>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align="left">Thời điểm đánh giá</TableCell>
                <TableCell align="left">Đơn hàng</TableCell>
                <TableCell align="left">Mức đánh giá</TableCell>
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
                  <TableCell component="th" scope="row">#{review.reviewId}</TableCell>
                  <TableCell align="left">{review.reviewTime}</TableCell>
                  <TableCell align="left">{review.order.orderCode}</TableCell>
                  <TableCell align="left"><Rating readOnly name="simple-controlled" value={review.reviewRate}/></TableCell>
                  {/* <TableCell align="right">{formatDateTime(order.orderShipExpected)}</TableCell> */}
                  <TableCell align="left">{review.reviewContent}</TableCell>
                  {/* <TableCell align="left">{order.admin==null?'Trống':order.admin.adminName}</TableCell> */}
                  <TableCell align="left">{review.user.userName}</TableCell>
                  <TableCell align="center">
                    {/* <Stack spacing={2}> */}
                    
                      {/* <ConfirmPayment order={order} /> */}
                        {/* <Button>Chi tiết</Button> */}
                        <Button size="small" variant="outlined" startIcon={<RateReviewIcon />} onClick={() => setSelectedReview(review)}>Xem chi tiết</Button>
                    {/* </Stack> */}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {
          selectedReview && (
            <ReviewDetailComponent review={selectedReview} onClose={() => setSelectedReview(null)}/>
          )
        }
      </>
    )
}