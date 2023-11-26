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
import PaymentIcon from '@mui/icons-material/Payment';
import { calcCart, fetchCartDetail } from "../../../slices/cartSlice";
import AddAddressComponent from "../../../components/customer/address/AddAddressComponent";
import {
  calculateFee,
  fetchAddresses,
  getDefaultAddress,
} from "../../../slices/addressSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import ConfirmDeleteAddress from "../../../components/customer/address/ConfirmDeleteAddress";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useState } from "react";
import EditAddressComponent from "../../../components/customer/address/EditAddressComponent";
import { fetchPayments, payWithVNPay } from "../../../slices/paymentSlice";
import { createOrder } from "../../../slices/orderSlice";

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CheckoutPage() {
  console.log("Check render CheckoutPage");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getCustomerInfo(localStorage.getItem("customerID")));
    dispatch(fetchCartDetail(localStorage.getItem("customerID")));
    dispatch(fetchAddresses(localStorage.getItem("customerID")));
    dispatch(getDefaultAddress(localStorage.getItem("customerID")));
    dispatch(fetchPayments());
    dispatch(calcCart(localStorage.getItem("customerID")));
    console.log(addressActive.districtId, addressActive.wardCode);
    dispatch(calculateFee({districtId: addressActive.districtId, wardCode: addressActive.wardCode}));
  }, [dispatch]);

  const customer = useSelector((state) => state.customer.customer);
  const addresses = useSelector((state) => state.address.addresses);
  const cart = useSelector((state) => state.cart.cart);
  const defaultAddress = useSelector((state) => state.address.defaultAddress);
  const payments = useSelector((state) => state.payment.payments);
  const calcCartData = useSelector((state) => state.cart.calcCartData);
  // console.log(defaultAddress);

  const [openSuccessSnackbar, setOpenSuccessSnackbar] = React.useState(false);
  const [contentSnackbar, setContentSnackbar] = useState("");
  const handleOpenSuccessSnackbar = (content) => {
    setOpenSuccessSnackbar(true);
    setContentSnackbar(content);
  };
  const handleCloseSuccessSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSuccessSnackbar(false);
  };

  const [addressActive, setAddressActive] = useState({});
  const [paymentActive, setPaymentActive] = useState({
    paymentId: "",
  });
  // const [orderTotalAmount, setOrderTotalAmount] = useState(parseInt(calcCartData.totalMoney + 25000));
  const [orderNote, setOrderNote] = useState();

  const handleDispatchAddress = () => {
    dispatch(fetchAddresses(localStorage.getItem("customerID")));
    dispatch(getDefaultAddress(localStorage.getItem("customerID")));
    console.log("check");
    dispatch(calcCart(localStorage.getItem("customerID")));
  };
  useEffect(() => {
    // Lắng nghe sự thay đổi của defaultAddress và cập nhật addressActive
    setAddressActive(defaultAddress);
    console.log(defaultAddress.districtId, defaultAddress.wardCode);
    dispatch(calculateFee({districtId: defaultAddress.districtId, wardCode: defaultAddress.wardCode}));
  }, [defaultAddress]);

  useEffect(() => {
    console.log(addressActive.districtId, addressActive.wardCode);
    dispatch(calculateFee({districtId: addressActive.districtId, wardCode: addressActive.wardCode}));
  }, [addressActive]);

  const calculateShipFee = useSelector((state) => state.address.calculateShipFee);
  console.log(calculateShipFee);

  // console.log('actived: #' + addressActive);
  // const handleSetPaymentActive

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    // console.log("check");
    // e.preventDefault();
    const orderData = {
      customerId: localStorage.getItem("customerID"),
      paymentId: paymentActive.paymentId,
      orderName: addressActive.addressName,
      orderPhone: addressActive.addressPhone,
      orderAddress: addressActive.addressFull,
      orderNote: orderNote,
      orderShipFee: calculateShipFee,
      orderTotalAmount: parseInt(calcCartData.totalMoney + calculateShipFee) ,
    }
    console.log(orderData);

    if (paymentActive.paymentId == 1) {
      console.log("cash on delivery");
      dispatch(createOrder(orderData)).then(() => {
        dispatch(getCustomerInfo(localStorage.getItem("customerID")));
        dispatch(fetchCartDetail(localStorage.getItem("customerID")));
        dispatch(fetchAddresses(localStorage.getItem("customerID")));
        dispatch(getDefaultAddress(localStorage.getItem("customerID")));
        dispatch(fetchPayments());
        dispatch(calcCart(localStorage.getItem("customerID")));
        handleClickOpen();
        setTimeout(() => {
            handleClose();
          }, 5000);
      });
    } else {
      localStorage.setItem("paymentId", orderData.paymentId);
      localStorage.setItem("orderName", orderData.orderName);
      localStorage.setItem("orderPhone", orderData.orderPhone);
      localStorage.setItem("orderAddress", orderData.orderAddress);
      localStorage.setItem("orderNote", orderData.orderNote);
      localStorage.setItem("orderShipFee", orderData.orderShipFee);
      localStorage.setItem("orderTotalAmount", orderData.orderTotalAmount);
      console.log("VNPay");
      const vnpayData = {
        amount: orderData.orderTotalAmount,
        orderInfo: "thanh toan vnpay"
      }
      console.log(vnpayData);
      dispatch(payWithVNPay(vnpayData)).then(() => {
        console.log("Redirect to VNPay page");
        // localStorage.removeItem("paymentId", orderData.paymentId);
        // localStorage.removeItem("orderName", orderData.orderName);
        // localStorage.removeItem("orderPhone", orderData.orderPhone);
        // localStorage.removeItem("orderAddress", orderData.orderAddress);
        // localStorage.removeItem("orderNote", orderData.orderNote);
        // localStorage.removeItem("orderShipFee", orderData.orderShipFee);
        // localStorage.removeItem("orderTotalAmount", orderData.orderTotalAmount);
      })
    }
    
  console.log("check");
    
  }
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
          label="Giỏ hàng"
          component="a"
          //   href="#"
          onClick={() => {
            navigate(`/cart/${customerId}`);
          }}
          icon={<ShoppingCartIcon fontSize="small" />}
        />
        <StyledBreadcrumb
          label="Thanh toán"
          // component="a"
          icon={<ShoppingCartCheckoutIcon fontSize="small" />}
        />
      </Breadcrumbs>
      <Box sx={{ flexGrow: 1, padding: 2 }}>
        <Paper elevation={0} sx={{ padding: 2 }}>
          <Grid
            container
            spacing={2}
            direction="row"
            justifyContent="center"
            // alignItems="center"
            //   spacing={10}
          >
            <Grid
              item
              xs={7}
              sx={{ textAlign: "left", backgroundColor: "", padding: 2 }}
            >
              <Paper elevation={3} sx={{ padding: 2 }}>
                <h3>Thông tin nhận hàng</h3>
                <div>Chọn địa chỉ giao hàng</div>
                <Grid
                  container
                  spacing={2}
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  sx={{ marginTop: 1 }}
                >
                  {addresses.map((address) => (
                    <Grid
                      key={address.addressId}
                      item
                      xs={6}
                      // sx={{maxWidth: '100px'}}
                      style={{ cursor: "pointer" }}
                      onClick={() => setAddressActive(address)}
                    >
                      <Box
                        sx={{
                          p: 2,
                          border:
                            address.addressId == addressActive.addressId
                              ? "2px solid blue"
                              : "1px solid grey",
                          borderRadius: 5,
                          // ,maxWidth: '200px'
                        }}
                      >
                        <Badge
                          badgeContent={
                            <CheckCircleIcon sx={{ color: "blue" }} />
                          }
                          invisible={
                            address.addressId == addressActive.addressId
                              ? false
                              : true
                          }
                        >
                          <Stack spacing={0}>
                            <div>
                              {address.addressName}
                              <EditAddressComponent
                                editID={address.addressId}
                                handleSnackbar={handleOpenSuccessSnackbar}
                                address={address}
                              />
                              <ConfirmDeleteAddress
                                deleteID={address.addressId}
                                handleSnackbar={handleOpenSuccessSnackbar}
                              />
                            </div>
                            <div>{address.addressPhone}</div>
                            <div
                            // style={{wordWrap: 'break-all', maxWidth: '100px',overflowWrap: 'break-word'}}
                            >
                              {address.addressFull}
                            </div>
                          </Stack>
                        </Badge>
                      </Box>
                    </Grid>
                  ))}

                  <AddAddressComponent
                    handleSnackbar={handleOpenSuccessSnackbar}
                    handleSetAddressActive={handleDispatchAddress}
                  />
                </Grid>
                <Box sx={{ marginTop: 3 }}>
                  <Stack spacing={1}>
                    <div>Ghi chú cho đơn hàng</div>
                    <TextField
                      id="outlined-basic"
                      label="Ghi chú"
                      variant="outlined"
                      defaultValue={orderNote}
                      onChange={(e) => setOrderNote(e.target.value)}
                    />
                  </Stack>
                </Box>
                <Box sx={{ marginTop: 2, marginBottom: 2 }}>
                  Chọn hình thức thanh toán
                </Box>
                <Grid
                  container
                  spacing={2}
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                >
                  {payments.map((payment) => (
                    <Grid
                      key={payment.paymentId}
                      item
                      xs={6}
                      // sx={{maxWidth: '100px'}}
                      style={{ cursor: "pointer" }}
                      onClick={() => setPaymentActive(payment)}
                    >
                      <Box
                        sx={{
                          p: 2,
                          // border: "2px solid blue",
                          border:
                            payment.paymentId == paymentActive.paymentId
                              ? "2px solid blue"
                              : "1px solid grey",
                          borderRadius: 5,
                          // ,maxWidth: '200px'
                          height: "100%",
                        }}
                      >
                        <Badge
                          badgeContent={
                            <CheckCircleIcon sx={{ color: "blue" }} />
                          }
                          // invisible={false}
                          invisible={
                            payment.paymentId == paymentActive.paymentId
                              ? false
                              : true
                          }
                          sx={{ width: "100%", height: "100%" }}
                        >
                          <Stack spacing={0} sx={{ width: "180%" }}>
                            <div>{payment.paymentName}</div>
                            <div>{payment.paymentExplain}</div>
                          </Stack>
                        </Badge>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Paper>
            </Grid>
            <Grid item xs={5} sx={{ textAlign: "left", backgroundColor: "" }}>
              <Paper elevation={3} sx={{ padding: 2 }}>
                <h3>Thông tin sản phẩm</h3>
                <Stack spacing={3}>
                  {cart.map((cartDetail) => (
                    <Grid
                      key={cartDetail.cartDetailId}
                      container
                      spacing={1}
                      direction="row"
                      justifyContent="center"
                      alignItems="center"
                      //   spacing={10}
                    >
                      <Grid item xs={4} sx={{ textAlign: "center" }}>
                        <img
                          src={`http://localhost:9004/api/product/images/${cartDetail.product.proImage}`}
                          alt=""
                          style={{ width: "100px", height: "100px" }}
                        />
                      </Grid>
                      <Grid item xs={7}>
                        <div>{cartDetail.product.proName}</div>
                        <div>
                          {formatNumberWithCommas(cartDetail.product.proPrice)}{" "}
                          VNĐ
                        </div>
                      </Grid>
                      <Grid item xs={1}>
                        <div>x {cartDetail.cartDetailQuantity}</div>
                      </Grid>
                    </Grid>
                  ))}
                </Stack>
              </Paper>
              <Paper
                elevation={3}
                sx={{ padding: 2, marginTop: 2 }}
                spacing={3}
              >
                <Stack spacing={2}>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    spacing={2}
                  >
                    <h3>Tổng tạm tính</h3>
                    <div>{formatNumberWithCommas(calcCartData.totalMoney)} VNĐ</div>
                  </Stack>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    spacing={2}
                  >
                    <h4>Phí vận chuyển</h4>
                    <div>{formatNumberWithCommas(calculateShipFee)} VNĐ</div>
                  </Stack>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    spacing={2}
                  >
                    <h3>Thành tiền</h3>
                    <div>{formatNumberWithCommas(parseInt(calcCartData.totalMoney) + calculateShipFee)} VNĐ</div>
                  </Stack>
                  {/* <div>wefewf</div> */}
                  <Stack
                    direction="row"
                    justifyContent="flex-end"
                    alignItems="flex-start"
                    // spacing={2}
                  >
                    <div style={{fontSize: 15}}>(Đã bao gồm VAT)</div>
                  </Stack>
                  <Button variant="contained" size="large"startIcon={<PaymentIcon />} onClick={() => handleSubmit()}>THANH TOÁN</Button>
                </Stack>
              </Paper>
            </Grid>
          </Grid>
        </Paper>
      </Box>
      <Snackbar
        open={openSuccessSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSuccessSnackbar}
      >
        <Alert
          onClose={handleCloseSuccessSnackbar}
          severity="success"
          sx={{ width: "100%", color: "white" }}
        >
          {contentSnackbar}
        </Alert>
      </Snackbar>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Stack direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={2}
          sx={{padding: 3}}>
          <img src="../../../../public/success.gif" alt="" style={{maxWidth: '10rem'}}/>
          <h1>ĐẶT HÀNG THÀNH CÔNG</h1>
        </Stack>
        
      </Dialog>
    </>
  );
}
