import * as React from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  Link,
  useNavigate,
  useParams,
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
import { MenuItem, Select, Stack } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import FilterProductComponent from "../../../components/customer/FilterProductComponent";
import { getProductByCategory } from "../../../slices/productSlice";

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

export default function SearchCategoryPage() {
    console.log("Check render");

    const {cateId} = useParams();
  const navigate = useNavigate();

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

  const [userLogin, setUserLogin] = useState(
    localStorage.getItem("customerID")
  );

  React.useEffect(() => {
    dispatch(getProductByCategory(cateId));
  }, [dispatch, cateId]);

  
  const products = useSelector((state) => state.product.productByCate);

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

  return (
    <>
      <Box sx={{ flexGrow: 1, padding: 3 }}>
        <FilterProductComponent />
        <Grid container rowSpacing={5} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {products.map((product) => (
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
