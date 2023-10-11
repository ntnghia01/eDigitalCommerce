import * as React from "react";
import { useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
// import Redux
import { useSelector, useDispatch } from "react-redux";
import { countCartDetail, deleteCartDetail, fetchCartDetail, updateCartDetailQuantity } from "../../../slices/cartSlice";

// MUI
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { IconButton, Stack, TextField } from "@mui/material";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { emphasize, styled } from '@mui/material/styles';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Chip from '@mui/material/Chip';
import HomeIcon from '@mui/icons-material/Home';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from "react";
import ProductListComponent from "../ProductListComponent";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

const StyledBreadcrumb = styled(Chip)(({ theme }) => {
    const backgroundColor =
      theme.palette.mode === 'light'
        ? theme.palette.grey[200]
        : theme.palette.grey[800];
    return {
      backgroundColor,
      height: theme.spacing(3),
      color: theme.palette.text.primary,
      fontWeight: theme.typography.fontWeightRegular,
      '&:hover, &:focus': {
        backgroundColor: emphasize(backgroundColor, 0.06),
      },
      '&:active': {
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

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Cart() {

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

  useEffect(() => {
    dispatch(fetchCartDetail(customerId));
    // console.log(cart);
    return () => {
        console.log("unmount");
    }
  }, [dispatch]);

  const handleUpdateCartQuantity = (quantity, cartDetailId) => {
    console.log(quantity);
    console.log(cartDetailId);
    const updateCartDetailQuantityData = {
      cartDetailId: cartDetailId,
      cartDetailQuantity: quantity
    }
    dispatch(updateCartDetailQuantity(updateCartDetailQuantityData))
      .then(() => {
        dispatch(fetchCartDetail(customerId));
        handleOpenSnackbar();
      })
  }

  const [totalCart, setTotalCart] = useState();

  const handleTotalCart = (quantity, price) => {
    setTotalCart(quantity*price);
  }

  const handleDeleteCartDetail = (cartDetailId) => {
    dispatch(deleteCartDetail(cartDetailId))
     .then(() => {
      dispatch(fetchCartDetail(customerId));
      console.log("Delete successfully");
      handleOpenSnackbar();
      
      dispatch(countCartDetail(sessionStorage.getItem("customerID")));
     })
  }

  return (
    <>
    <Breadcrumbs aria-label="breadcrumb" sx={{margin: 3}}>
            <StyledBreadcrumb
            component="a"
            // href="#"
            onClick={() => {navigate('/');}}
            label="Trang chủ"
            icon={<HomeIcon fontSize="small" />}
            />
            <StyledBreadcrumb component="a" href="#" label="Giỏ hàng" />
        </Breadcrumbs>
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
              <Grid item xs={2} sx={{textAlign: 'center'}}>
                Hình ảnh
              </Grid>
              <Grid item xs={2} sx={{textAlign: 'left'}}>
                Tên sản phẩm
              </Grid>
              <Grid item xs={2} sx={{textAlign: 'left'}}>
                Phân loại
              </Grid>
              <Grid item xs={2} sx={{textAlign: 'right'}}>
                Đơn giá
              </Grid>
              <Grid item xs={1} sx={{textAlign: 'right'}}>
                Số lượng
              </Grid>
              <Grid item xs={2} sx={{textAlign: 'right'}}>
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
              <Grid item xs={2} sx={{textAlign: 'center'}}>
                <img
                  src={`http://localhost:9004/api/product/images/${cartDetail.product.proImage}`}
                  alt=""
                  style={{ width: "100px", height: "100px" }}
                />
              </Grid>
              <Grid item xs={2}>
                {cartDetail.product.proName}
              </Grid>
              <Grid item xs={2} sx={{textAlign: 'left'}}>
                  - {cartDetail.product.category.cateName}<br />
                  - {cartDetail.product.brand.brandName}
              </Grid>
              <Grid item xs={2} sx={{textAlign: 'right'}}>
                {/* <p>Giá:</p> */}
                {formatNumberWithCommas(cartDetail.product.proPrice)} VNĐ
              </Grid>
              <Grid item xs={1} sx={{textAlign: 'right'}}>
                {/* <p>Số lượng</p> */}
                <TextField
                    sx={{width: 60}}
                    margin="dense"
                    id="pro_name"
                    type="number"
                    // fullWidth
                    variant="filled"
                    defaultValue={cartDetail.cartDetailQuantity}
                    onChange={(e) => {
                      handleUpdateCartQuantity(e.target.value, cartDetail.cartDetailId);
                      // handleTotalCart(e.target.value, cartDetail.product.proPrice);
                    }}
                />
              </Grid>
              <Grid item xs={2} sx={{textAlign: 'right'}}>
                {formatNumberWithCommas(cartDetail.product.proPrice*cartDetail.cartDetailQuantity)} VNĐ
              </Grid>
              <Grid item xs={1}>
                {/* <Button variant="contained" color="error">
                  Xóa
                </Button> */}
                <Button onClick={() => handleDeleteCartDetail(cartDetail.cartDetailId)} variant="outlined" color="error" startIcon={<DeleteIcon />}>
                  Xóa
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Box>
      ))}
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
