import * as React from "react";
import { useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
// import Redux
import { useSelector, useDispatch } from "react-redux";
import {
  countCartDetail,
  deleteCartDetail,
  fetchCartDetail,
  updateCartDetailQuantity,
  calcTotalCart,
  calcCart,
  searchCartDetail,
} from "../../../slices/cartSlice";

// MUI
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { IconButton, Stack, TextField } from "@mui/material";
import { emphasize, styled } from "@mui/material/styles";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Chip from "@mui/material/Chip";
import HomeIcon from "@mui/icons-material/Home";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchIcon from "@mui/icons-material/Search";
import Typography from '@mui/material/Typography';
import {
  formatNumberWithCommas,
  StyledBreadcrumb,
  Alert,
} from "../../../components/customize/CustomizeComponent";

export default function Cart() {
  console.log("check");
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const handleOpenSnackbar = () => {
    setOpenSnackbar(true);
  };
  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { customerId } = useParams();

  const cart = useSelector((state) => state.cart.cart);
  const calcCartData = useSelector((state) => state.cart.calcCartData);

  useEffect(() => {
    dispatch(fetchCartDetail(customerId));
    dispatch(calcCart(customerId));
    // console.log(cart);
    return () => {
      console.log("unmount");
    };
  }, [dispatch]);

  // const handleUpdateCartQuantity = (quantity, cartDetailId) => {
  //   console.log(quantity);
  //   console.log(cartDetailId);
  //   const updateCartDetailQuantityData = {
  //     cartDetailId: cartDetailId,
  //     cartDetailQuantity: quantity,
  //   };
  //   dispatch(updateCartDetailQuantity(updateCartDetailQuantityData)).then(
  //     () => {
  //       dispatch(fetchCartDetail(customerId));

  //       dispatch(calcCart(customerId)).then(() => {});
  //       handleOpenSnackbar();
  //     }
  //   );
  // };
  const handleUpdateCartQuantity = async (quantity, cartDetailId) => {
    const cartDetail = cart.find((item) => item.cartDetailId === cartDetailId);
  
    try {
      const response = await fetch(`http://localhost:9004/api/product/${cartDetail.product.proId}`);
      const { proQuantity } = await response.json();
  
      if (quantity > proQuantity) {
        alert("Số lượng sản phẩm vượt quá trong kho");
        return;
      }
  
      const updateCartDetailQuantityData = {
        cartDetailId: cartDetailId,
        cartDetailQuantity: quantity,
      };
  
      dispatch(updateCartDetailQuantity(updateCartDetailQuantityData)).then(() => {
        dispatch(fetchCartDetail(customerId));
        dispatch(calcCart(customerId));
        handleOpenSnackbar();
      });
    } catch (error) {
      console.error("Error fetching product quantity:", error);
      // Xử lý lỗi khi gọi API lấy số lượng sản phẩm
    }
  };

  const [totalCart, setTotalCart] = useState();

  const handleTotalCart = (quantity, price) => {
    setTotalCart(quantity * price);
  };

  const handleDeleteCartDetail = (cartDetailId) => {
    dispatch(deleteCartDetail(cartDetailId)).then(() => {
      dispatch(fetchCartDetail(customerId));
      console.log("Delete successfully");
      handleOpenSnackbar();

      dispatch(countCartDetail(localStorage.getItem("customerID")));
      dispatch(calcCart(customerId));
    });
  };

  const countCart = useSelector((state) => state.cart.countCart);

  const [searchText, setSearchText] = useState("");

  const handleSearch = (event) => {
    setSearchText(event.target.value);
    // Điều chỉnh logic tìm kiếm dựa trên searchText ở đây
    // Ví dụ: lọc danh sách sản phẩm theo searchText
  };

  const changeSearchData = (e) => {
    e.preventdefault;
    console.log(e.target.value);
    const searchData = { cartId: localStorage.getItem("customerID"), search: e.target.value };
    dispatch(searchCartDetail(searchData));
  };

  const handleCheckout = async () => {
    // Kiểm tra số lượng sản phẩm trong giỏ hàng
    for (const cartDetail of cart) {
      // Gọi API để lấy proQuantity dựa trên cartDetail.product.proId
      const response = await fetch(`http://localhost:9004/api/product/${cartDetail.product.proId}`);
      const { proQuantity } = await response.json();
      
      // So sánh proQuantity với số lượng sản phẩm trong giỏ hàng
      if (cartDetail.cartDetailQuantity > proQuantity) {
        alert("Số lượng sản phẩm vượt quá trong kho");
        return; // Dừng kiểm tra khi gặp sản phẩm vượt quá
      }
    }

    // Nếu không có sản phẩm nào vượt quá, thực hiện chuyển hướng đến trang thanh toán
    navigate(`/checkout/${customerId}`);
  };

  return (
    <>
      <Breadcrumbs aria-label="breadcrumb" sx={{ marginLeft: 3 }}>
        <StyledBreadcrumb
          component="a"
          // href="#"
          onClick={() => {
            navigate("/");
          }}
          label="Trang chủ"
          icon={<HomeIcon fontSize="small" />}
        />
        <StyledBreadcrumb
          label="Giỏ hàng"
          component="a"
          icon={<ShoppingCartIcon fontSize="small" />}
        />
      </Breadcrumbs>
      <Grid container alignItems="center" justifyContent="space-between" sx={{paddingLeft: 3}}>
        <Grid item>
        <h3>Giỏ hàng</h3>
        </Grid>
        <Grid item xs={6} sm={4} md={3} lg={2}> {/* Điều chỉnh kích thước cho phù hợp */}
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
            <TextField
              id="search"
              label="Tìm kiếm"
              variant="outlined"
              // value={searchText}
              onChange={e=>{changeSearchData(e)}}
              size="small"
            />
            <IconButton>
              <SearchIcon />
            </IconButton>
          </Box>
        </Grid>
      </Grid>
      <Box sx={{ flexGrow: 1, padding: 2 }}>
        <Paper elevation={0} sx={{ padding: 2 }}>
          <Grid
            container
            spacing={2}
            direction="row"
            justifyContent="center"
            alignItems="center"
            //   spacing={10}
          >
            <Grid item xs={2} sx={{ textAlign: "center" }}>
              Hình ảnh
            </Grid>
            <Grid item xs={2} sx={{ textAlign: "left" }}>
              Tên sản phẩm
            </Grid>
            <Grid item xs={2} sx={{ textAlign: "left" }}>
              Phân loại
            </Grid>
            <Grid item xs={2} sx={{ textAlign: "right" }}>
              Đơn giá
            </Grid>
            <Grid item xs={1} sx={{ textAlign: "right" }}>
              Số lượng
            </Grid>
            <Grid item xs={2} sx={{ textAlign: "right" }}>
              Số tiền
            </Grid>
            <Grid item xs={1}>
              Thao tác
            </Grid>
          </Grid>
        </Paper>
      </Box>
      {cart.map((cartDetail) => (
        <Box sx={{ flexGrow: 1, padding: 2 }} key={cartDetail.cartDetailId}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Grid
              container
              spacing={2}
              direction="row"
              justifyContent="center"
              alignItems="center"
              //   spacing={10}
            >
              <Grid item xs={2} sx={{ textAlign: "center" }}>
                <img
                  src={`http://localhost:9004/api/product/images/${cartDetail.product.proImage}`}
                  alt=""
                  style={{ width: "100px", height: "100px" }}
                />
              </Grid>
              <Grid item xs={2}>
                {cartDetail.product.proName}
              </Grid>
              <Grid item xs={2} sx={{ textAlign: "left" }}>
                - {cartDetail.product.category.cateName}
                <br />- {cartDetail.product.brand.brandName}
              </Grid>
              <Grid item xs={2} sx={{ textAlign: "right" }}>
                {/* <p>Giá:</p> */}
                {formatNumberWithCommas(cartDetail.product.proPrice)} VNĐ
              </Grid>
              <Grid item xs={1} sx={{ textAlign: "right" }}>
                {/* <p>Số lượng</p> */}
                <TextField
                  sx={{ width: 60 }}
                  margin="dense"
                  id="pro_name"
                  type="number"
                  // fullWidth
                  variant="filled"
                  defaultValue={cartDetail.cartDetailQuantity}
                  inputProps={{ min: 1 }}
                  onChange={(e) => {
                    handleUpdateCartQuantity(
                      e.target.value,
                      cartDetail.cartDetailId
                    );
                    // handleTotalCart(e.target.value, cartDetail.product.proPrice);
                  }}
                />
              </Grid>
              <Grid item xs={2} sx={{ textAlign: "right" }}>
                {formatNumberWithCommas(
                  cartDetail.product.proPrice * cartDetail.cartDetailQuantity
                )}{" "}
                VNĐ
              </Grid>
              <Grid item xs={1}>
                {/* <Button variant="contained" color="error">
                  Xóa
                </Button> */}
                <Button
                  onClick={() =>
                    handleDeleteCartDetail(cartDetail.cartDetailId)
                  }
                  variant="outlined"
                  color="error"
                  startIcon={<DeleteIcon />}
                >
                  Xóa
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Box>
      ))}
      <Box sx={{ flexGrow: 1, padding: 2, textAlign: "right" }}>
        <h2>
          Tổng tiền (VAT): {formatNumberWithCommas(calcCartData.totalMoney)} VNĐ
        </h2>
        <h2>Số mặt hàng: {calcCartData.quantityItem}</h2>
        <h2>Tổng số lượng: {calcCartData.totalQuantityItem}</h2>
        {countCart > 0 ? (
          <Button
            onClick={() => handleCheckout()}
            variant="contained"
            size="large"
            startIcon={<ShoppingCartCheckoutIcon />}
          >
            Thanh toán giỏ hàng
          </Button>
        ) : (
          <Button
            disabled
            variant="contained"
            size="large"
            startIcon={<ShoppingCartCheckoutIcon />}
          >
            Thanh toán giỏ hàng
          </Button>
        )}
      </Box>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{ width: "100%", color: "white" }}
        >
          Cập nhật giỏ hàng thành công!
        </Alert>
      </Snackbar>
    </>
  );
}
