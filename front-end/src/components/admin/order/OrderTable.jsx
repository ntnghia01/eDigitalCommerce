import * as React from "react";

// import Redux
import { useSelector, useDispatch } from "react-redux";

// import MUI
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from '@mui/material/Typography';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

import { green, yellow, blue, red, purple, grey } from '@mui/material/colors';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DepartureBoardIcon from '@mui/icons-material/DepartureBoard';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import NoCrashIcon from '@mui/icons-material/NoCrash';
import CancelIcon from '@mui/icons-material/Cancel';

import PriceCheckIcon from '@mui/icons-material/PriceCheck';

import {
  Avatar,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import { fetchImports } from "../../../slices/importSlice";
import { fetchOrder, getOrderDetailByOrderId } from "../../../slices/orderSlice";
import OrderDetail from "./OrderDetail";
import ConfirmPayment from "./ConfirmPayment";
import { useState } from "react";

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
  

export default function OrderTable() {
  console.log("OrderTable");

    const dispatch = useDispatch();
    const orders = useSelector((state) => state.order.orders);

    React.useEffect(() => {
        dispatch(fetchOrder());
    }, [dispatch]);
    // console.log(products);

    const [selectedOrder, setSelectedOrder] = useState(null);
    
    return (
      <>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align="left">Khách hàng</TableCell>
                <TableCell align="left">Mã đơn hàng</TableCell>
                <TableCell align="right">Thời gian đặt</TableCell>
                {/* <TableCell align="right">Dự kiến giao</TableCell> */}
                <TableCell align="right">Tổng tiền</TableCell>
                {/* <TableCell align="left">Người duyệt</TableCell> */}
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
                  <TableCell component="th" scope="row">#{order.orderId}</TableCell>
                  <TableCell align="left">{order.user.userName}</TableCell>
                  <TableCell align="left">{order.orderCode}<IconButton
                      onClick={() =>
                        navigator.clipboard.writeText(order.orderCode)
                      }
                      aria-label="Copy order code"
                      size="small"
                    >
                      <ContentCopyIcon fontSize="small"/>
                    </IconButton></TableCell>
                  <TableCell align="right">{formatDateTime(order.orderTime)}</TableCell>
                  {/* <TableCell align="right">{formatDateTime(order.orderShipExpected)}</TableCell> */}
                  <TableCell align="right">{formatNumberWithCommas(order.orderTotalAmount)}đ</TableCell>
                  {/* <TableCell align="left">{order.admin==null?'Trống':order.admin.adminName}</TableCell> */}
                  <TableCell align="left">{order.payment.paymentName}</TableCell>
                  <TableCell align="left">
                    {order.orderPaid==null?'Chưa':'Đã thanh toán'}
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
                    {/* <Stack spacing={2}> */}
                    
                      {/* <ConfirmPayment order={order} /> */}
                      <Button
                        onClick={() => {
                          setSelectedOrder(order);
                          dispatch(getOrderDetailByOrderId(order.orderId));
                        }}
                      >
                        Xem chi tiết
                      </Button>
                    {/* </Stack> */}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {
          selectedOrder && (
            <OrderDetail order={selectedOrder} onClose={() => setSelectedOrder(null)} />
          )
        }
        </>
    )
}