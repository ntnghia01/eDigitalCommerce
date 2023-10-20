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

export default function CheckoutPage() {
  //   const customerId = sessionStorage.getItem("customerID");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const customer = useSelector((state) => state.customer.customer);
  const cart = useSelector((state) => state.cart.cart);
  useEffect(() => {
    dispatch(getCustomerInfo(sessionStorage.getItem("customerID")));
    dispatch(fetchCartDetail(sessionStorage.getItem("customerID")))
  }, [dispatch]);
  // console.log(customer);

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
              Thông tin nhận hàng
              <Grid
                container
                spacing={2}
                direction="row"
                justifyContent="center"
                alignItems="center"
                sx={{ marginTop: 1 }}
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
                    }}
                  >
                    <Badge
                      badgeContent={<CheckCircleIcon sx={{ color: "blue" }} />}
                      invisible={false}
                    >
                      <Stack spacing={0}>
                        <div>
                          Nguyễn Trung Nghĩa
                          <IconButton aria-label="edit">
                            <DriveFileRenameOutlineIcon />
                          </IconButton>
                        </div>
                        <div>0559303471</div>
                        <div
                        // style={{wordWrap: 'break-all', maxWidth: '100px',overflowWrap: 'break-word'}}
                        >
                          104 Trần Đại Nghĩa, Phường Phúc Xá, Quận Ba Đình,
                          Thành phố Hà Nội
                        </div>
                      </Stack>
                    </Badge>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box sx={{ p: 2, border: "1px solid grey", borderRadius: 5 }}>
                    <Stack spacing={0}>
                      <div>
                        Nguyễn Trung Nghĩa
                        <IconButton aria-label="edit">
                          <DriveFileRenameOutlineIcon />
                        </IconButton>
                      </div>
                      <div>0559303471</div>
                      <div>
                        104 Trần Đại Nghĩa, Phường 4, TP.Vĩnh Long, vĩnh Long
                      </div>
                    </Stack>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box sx={{ p: 2, border: "1px solid grey", borderRadius: 5 }}>
                    <Stack spacing={0}>
                      <div>
                        Nguyễn Trung Nghĩa
                        <IconButton aria-label="edit">
                          <DriveFileRenameOutlineIcon />
                        </IconButton>
                      </div>
                      <div>0559303471</div>
                      <div>
                        104 Trần Đại Nghĩa, Phường 4, TP.Vĩnh Long, vĩnh Long
                      </div>
                    </Stack>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box
                    sx={{
                      p: 2,
                      border: "1px solid grey",
                      borderRadius: 5,
                      height: "100%",
                    }}
                  >
                    <Stack
                      spacing={1}
                      justifyContent="center"
                      alignItems="center"
                      // sx={{height: '190'}}
                    >
                      <IconButton aria-label="edit">
                        <AddToPhotosIcon />
                      </IconButton>
                      <div>Thêm địa chỉ</div>
                    </Stack>
                  </Box>
                </Grid>
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
              <Box sx={{ marginTop: 3 }}>
                <Stack spacing={1}>
                  <div>Email nhận thông báo về đơn hàng</div>
                  <TextField
                    id="outlined-basic"
                    label="Email nhận thông báo"
                    variant="outlined"
                  />
                </Stack>
              </Box>
                  <Box sx={{marginTop: 2, marginBottom: 2}}>Chọn hình thức thanh toán</Box>
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
                          height: '100%'
                        }}
                      >
                        <Badge
                          badgeContent={
                            <CheckCircleIcon sx={{ color: "blue" }} />
                          }
                          invisible={false}
                          sx={{width: '100%', height: '100%'}}
                        >
                          <Stack spacing={0} sx={{width: '180%'}}>
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
                          <div>Agribank, Vietcombank, Vietinbank, MB Bank, HD Bank</div>
                        </Stack>
                      </Box>
                    </Grid>
                  </Grid>
                  </Paper>
            </Grid>
            <Grid
              item
              xs={5}
              sx={{ textAlign: "left", backgroundColor: "" }}
            >
              <Paper elevation={3} sx={{ padding: 2 }}>
              Thông tin sản phẩm
              <Stack spacing={3}>
              {cart.map((cartDetail) => (
                  <Grid
                  key={cartDetail.cartDetailId}
                    container
                    spacing={3}
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                  //   spacing={10}
                  >
                    <Grid item xs={4} sx={{textAlign: 'center'}}>
                      <img
                        src={`http://localhost:9004/api/product/images/${cartDetail.product.proImage}`}
                        alt=""
                        style={{ width: "100px", height: "100px" }}
                      />
                    </Grid>
                    <Grid item xs={8}>
                      <div>{cartDetail.product.proName}</div>
                      <div>Số lượng: {cartDetail.cartDetailQuantity}</div>
                      <div>Giá: {formatNumberWithCommas(cartDetail.product.proPrice)} VNĐ</div>
                      
                    </Grid>
                  </Grid>
                ))}
              </Stack>
                
              </Paper>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </>
  );
}
