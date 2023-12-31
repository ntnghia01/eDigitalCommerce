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
import { fetchComments } from "../../../slices/commentSlice";
import DisableCommentComponent from "./DisableCommentComponent";
import ActiveCommentComponent from "./ActiveCommentComponent";

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
  

export default function CommentTableComponent() {
    console.log("check render ReviewTableComponent");

    const dispatch = useDispatch();
    const comments = useSelector((state) => state.comment.comments);

    useEffect(() => {
        dispatch(fetchComments());
    }, [dispatch]);
    // console.log(products);

    
    return (<>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align="left">Thời điểm bình luận</TableCell>
                <TableCell align="left">Sản phẩm</TableCell>
                <TableCell align="left">Nội dung</TableCell>
                <TableCell align="left">Người bình luận</TableCell>
                <TableCell align="left">Trạng thái</TableCell>
                <TableCell align="center">Thao Tác</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {comments.map((comment) => (
                <TableRow
                  key={comment.cmtId}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">#{comment.cmtId}</TableCell>
                  <TableCell align="left">{comment.cmtTime}</TableCell>
                  <TableCell align="left">{comment.product.proName}</TableCell>
                  {/* <TableCell align="right">{formatDateTime(order.orderShipExpected)}</TableCell> */}
                  <TableCell align="left">{comment.cmtContent}</TableCell>
                  {/* <TableCell align="left">{order.admin==null?'Trống':order.admin.adminName}</TableCell> */}
                  <TableCell align="left">{comment.user.userName}</TableCell>
                  <TableCell align="left">
                    {comment.cmtStatus==1?<Typography variant="body1" sx={{color: '#00a152'}}>Hiển thị</Typography>
                    : <Typography variant="body1" sx={{color: '#b23c17'}}>Đã ẩn</Typography>}
                  </TableCell>
                  <TableCell align="center">
                    {comment.cmtStatus==1 ?
                        <DisableCommentComponent comment={comment} />
                    : comment.cmtStatus==0 ?
                        <ActiveCommentComponent comment={comment} />
                    : "Không xác định"
                    }
                    
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        </>
    )
}