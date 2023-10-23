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
import { fetchCartDetail } from "../../../slices/cartSlice";
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
  // Kiểm tra xem đầu vào có phải là một số nguyên không
  if (typeof input === "number" && Number.isInteger(input)) {
    // Chuyển số nguyên thành chuỗi
    input = input.toString();
  }

  // Kiểm tra xem đầu vào có phải là một chuỗi không
  if (typeof input !== "string") {
    return "Invalid input";
  }

  // Kiểm tra xem chuỗi có chứa chỉ chứa số không
  if (!/^\d+$/.test(input)) {
    return "Invalid input";
  }

  // Sử dụng regular expression để thêm dấu chấm sau mỗi 3 chữ số từ phải sang trái
  return input.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CheckoutPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getCustomerInfo(sessionStorage.getItem("customerID")));
    dispatch(fetchCartDetail(sessionStorage.getItem("customerID")));
    dispatch(fetchAddresses(sessionStorage.getItem("customerID")));
    dispatch(getDefaultAddress(sessionStorage.getItem("customerID")));
  }, [dispatch]);

  const customer = useSelector((state) => state.customer.customer);
  const addresses = useSelector((state) => state.address.addresses);
  const cart = useSelector((state) => state.cart.cart);
  const defaultAddress = useSelector((state) => state.address.defaultAddress);
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

  const handleSetAddressActive = (addressData) => {
    setAddressActive(addressData);
  }

  const handleDispatchAddress = () => {
    dispatch(fetchAddresses(sessionStorage.getItem("customerID")));
    dispatch(getDefaultAddress(sessionStorage.getItem("customerID")));
  }
  useEffect(() => {
    // Lắng nghe sự thay đổi của defaultAddress và cập nhật addressActive
    setAddressActive(defaultAddress);
  }, [defaultAddress]);
  
  // console.log('actived: #' + addressActive);

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
                    style={{cursor: "pointer"}}
                    onClick={() => setAddressActive(address)}
                    >
                      <Box
                        sx={{
                          p: 2,
                          border: address.addressId == addressActive.addressId ? "2px solid blue" : "1px solid grey",
                          borderRadius: 5,
                          // ,maxWidth: '200px'
                        }}
                      >
                        <Badge
                          badgeContent={
                            <CheckCircleIcon sx={{ color: "blue" }} />
                          }
                          invisible={address.addressId == addressActive.addressId ? false : true}
                        >
                          <Stack spacing={0}>
                            <div>
                              {address.addressName}
                              <EditAddressComponent
                                editID={address.addressId}
                                handleSnackbar={handleOpenSuccessSnackbar}
                                address={{
                                  addressId: address.addressId,
                                  addressName: address.addressName,
                                  addressPhone: address.addressPhone,
                                  addressFull: address.addressFull,
                                  addressStatus: address.addressStatus,
                                }}
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
                  <Grid
                    item
                    xs={6}
                  // sx={{maxWidth: '100px'}}
                  >
                    <Box
                      sx={{
                        p: 2,
                        border: "2px solid blue",
                        borderRadius: 5,
                        // ,maxWidth: '200px'
                        height: "100%",
                      }}
                    >
                      <Badge
                        badgeContent={
                          <CheckCircleIcon sx={{ color: "blue" }} />
                        }
                        invisible={false}
                        sx={{ width: "100%", height: "100%" }}
                      >
                        <Stack spacing={0} sx={{ width: "180%" }}>
                          <div>Thanh toán khi nhận hàng</div>
                          <div>Thanh toán khi nhận hàng trực tiếp</div>
                        </Stack>
                      </Badge>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box
                      sx={{ p: 2, border: "1px solid grey", borderRadius: 5 }}
                    >
                      <Stack spacing={0}>
                        <div>Thanh toán qua VN-PAY</div>
                        <div>Thanh toán qua VNPAY-QR, Internet Banking</div>
                      </Stack>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box
                      sx={{ p: 2, border: "1px solid grey", borderRadius: 5 }}
                    >
                      <Stack spacing={0}>
                        <div>Thanh toán qua ứng dụng ngân hàng</div>
                        <div>
                          Agribank, Vietcombank, Vietinbank, MB Bank, HD Bank
                        </div>
                      </Stack>
                    </Box>
                  </Grid>
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
    </>
  );
}