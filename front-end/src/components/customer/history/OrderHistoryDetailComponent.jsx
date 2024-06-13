import InfoIcon from '@mui/icons-material/Info';

import * as React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from '@mui/icons-material/Check';
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

// import Icons
import AddIcon from "@mui/icons-material/Add";
import { Grid, InputAdornment, Stack, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getOrderDetailByOrderId } from "../../../slices/orderSlice";
import { Transition, Alert } from "../../../components/customize/CustomizeComponent";

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

const steps1 = [
  "Đang chờ xử lý",
  "Đã duyệt",
  "Đang giao",
  "Đã giao",
  "Hoàn thành",
];

export default function OrderHistoryDetailComponent (props) {
    console.log("Check render OrderHistoryDetailComponent");
    const { order } = props;
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const dispatch = useDispatch();
    // useEffect(() => {
    //   dispatch(getOrderDetailByOrderId(order.orderId));
    // }, [dispatch]);
    const handleGetOrderDetail = (orderId) => {
        dispatch(getOrderDetailByOrderId(orderId));
    };
    // console.log("check render");
    const orderDetails = useSelector((state) => state.order.orderDetails);
    // console.log(orderDetails);
    return (
        <>
        <Button size="small" variant="outlined" startIcon={<InfoIcon />} onClick={() => {
          handleClickOpen();
          handleGetOrderDetail(order.orderId);
        }}>Chi tiết</Button>
        <Dialog
        fullScreen
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        sx={{ width: 1500 }}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Chi tiết đơn hàng
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              Đóng
            </Button>
          </Toolbar>
        </AppBar>
        <DialogTitle>{`Chi tiết đơn hàng #${order.orderId}`}</DialogTitle>
        <DialogContent sx={{ padding: 3 }}>
          {/* <DialogContentText id="alert-dialog-slide-description">
            Tên danh mục
          </DialogContentText> */}
          <Box sx={{ width: "100%", marginTop: 4, marginBottom: 3 }}>
            <Stepper activeStep={order.orderStatus - 1} alternativeLabel>
              {steps1.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>
          <Grid
            container
            spacing={1}
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
            //   spacing={10}
          >
            <Grid item xs={6}>
              <Stack spacing={2}>
                <div>Tên khách hàng: {order.user.userName}</div>
                <div>Hình thức thanh toán: {order.payment.paymentName}</div>
                <div>Mã đơn hàng: {order.orderCode}<IconButton
                      onClick={() =>
                        navigator.clipboard.writeText(order.orderCode)
                      }
                      aria-label="Copy order code"
                      size="small"
                    >
                      <ContentCopyIcon fontSize="small"/>
                    </IconButton></div>
                <div>Thời gian đặt hàng: {formatDateTime(order.orderTime)}</div>
                <div>Tên người nhận: {order.orderName}</div>
                <div>Số điện thoại người nhận: {order.orderPhone}</div>
                <div>Địa chỉ nhận: {order.orderAddress}</div>
                <div>Ghi chú: {order.orderNote}</div>
                <div>
                  Dự kiến giao vào: {formatDateTime(order.orderShipExpected)}
                </div>
                {order.shipper != null ? 
                    <div>
                    Tên người giao:{" "}
                    {order.shipper.userName}
                    </div>
                    : ""
                }
                {order.orderShipping != null ?
                    <div>
                    Ngày bắt đầu giao:{" "}
                    {formatDateTime(order.orderShipping)}
                    </div>
                    :""
                }
                {order.orderShipped != null ?
                    <div>
                        Đã giao ngày:{" "}
                        {formatDateTime(order.orderShipped)}
                    </div>
                    : ""
                }
                {order.orderPaid != null ?
                <div>
                  Ngày thanh toán:{" "}
                   {formatDateTime(order.orderPaid)}
                    
                </div>
                : ""}
                {order.orderCompleted != null ?
                <div>
                  Ngày hoàn thành:{" "}
                   {formatDateTime(order.orderCompleted)}
                    
                </div>
                : ""}
                {order.orderCancelled != null ?
                    <div>
                    Ngày hủy:{" "}
                    {formatDateTime(order.orderCancelled)}
                    </div>
                    : ""
                }
                <h4>Phí giao hàng: {formatNumberWithCommas(order.orderShipFee)}đ</h4>
                  <h4>
                    Tổng tiền: {formatNumberWithCommas(order.orderTotalAmount)}đ
                  </h4>
                  <h4>
                    Trạng thái: { order.orderStatus == 1 ? <Typography sx={{color: '#3f51b5', display: 'inline'}}>Đang chờ xử lý</Typography>
                    : order.orderStatus == 2 ? <Typography sx={{color: '#b2a429', display: 'inline'}}>Đang chờ giao</Typography>
                    : order.orderStatus == 3 ? <Typography sx={{color: '#b23c17', display: 'inline'}}>Đang giao</Typography>
                    : order.orderStatus == 4 ? <Typography sx={{color: '#618833', display: 'inline'}}>Đã giao</Typography>
                    : order.orderStatus == 5 ? <Typography sx={{color: '#00a152', display: 'inline'}}>Đã hoàn thành</Typography>
                    : order.orderStatus == -1 ? <Typography sx={{color: '#ab003c', display: 'inline'}}>Đã hủy</Typography>
                    : "Không xác định"}
                    </h4>
              </Stack>
            </Grid>
            <Grid item xs={6} sx={{ borderLeft: 1 }}>
              <h3>Thông tin sản phẩm</h3>
              <Stack spacing={3}>
                {orderDetails.map((orderDetail) => (
                  <Grid
                    key={orderDetail.orderDetailId}
                    container
                    spacing={1}
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    //   spacing={10}
                  >
                    <Grid item xs={5} sx={{ textAlign: "center" }}>
                      <img
                        src={`http://localhost:9004/api/product/images/${orderDetail.product.proImage}`}
                        alt=""
                        style={{ width: "100px", height: "100px" }}
                      />
                    </Grid>
                    <Grid item xs={5}>
                      <div>{orderDetail.product.proName}</div>
                      <div>
                        {formatNumberWithCommas(orderDetail.orderDetailPrice)}{" "}
                        VNĐ
                      </div>
                    </Grid>
                    <Grid item xs={2}>
                      <div>x {orderDetail.orderDetailQuantity}</div>
                    </Grid>
                  </Grid>
                ))}
                
                
              </Stack>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ borderTop: 1 }}>
          {/* <ConfirmOrder order={order} />
          <ConfirmPayment order={order} />
          <Button startIcon={<CheckIcon />} variant="outlined" >Đánh dấu hoàn thành</Button>
          // <ConfirmCancel order={order} /> */}
        </DialogActions>
      </Dialog>
        </>
    )
}