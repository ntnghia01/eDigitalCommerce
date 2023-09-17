import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import AddIcon from "@mui/icons-material/Add";
import { Select, TextField } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';

// Redux
import { useDispatch, useSelector } from "react-redux";
import { addBrand, fetchBrands } from "../../../slices/brandSlice";
import { addSupplier, fetchSuppliers } from "../../../slices/supplierSlice";
import { addProduct, fetchProducts } from "../../../slices/productSlice";
import { fetchCategories } from "../../../slices/categorySlice";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function ProductAddForm() {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

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
//   const [categoryData, setCategoryData] = React.useState([]);
//   const [brandData, setBrandData] = React.useState([]);
  const categoryData = useSelector((state) => state.categories.categories);
  const brandData = useSelector((state) => state.brand.brands);



  React.useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchBrands());
  }, [dispatch]);
//   console.log(categoryData);
//   console.log(brandData);

  const [proName, setProName] = React.useState();
  const [proPrice, setProPrice] = React.useState();
  const [proDesc, setProDesc] = React.useState();
  const [proQuantity, setProQuantity] = React.useState(0);
  const [proCategory, setProCategory] = React.useState();
  const [proBrand, setProBrand] = React.useState();



  const handleSubmit = (e) => {
    e.preventDefault();
    const newProduct = {
      proName: proName,
      proPrice: proPrice,
      proDesc: proDesc,
      proQuantity: proQuantity,
      proCategory: proCategory,
      proBrand: proBrand,
    };
    // console.log(newSupplier);
    dispatch(addProduct(newSupplier))
      .then(() => {
        dispatch(fetchProducts());
        handleOpenSnackbar();
        console.log("Thêm sản phẩm thành công!");
      })
      .catch((error) => {
        console.log("Thêm thất bại: " + error);
      });
    setOpen(false);
  };

  return (
    <div>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={handleClickOpen}
      >
        Thêm mới
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Thêm Sản Phẩm Mới"}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="pro_name"
            label="Nhập tên sản phẩm"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => {
              setProName(e.target.value);
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="pro_price"
            label="Nhập giá sản phẩm"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => {
              setProPrice(e.target.value);
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="pro_desc"
            label="Nhập mô tả sản phẩm"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => {
              setProDesc(e.target.value);
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="pro_quantity"
            label="Nhập số lượng ban đầu"
            type="text"
            fullWidth
            variant="standard"
            defaultValue={proPrice}
            onChange={(e) => {
              setProQuantity(e.target.value);
            }}
          />
          <FormControl fullWidth sx={{mt: 3}}>
            <InputLabel id="demo-simple-select-label">Danh mục</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              defaultValue=""
              label="Danh mục"
              onChange={(e) => {
                setProCategory(e.target.value);
              }}
            >
                {categoryData.map((category) => (
                    <MenuItem key={category.cateId} value={category.cateId}>{category.cateName}</MenuItem>
                ))}
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{mt: 3}}>
            <InputLabel id="demo-simple-select-label">Thương hiệu</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              defaultValue=""
              label="Thương hiệu"
              onChange={(e) => {
                setProBrand(e.target.value);
              }}
            >
              {brandData.map((brand) => (
                    <MenuItem key={brand.brandId} value={brand.brandId}>{brand.brandName}</MenuItem>
                ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit}>Xác nhận</Button>
          <Button onClick={handleClose}>Hủy</Button>
        </DialogActions>
      </Dialog>
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
          Thêm mới thành công!
        </Alert>
      </Snackbar>
    </div>
  );
}
