import * as React from "react";
import {
  Link,
  useNavigate,
} from "react-router-dom";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { addToCart, countCartDetail } from "../../../slices/cartSlice";
import { fetchAvailableProductsDESC, getProductMostSold, getProductRecentOrder, getProductRecentOrderBrand } from "../../../slices/productSlice";

function formatNumberWithCommas(input) {
  if (typeof input === "number" && Number.isInteger(input)) {
    input = input.toString();
  }
  if (typeof input !== "string") {
    return "Invalid input";
  }
  if (!/^\d+$/.test(input)) {
    return "Invalid input";
  }
  return input.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function ProductRecentOrder() {
  const navigate = useNavigate();

  const customer = useSelector((state) => state.customer.customer);
  // console.log(customer);

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
  const products = useSelector((state) => state.product.productRecentOrder);
  const products2 = useSelector((state) => state.product.productRecentOrderBrand);

  const [userLogin, setUserLogin] = useState(
    localStorage.getItem("customerID")
  );

  React.useEffect(() => {
    dispatch(getProductRecentOrder(localStorage.getItem("customerID")));
    dispatch(getProductRecentOrderBrand(localStorage.getItem("customerID")));
  }, [dispatch]);

  const handleAddToCart = (proId) => {
    const cartDetailData = {
      proId: proId,
      cartDetailQuantity: 1,
      customerId: localStorage.getItem("customerID"),
    };
    dispatch(addToCart(cartDetailData)).then(() => {
      console.log("Thêm vào giỏ thành công");
      handleOpenSnackbar();

      dispatch(countCartDetail(localStorage.getItem("customerID")));
    });
    console.log("re-render");
  };



  const combinedProducts = [...products, ...products2];

  // Loại bỏ các sản phẩm trùng lặp dựa trên proId
  const uniqueProducts = Array.from(
    new Map(combinedProducts.map((product) => [product.proId, product])).values()
  );

  return (
    <>
      <Box sx={{ flexGrow: 1, marginBottom: 2, marginTop: 3}}>
        <Grid container spacing={2}>
        <Grid item xs={2} sm={0} md={0} lg={0}></Grid>
        <Grid
          item
          xs={8}
          sx={{ backgroundColor: "white" }}
          style={{ paddingLeft: 0 }}
        >
        <Typography variant="h4" sx={{textAlign: 'center', margin: 3}}>Dành cho bạn</Typography>
        <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{padding: 3}}>
            
        
          {uniqueProducts.slice(0,5).map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={2.4} key={product.proId}>
              <Paper elevation={2}>
                <Card
                  
                  sx={{
                    maxWidth: "100%",
                    transition: "transform 0.3s ease-in-out",
                    "&:hover": {
                      transform: "scale(1.05)",
                      cursor: "pointer",
                    },
                  }}
                >
                  <CardMedia
                    sx={{ height: 200, maxWidth: 200 }}
                    image={`http://localhost:9004/api/product/images/${product.proImage}`}
                    title="green iguana"
                    style={{ textAlign: "center" }}
                    onClick={() => navigate(`/product/detail/${product.proId}`)}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h7" component="div">
                      {product.proName}
                    </Typography>
                    <Typography variant="body1" color="red">
                      {formatNumberWithCommas(product.proPrice)} ₫
                    </Typography>
                    <Rating name="read-only" value={4} readOnly />
                  </CardContent>
                  <CardActions>
                    <Button size="small">Mua ngay</Button>
                    <Button size="small">
                      <Link
                        to={`/product/detail/${product.proId}`}
                        style={{ textDecoration: "none" }}
                      >
                        Chi tiết
                      </Link>
                    </Button>
                    {userLogin ? (
                      <Button
                        variant="contained"
                        onClick={() => handleAddToCart(product.proId)}
                      >
                        <ShoppingCartIcon />
                      </Button>
                    ) : (
                      ""
                    )}
                  </CardActions>
                </Card>
              </Paper>
            </Grid>
          ))}
          {/* {products2.slice(0,5).map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={2.4} key={product.proId}>
              <Paper elevation={2}>
                <Card
                  
                  sx={{
                    maxWidth: "100%",
                    transition: "transform 0.3s ease-in-out",
                    "&:hover": {
                      transform: "scale(1.05)",
                      cursor: "pointer",
                    },
                  }}
                >
                  <CardMedia
                    sx={{ height: 200, maxWidth: 200 }}
                    image={`http://localhost:9004/api/product/images/${product.proImage}`}
                    title="green iguana"
                    style={{ textAlign: "center" }}
                    onClick={() => navigate(`/product/detail/${product.proId}`)}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h7" component="div">
                      {product.proName}
                    </Typography>
                    <Typography variant="body1" color="red">
                      {formatNumberWithCommas(product.proPrice)} ₫
                    </Typography>
                    <Rating name="read-only" value={4} readOnly />
                  </CardContent>
                  <CardActions>
                    <Button size="small">Mua ngay</Button>
                    <Button size="small">
                      <Link
                        to={`/product/detail/${product.proId}`}
                        style={{ textDecoration: "none" }}
                      >
                        Chi tiết
                      </Link>
                    </Button>
                    {userLogin ? (
                      <Button
                        variant="contained"
                        onClick={() => handleAddToCart(product.proId)}
                      >
                        <ShoppingCartIcon />
                      </Button>
                    ) : (
                      ""
                    )}
                  </CardActions>
                </Card>
              </Paper>
            </Grid>
          ))} */}
        </Grid>
        </Grid>
        <Grid item xs={2} sm={0} md={0} lg={0}></Grid>
      </Grid>
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
          Thêm vào giỏ hàng thành công!
          <div>
            <Button
              variant="contained"
              color="success"
              size="small"
              sx={{ color: "white" }}
              onClick={() =>
                navigate(`/cart/${localStorage.getItem("customerID")}`)
              }
            >
              Xem giỏ hàng
            </Button>
          </div>
        </Alert>
      </Snackbar>
    </>
  );
}
