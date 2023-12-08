import * as React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  getProductByBrand,
  getProductByCategory,
  getProductDetail,
} from "../../slices/productSlice";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Button, CardMedia, Stack, TextField, makeStyles } from "@mui/material";
import { emphasize, styled } from "@mui/material/styles";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Chip from "@mui/material/Chip";
import HomeIcon from "@mui/icons-material/Home";
import Typography from "@mui/material/Typography";
import PaymentIcon from "@mui/icons-material/Payment";
import Rating from "@mui/material/Rating";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Paper from "@mui/material/Paper";
import CommentIcon from "@mui/icons-material/Comment";
import Avatar from "@mui/material/Avatar";
import { addToCart, countCartDetail } from "../../slices/cartSlice";
import { useState } from "react";
import { addComment, fetchCommentByProductID } from "../../slices/commentSlice";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import ProductImageList from "../../components/admin/product/ProductImageList";

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

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(" ")[0][0]}${name.split(" ")[2][0]}`,
  };
}

export default function ProductDetail() {
  console.log("Check render ProductDetail");
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

  const [openSnackbarComment, setOpenSnackbarComment] = React.useState(false);
  const handleOpenSnackbarComment = () => {
    setOpenSnackbarComment(true);
  };
  const handleCloseSnackbarComment = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbarComment(false);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { proId } = useParams();
  const product = useSelector((state) => state.product.product);
  useEffect(() => {
    dispatch(getProductDetail(proId));
  }, [dispatch, proId]);

  useEffect(() => {
    if (product.category && product.category.cateId) {
      dispatch(getProductByCategory(product.category.cateId));
    }
    if (product.brand && product.brand.brandId) {
      dispatch(getProductByBrand(product.brand.brandId));
    }
    dispatch(fetchCommentByProductID(proId));
  }, [dispatch, product, proId]);

  const comments = useSelector((state) => state.comment.comments);
  const productByCate = useSelector((state) => state.product.productByCate);
  const productByBrand = useSelector((state) => state.product.productByBrand);

  const [cartDetailQuantity, setCartDetailQuantity] = useState("1");

  const handleAddToCart = (proId) => {
    const cartDetailData = {
      proId: proId,
      cartDetailQuantity: cartDetailQuantity,
      customerId: localStorage.getItem("customerID"),
    };
    dispatch(addToCart(cartDetailData)).then(() => {
      console.log("Thêm vào giỏ thành công");
      handleOpenSnackbar();

      dispatch(countCartDetail(localStorage.getItem("customerID")));
    });
    console.log("re-render");
  };

  const handleAddToCartAndPay = (proId) => {
    const cartDetailData = {
      proId: proId,
      cartDetailQuantity: cartDetailQuantity,
      customerId: localStorage.getItem("customerID"),
    };
    dispatch(addToCart(cartDetailData)).then(() => {
      console.log("Thêm vào giỏ thành công");
      handleOpenSnackbar();

      dispatch(countCartDetail(localStorage.getItem("customerID")));
    });
    console.log("re-render");
    navigate(`/checkout/${localStorage.getItem("customerID")}`)
  };

  const [cmtContent, setCmtContent] = useState();
  const handleAddComment = () => {
    const commentData = {
      cmtContent: cmtContent,
      product: proId,
      customer: localStorage.getItem("customerID"),
    };
    console.log(commentData);
    dispatch(addComment(commentData)).then(() => {
      handleOpenSnackbarComment();
      dispatch(fetchCommentByProductID(proId));
    });
  };

  return (
    <>
      <Breadcrumbs aria-label="breadcrumb" sx={{ margin: 3 }}>
        <StyledBreadcrumb
          component="a"
          href="/"
          label="Trang chủ"
          icon={<HomeIcon fontSize="small" />}
        />
        <StyledBreadcrumb component="a" href="#" label={product.proName} />
      </Breadcrumbs>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2} sx={{ padding: 6 }}>
          <Grid item xs={6}>
            {/* <img src={`http://localhost:9004/api/product/images/${product.proImage}`}  alt="" /> */}
            <CardMedia
              sx={{ height: "25rem", maxWidth: "25rem" }}
              image={`http://localhost:9004/api/product/images/${product.proImage}`}
              title="green iguana"
              style={{ textAlign: "center" }}
            />
            <ProductImageList />
          </Grid>
          <Grid item xs={6}>
            <Stack spacing={2}>
              <Typography variant="h4" gutterBottom>
                {product.proName}
              </Typography>
              <Typography variant="h5" gutterBottom color={"red"}>
                {formatNumberWithCommas(product.proPrice)} VNĐ
              </Typography>
              <Typography variant="h7" gutterBottom>
                {product.proQuantity > 0 ? "Còn hàng" : "Hết hàng"}
              </Typography>
              <Rating name="read-only" value={4} readOnly />
              <TextField
                margin="dense"
                id="quantity"
                label="Nhập số lượng muốn mua"
                type="number"
                variant="filled"
                defaultValue={cartDetailQuantity}
                onChange={(e) => {
                  setCartDetailQuantity(e.target.value);
                }}
              />
              {product.proQuantity > 0 ? (
                <>
                  <Button variant="outlined" startIcon={<PaymentIcon />} onClick={() => handleAddToCartAndPay(product.proId)}>
                    Mua ngay
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => handleAddToCart(product.proId)}
                    startIcon={<ShoppingCartIcon />}
                  >
                    Thêm vào giỏ hàng
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    disabled
                    variant="outlined"
                    startIcon={<PaymentIcon />}
                    onClick={() => handleAddToCartAndPay(product.proId)}
                  >
                    Mua ngay
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => handleAddToCart(product.proId)}
                    startIcon={<ShoppingCartIcon />}
                    disabled
                  >
                    Thêm vào giỏ hàng
                  </Button>
                </>
              )}

              <Typography variant="body1" gutterBottom>
                Mô tả: {product.proDesc}

              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </Box>
      <Grid container spacing={2} sx={{ padding: 6 }}>
        <Grid item xs={9}>
          <Paper sx={{ padding: 3 }}>
            <Typography variant="h6" gutterBottom>
              Bình luận
            </Typography>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={{ xs: 1, sm: 2, md: 4 }}
            >
              <TextField
                fullWidth
                id="outlined-basic"
                label="Viết bình luận của bạn"
                variant="outlined"
                onChange={(e) => setCmtContent(e.target.value)}
              />
              <Button
                size="small"
                startIcon={<CommentIcon />}
                variant="contained"
                sx={{ marginTop: 2 }}
                onClick={() => handleAddComment()}
              >
                Gửi bình luận
              </Button>
            </Stack>

            <Typography variant="h6" gutterBottom sx={{ marginTop: 2 }}>
              {comments.length} bình luận về sản phẩm này
            </Typography>
            <Box sx={{ marginTop: 2 }}>
              <Stack spacing={2}>
                {comments.map((comment) => (
                  <Stack key={comment.cmtId} direction="row" spacing={2}>
                    {comment.user.userImage == null ? (
                      <Avatar {...stringAvatar(`${comment.user.userName}`)} />
                    ) : (
                      <Avatar
                        alt="Remy Sharp"
                        src={`http://localhost:9004/api/product/images/${comment.user.userImage}`}
                      />
                    )}
                    <Stack spacing={1}>
                      <div>
                        <b>{comment.user.userName}</b>
                      </div>
                      <div>{comment.cmtContent}</div>
                      <div>{formatDateTime(comment.cmtTime)}</div>
                    </Stack>
                  </Stack>
                ))}
              </Stack>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="h6" gutterBottom>
            Sản phẩm tương tự
          </Typography>
          <Stack spacing={2}>
            {productByCate.slice(0, 5).map((product) => (
              <Paper key={product.proId}>
                <Grid container>
                  <Grid item xs={4} sx={{ padding: 1 }}>
                    <CardMedia
                      sx={{ height: "5rem", maxWidth: "5rem" }}
                      image={`http://localhost:9004/api/product/images/${product.proImage}`}
                      title="green iguana"
                      style={{ textAlign: "center" }}
                    />
                  </Grid>
                  <Grid item xs={8}>
                    <Stack spacing={2}>
                      <div>{product.proName}</div>
                      <div>
                        {product.proPrice.toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </div>
                    </Stack>
                  </Grid>
                </Grid>
              </Paper>
            ))}
          </Stack>
        </Grid>
      </Grid>

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
          <div>Xem giỏ hàng</div>
        </Alert>
      </Snackbar>

      <Snackbar
        open={openSnackbarComment}
        autoHideDuration={3000}
        onClose={handleCloseSnackbarComment}
      >
        <Alert
          onClose={handleCloseSnackbarComment}
          severity="success"
          sx={{ width: "100%", color: "white" }}
        >
          Bình luận thành công!
        </Alert>
      </Snackbar>
    </>
  );
}
