import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';

// import Icons
import UpdateIcon from "@mui/icons-material/Update";
import { FormControl, FormControlLabel, Radio, RadioGroup, Select, TextField } from "@mui/material";
import FormLabel from '@mui/material/FormLabel';
import { useDispatch, useSelector } from "react-redux";
import { editBrand, fetchBrands } from "../../../slices/brandSlice";
import { editSupplier, fetchSuppliers } from "../../../slices/supplierSlice";
import { fetchCategories } from "../../../slices/categorySlice";
import { editProduct, fetchProducts } from "../../../slices/productSlice";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function ProductEditForm(props) {

  const existProduct = props.data;
//   console.log(existProduct);

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [openSuccessSnackbar, setOpenSuccessSnackbar] = React.useState(false);
  const handleOpenSuccessSnackbar = () => {
    setOpenSuccessSnackbar(true);
  };
  const handleCloseSuccessSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSuccessSnackbar(false);
  };

  const dispatch = useDispatch();

  const categoryData = useSelector((state) => state.categories.categories);
  const brandData = useSelector((state) => state.brand.brands);

  React.useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchBrands());
  }, [dispatch]);

  const [proId, setProductID] = React.useState(existProduct.id);
  const [proName, setProductName] = React.useState(existProduct.name);
  const [proPrice, setProductPrice] = React.useState(existProduct.price);
  const [proDesc, setProductDesc] = React.useState(existProduct.desc);
  const [proQuantity, setProductQuantity] = React.useState(existProduct.quantity);
  const [proStatus, setProductStatus] = React.useState(existProduct.status);
  const [proCategory, setProductCategory] = React.useState(existProduct.category);
  const [proBrand, setProductBrand] = React.useState(existProduct.brand);
//   console.log(proCategory);
  const handleSubmit = (e) => {
    e.preventDefault();
    const updateProductData = {
        proName: proName,
        proPrice: proPrice,
        proDesc: proDesc,
        proQuantity: proQuantity,
        proStatus: proStatus,
        cateId: proCategory,
        brandId: proBrand
    }
    // console.log(updateProductData);
    dispatch(editProduct({proId: proId, productData: updateProductData}))
      .then(() => {
        dispatch(fetchProducts());
        handleOpenSuccessSnackbar();
        console.log("Cập nhật sản phẩm thành công!");
      })
      .catch((error) => {
        console.log('Cập nhật sản phẩm thất bại: ' + error);
      })
    setOpen(false);
  };
   

  return (
    <div>
      <Button
        variant="contained"
        color="warning"
        startIcon={<UpdateIcon />}
        onClick={handleClickOpen}
      >
        Cập nhật
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{`Chỉnh Sửa Nhà Cung Cấp ID=${props.data.id}`}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="pro_name"
            label="Nhập tên sản phẩm"
            type="text"
            fullWidth
            variant="standard"
            value={proName}
            onChange={(e) => {
              setProductName(e.target.value);
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
            value={proPrice}
            onChange={(e) => {
              setProductPrice(e.target.value);
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
            value={proDesc}
            onChange={(e) => {
              setProductDesc(e.target.value);
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
            value={proQuantity}
            onChange={(e) => {
              setProductQuantity(e.target.value);
            }}
          />
          <FormControl fullWidth sx={{mt: 3}}>
            <InputLabel id="demo-simple-select-label">Danh mục</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Danh mục"
              value={proCategory}
              onChange={(e) => {
                setProductCategory(e.target.value);
              }}
            >
                {categoryData.map((category) => (
                    <MenuItem key={category.cateId} value={category.cateId + ""}>{category.cateName}</MenuItem>
                ))}
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{mt: 3}}>
            <InputLabel id="demo-simple-select-label-2">Thương hiệu</InputLabel>
            <Select
              labelId="demo-simple-select-label-2"
              id="demo-simple-select-2"
              label="Thương hiệu"
              value={proBrand}
              onChange={(e) => {
                setProductBrand(e.target.value);
              }}
            >
              {brandData.map((brand) => (
                    <MenuItem key={brand.brandId} value={brand.brandId + ""}>{brand.brandName}</MenuItem>
                ))}
            </Select>
          </FormControl>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            value={proStatus}
            onChange={e => {setProductStatus(e.target.value)}}
          >
            <FormControlLabel value="1" control={<Radio />} label="Hoạt động" />
            <FormControlLabel value="0" control={<Radio />} label="Không hoạt động" />
          </RadioGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit}>Xác nhận</Button>
          <Button onClick={handleClose}>Hủy</Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={openSuccessSnackbar} autoHideDuration={3000} onClose={handleCloseSuccessSnackbar}>
        <Alert onClose={handleCloseSuccessSnackbar} severity="success" sx={{ width: '100%', color: 'white' }}>
          Cập nhật thành công!
        </Alert>
      </Snackbar>
    </div>
  );
}
