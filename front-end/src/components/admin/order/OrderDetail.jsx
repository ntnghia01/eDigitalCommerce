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
import CheckIcon from "@mui/icons-material/Check";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

// import Icons
import AddIcon from "@mui/icons-material/Add";
import { Grid, InputAdornment, Stack, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getOrderDetailByOrderId } from "../../../slices/orderSlice";
import ConfirmPayment from "./ConfirmPayment";
import ConfirmOrder from "./ConfirmOrder";
import ConfirmCancel from "./ConfirmCancel";
import CompleteOrder from "./CompleteOrder";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { Transition, formatDateTime, formatNumberWithCommas } from "../../customize/CustomizeComponent";
import { memo } from "react";



const steps1 = [
  "Đang chờ xử lý",
  "Đã duyệt",
  "Đang giao",
  "Đã giao",
  "Hoàn thành",
];

const OrderDetail = memo(({order, onClose}) => {
  console.log("OrderDetail");
  const [open, setOpen] = useState(true);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    onClose();
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
            <Grid item xs={12} sm={6}>
              <Stack spacing={2}>
                <div>Tên khách hàng: {order.user.userName}</div>
                <div>
                  Tên người giao:{" "}
                  {order.shipper != null ? order.shipper.userName : "Trống"}
                </div>
                <div>Hình thức thanh toán: {order.payment.paymentName}</div>
                <div>
                  Người duyệt:{" "}
                  {order.admin != null ? order.admin.userName : "Trống"}
                </div>
                <div>
                  Mã đơn hàng: {order.orderCode}{" "}
                  <IconButton
                    onClick={() =>
                      navigator.clipboard.writeText(order.orderCode)
                    }
                    aria-label="Copy order code"
                    size="small"
                  >
                    <ContentCopyIcon fontSize="small" />
                  </IconButton>
                </div>
                <div>Thời gian đặt hàng: {formatDateTime(order.orderTime)}</div>
                <div>Tên người nhận: {order.orderName}</div>
                <div>Số điện thoại người nhận: {order.orderPhone}</div>
                <div>Địa chỉ nhận: {order.orderAddress}</div>
                <div>Ghi chú: {order.orderNote}</div>
                <div>
                  Dự kiến giao vào: {formatDateTime(order.orderShipExpected)}
                </div>
                <div>
                  Ngày duyệt:{" "}
                  {order.orderConfirmed != null
                    ? formatDateTime(order.orderConfirmed)
                    : "Chưa duyệt"}
                </div>
                <div>
                  Ngày giao:{" "}
                  {order.orderShipping != null
                    ? formatDateTime(order.orderShipping)
                    : "Chưa giao"}
                </div>
                <div>
                  Đã giao ngày:{" "}
                  {order.orderShipped != null
                    ? formatDateTime(order.orderShipped)
                    : "Chưa giao"}
                </div>
                <div>
                  Ngày thanh toán:{" "}
                  {order.orderPaid != null
                    ? formatDateTime(order.orderPaid)
                    : "Chưa thanh toán"}
                </div>
                <div>
                  Ngày hoàn thành:{" "}
                  {order.orderCompleted != null
                    ? formatDateTime(order.orderCompleted)
                    : "Chưa hoàn thành"}
                </div>
                
              </Stack>
            </Grid>
            <Grid item xs={12} sm={6} sx={{ borderLeft: 1 }}>
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
                        {formatNumberWithCommas(orderDetail.product.proPrice)}{" "}
                        VNĐ
                      </div>
                    </Grid>
                    <Grid item xs={2}>
                      <div>x {orderDetail.orderDetailQuantity}</div>
                    </Grid>
                  </Grid>
                ))}
              </Stack>
              <Stack spacing={3} sx={{ marginTop: 10 }}>
                <h4>
                  Phí giao hàng: {formatNumberWithCommas(order.orderShipFee)}đ
                </h4>
                <h4>
                  Tổng tiền: {formatNumberWithCommas(order.orderTotalAmount)}đ
                </h4>
                <h4>
                  Trạng thái:
                  {order.orderStatus == 1 ? (
                    <Typography
                      variant="body1"
                      sx={{ color: "#3f51b5", display: "inline" }}
                    >
                      {" "}
                      Đang chờ xử lý
                    </Typography>
                  ) : order.orderStatus == 2 ? (
                    <Typography
                      variant="body1"
                      sx={{ color: "#b2a429", display: "inline" }}
                    >
                      {" "}
                      Đang chờ giao
                    </Typography>
                  ) : order.orderStatus == 3 ? (
                    <Typography
                      variant="body1"
                      sx={{ color: "#b23c17", display: "inline" }}
                    >
                      {" "}
                      Đang giao
                    </Typography>
                  ) : order.orderStatus == 4 ? (
                    <Typography
                      variant="body1"
                      sx={{ color: "#618833", display: "inline" }}
                    >
                      {" "}
                      Đã giao
                    </Typography>
                  ) : order.orderStatus == 5 ? (
                    <Typography
                      variant="body1"
                      sx={{ color: "#00a152", display: "inline" }}
                    >
                      {" "}
                      Đã hoàn thành
                    </Typography>
                  ) : order.orderStatus == -1 ? (
                    <Typography
                      variant="body1"
                      sx={{ color: "#ab003c", display: "inline" }}
                    >
                      {" "}
                      Đã hủy
                    </Typography>
                  ) : (
                    "Không xác định"
                  )}
                </h4>
                {order.orderStatus == -1 ?
                <div>
                Ngày hủy:{" "}
                {order.orderCancelled != null
                  ? formatDateTime(order.orderCancelled)
                  : "Không"}
              </div>
              :""
                }
                
              </Stack>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ borderTop: 1 }}>
          <ConfirmOrder order={order} />
          <ConfirmPayment order={order} />
          {/* <Button startIcon={<CheckIcon />} variant="outlined" >Đánh dấu hoàn thành</Button> */}
          <CompleteOrder order={order} />
          <ConfirmCancel order={order} />
        </DialogActions>
      </Dialog>
    </>
  );
})

export default OrderDetail;
