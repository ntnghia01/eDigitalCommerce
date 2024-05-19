import * as React from "react";
import {
  BrowserRouter,
  Route,
  Routes,
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
import {
  fetchAvailableProducts,
  fetchProducts,
  lowToHigh,
} from "../../slices/productSlice";
import { useState } from "react";
import { addToCart, countCartDetail } from "../../slices/cartSlice";
import { MenuItem, Select, Stack } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

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

export default function FilterProductComponent() {
    console.log("Check render");
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
  const products = useSelector((state) => state.product.products);

  const [userLogin, setUserLogin] = useState(
    localStorage.getItem("customerID")
  );

  React.useEffect(() => {
    dispatch(fetchAvailableProducts());
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

  const [sortByPrice, setSortByPrice] = useState("");
  const [sortByPrice2, setSortByPrice2] = useState("");
  const [sortByPrice3, setSortByPrice3] = useState("");
  const [sortByPrice4, setSortByPrice4] = useState("");

  const handleSortByPrice = (value) => {
    setSortByPrice(value);
    if (value === "priceLowToHigh") {
      dispatch(lowToHigh()); // Gọi action dispatch lowToHigh
    }
    // Các điều kiện xử lý cho các lựa chọn sắp xếp khác nếu cần
  };

  return (
    <>
      <Box sx={{ marginBottom: 2, marginTop: -3 }}>
        <Stack direction="row" spacing={2} alignItems="center">
          <Box>Sắp xếp theo:</Box>
          <Select
            displayEmpty
            inputProps={{ "aria-label": "Sắp xếp sản phẩm" }}
            renderValue={(selected) =>
              selected ? `Sắp xếp theo: ${selected}` : "A-Z"
            }
            sx={{ height: 30 }}
            value={sortByPrice}
            onChange={(e) => setSortByPrice(e.target.value)}
          >
            <MenuItem value="" disabled>
              Sắp xếp theo giá
            </MenuItem>
            <MenuItem value="priceLowToHigh">Giá: Thấp đến cao</MenuItem>
            <MenuItem value="priceHighToLow">Giá: Cao đến thấp</MenuItem>
            <MenuItem value="newestFirst">
              Độ mới: Mới nhất đến cũ nhất
            </MenuItem>
            <MenuItem value="oldestFirst">
              Độ mới: Cũ nhất đến mới nhất
            </MenuItem>
          </Select>
          <Select
            displayEmpty
            inputProps={{ "aria-label": "Sắp xếp sản phẩm" }}
            renderValue={(selected) =>
              selected ? `Sắp xếp theo: ${selected}` : "Danh mục"
            }
            sx={{ height: 30 }}
            value={sortByPrice}
            onChange={(e) => setSortByPrice(e.target.value)}
          >
            <MenuItem value="" disabled>
              Sắp xếp theo giá
            </MenuItem>
            <MenuItem value="priceLowToHigh">Giá: Thấp đến cao</MenuItem>
            <MenuItem value="priceHighToLow">Giá: Cao đến thấp</MenuItem>
            <MenuItem value="newestFirst">
              Độ mới: Mới nhất đến cũ nhất
            </MenuItem>
            <MenuItem value="oldestFirst">
              Độ mới: Cũ nhất đến mới nhất
            </MenuItem>
          </Select>
          <Select
            displayEmpty
            inputProps={{ "aria-label": "Sắp xếp sản phẩm" }}
            renderValue={(selected) =>
              selected ? `Sắp xếp theo: ${selected}` : "Thương hiệu"
            }
            sx={{ height: 30 }}
            value={sortByPrice}
            onChange={(e) => setSortByPrice(e.target.value)}
          >
            <MenuItem value="" disabled>
              Sắp xếp theo giá
            </MenuItem>
            <MenuItem value="priceLowToHigh">Giá: Thấp đến cao</MenuItem>
            <MenuItem value="priceHighToLow">Giá: Cao đến thấp</MenuItem>
            <MenuItem value="newestFirst">
              Độ mới: Mới nhất đến cũ nhất
            </MenuItem>
            <MenuItem value="oldestFirst">
              Độ mới: Cũ nhất đến mới nhất
            </MenuItem>
          </Select>
          <Select
            // value={sortBy}
            // onChange={handleSortChange}
            displayEmpty
            inputProps={{ "aria-label": "Sắp xếp sản phẩm" }}
            renderValue={(selected) =>
              selected ? `Sắp xếp theo: ${selected}` : "Giá"
            }
            sx={{ height: 30 }}
            value={sortByPrice}
            onChange={(e) => setSortByPrice(e.target.value)}
            abel="OK"
          >
            <MenuItem value="" disabled>
              Sắp xếp theo giá
            </MenuItem>
            <MenuItem value="priceLowToHigh">Giá: Thấp đến cao</MenuItem>
            <MenuItem value="priceHighToLow">Giá: Cao đến thấp</MenuItem>
            <MenuItem value="newestFirst">
              Độ mới: Mới nhất đến cũ nhất
            </MenuItem>
            <MenuItem value="oldestFirst">
              Độ mới: Cũ nhất đến mới nhất
            </MenuItem>
          </Select>
          <Select
            displayEmpty
            inputProps={{ "aria-label": "Sắp xếp sản phẩm" }}
            renderValue={(selected) =>
              selected ? `Sắp xếp theo: ${selected}` : "Mới nhất"
            }
            sx={{ height: 30 }}
            value={sortByPrice}
            onChange={(e) => setSortByPrice(e.target.value)}
          >
            <MenuItem value="" disabled>
              Sắp xếp theo giá
            </MenuItem>
            <MenuItem value="priceLowToHigh">Giá: Thấp đến cao</MenuItem>
            <MenuItem value="priceHighToLow">Giá: Cao đến thấp</MenuItem>
            <MenuItem value="newestFirst">
              Độ mới: Mới nhất đến cũ nhất
            </MenuItem>
            <MenuItem value="oldestFirst">
              Độ mới: Cũ nhất đến mới nhất
            </MenuItem>
          </Select>
          <Select
            displayEmpty
            inputProps={{ "aria-label": "Sắp xếp sản phẩm" }}
            renderValue={(selected) =>
              selected ? `Sắp xếp theo: ${selected}` : "Số lượng còn lại"
            }
            sx={{ height: 30 }}
            value={sortByPrice}
            onChange={(e) => setSortByPrice(e.target.value)}
          >
            <MenuItem value="" disabled>
              Sắp xếp theo giá
            </MenuItem>
            <MenuItem value="priceLowToHigh">Giá: Thấp đến cao</MenuItem>
            <MenuItem value="priceHighToLow">Giá: Cao đến thấp</MenuItem>
            <MenuItem value="newestFirst">
              Độ mới: Mới nhất đến cũ nhất
            </MenuItem>
            <MenuItem value="oldestFirst">
              Độ mới: Cũ nhất đến mới nhất
            </MenuItem>
          </Select>
          {/* <Select
            displayEmpty
            inputProps={{ "aria-label": "Sắp xếp sản phẩm" }}
            renderValue={(selected) =>
              selected ? `Sắp xếp theo: ${selected}` : "Lượt mua"
            }
            sx={{ height: 30 }}
            value={sortByPrice}
            onChange={(e) => setSortByPrice(e.target.value)}
          >
            <MenuItem value="" disabled>
              Sắp xếp theo giá
            </MenuItem>
            <MenuItem value="priceLowToHigh">Giá: Thấp đến cao</MenuItem>
            <MenuItem value="priceHighToLow">Giá: Cao đến thấp</MenuItem>
            <MenuItem value="newestFirst">
              Độ mới: Mới nhất đến cũ nhất
            </MenuItem>
            <MenuItem value="oldestFirst">
              Độ mới: Cũ nhất đến mới nhất
            </MenuItem>
          </Select> */}
                <Select
        displayEmpty
        inputProps={{ "aria-label": "Sắp xếp sản phẩm" }}
        renderValue={(selected) =>
          selected ? `Sắp xếp theo: ${selected}` : "Giá: Thấp đến cao"
        }
        sx={{ height: 30 }}
        value={sortByPrice}
        onChange={(e) => handleSortByPrice(e.target.value)}
      >
        <MenuItem value="" disabled>
          Sắp xếp theo giá
        </MenuItem>
        <MenuItem value="priceLowToHigh">Giá: Thấp đến cao</MenuItem>
        {/* Các MenuItem khác */}
      </Select>
          <Select
            displayEmpty
            inputProps={{ "aria-label": "Sắp xếp sản phẩm" }}
            renderValue={(selected) =>
              selected ? `Sắp xếp theo: ${selected}` : "Nhà cung cấp"
            }
            sx={{ height: 30 }}
            value={sortByPrice}
            onChange={(e) => setSortByPrice(e.target.value)}
          >
            <MenuItem value="" disabled>
              Sắp xếp theo giá
            </MenuItem>
            <MenuItem value="priceLowToHigh">Giá: Thấp đến cao</MenuItem>
            <MenuItem value="priceHighToLow">Giá: Cao đến thấp</MenuItem>
            <MenuItem value="newestFirst">
              Độ mới: Mới nhất đến cũ nhất
            </MenuItem>
            <MenuItem value="oldestFirst">
              Độ mới: Cũ nhất đến mới nhất
            </MenuItem>
          </Select>
        </Stack>
      </Box>
    </>
  );
}
