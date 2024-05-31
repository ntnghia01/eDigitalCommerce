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
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import EditIcon from '@mui/icons-material/Edit';

// import Icons
import UpdateIcon from "@mui/icons-material/Update";
import { Box, FormControl, FormControlLabel, Radio, RadioGroup, Select, Stack, TextField, Typography } from "@mui/material";
import FormLabel from '@mui/material/FormLabel';
import { useDispatch, useSelector } from "react-redux";
import { editBrand, fetchBrands, fetchBrandsAvailable } from "../../../slices/brandSlice";
import { editSupplier, fetchSuppliers } from "../../../slices/supplierSlice";
import { fetchCategories, fetchCategoriesAvailable } from "../../../slices/categorySlice";
import { editProduct, fetchProducts } from "../../../slices/productSlice";
import StandardImageList from "./ProductImageList";
import { useEffect, useCallback } from "react";
import { Transition, Alert, VisuallyHiddenInput } from "../../customize/CustomizeComponent";


const ProductEditForm = React.memo(({ product, onClose }) => {
  console.log("ProductEditForm", product.proId);

  console.log(product);

  const [open, setOpen] = React.useState(true);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = useCallback(() => {
    setOpen(false);
    onClose();
  }, [onClose]);

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

  console.log(categoryData);

  useEffect(() => {
    dispatch(fetchCategoriesAvailable());
    dispatch(fetchBrandsAvailable());
  }, [dispatch, product.proId]);

  const [proId, setProductID] = React.useState(product.proId);
  const [proName, setProductName] = React.useState(product.proName);
  const [proPrice, setProductPrice] = React.useState(product.proPrice);
  const [proDesc, setProductDesc] = React.useState(product.proDesc);
  const [proQuantity, setProductQuantity] = React.useState(product.proQuantity);
  const [proStatus, setProductStatus] = React.useState(product.proStatus);
  const [proCategory, setProductCategory] = React.useState(product.category.cateId);
  const [proBrand, setProductBrand] = React.useState(product.brand.brandId);
  const [proImage, setProImage] = React.useState(product.proImage);
  const [image, setImage] = React.useState();
//   console.log(proCategory);

  const updateProductData = {
    proName: proName,
    proPrice: proPrice,
    proDesc: proDesc,
    proQuantity: proQuantity,
    cateId: proCategory,
    brandId: proBrand,
    proStatus: proStatus,
    proImage: proImage,
    image: image
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    
    console.log(updateProductData);
    dispatch(editProduct({proId: proId, productData: updateProductData}))
      .then(() => {
        dispatch(fetchProducts());
        handleOpenSuccessSnackbar();
        console.log("Cập nhật sản phẩm thành công!");
        onClose();
      })
      .catch((error) => {
        console.log('Cập nhật sản phẩm thất bại: ' + error);
      })
    setOpen(false);
  };
   

  return (
    <>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{`Chỉnh Sửa Sản Phẩm #${product.proId}`}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="pro_name"
            label="Nhập tên sản phẩm *"
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
            label="Nhập giá sản phẩm *"
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
          {/* <TextField
            autoFocus
            margin="dense"
            id="pro_quantity"
            label="Nhập số lượng ban đầu *"
            type="text"
            fullWidth
            variant="standard"
            value={proQuantity}
            onChange={(e) => {
              setProductQuantity(e.target.value);
            }}
          /> */}
          <FormControl fullWidth sx={{mt: 3}}>
            <InputLabel id="demo-simple-select-label">Danh mục *</InputLabel>
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
            <InputLabel id="demo-simple-select-label-2">Thương hiệu *</InputLabel>
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
          
          <Stack spacing={2}>
          <Button component="label" variant="contained" style={{marginTop: 20}} startIcon={<CloudUploadIcon />}>
            Upload hình ảnh chính
            <VisuallyHiddenInput type="file" onChange={(e) => { setImage(e.target.files[0]); }}/>
          </Button>
          <img
            // srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            src={`http://localhost:9004/api/product/images/${product.proImage}`}
            alt={product.proName}
            loading="lazy"
            style={{width: "100px", height: "100px"}}
          />
          
            {/* <Button
              component="label"
              variant="contained"
              style={{ marginTop: 20 }}
              startIcon={<CloudUploadIcon />}
            >
              Upload hình ảnh liên quan
              <VisuallyHiddenInput
                type="file"
                onChange={(e) => {
                  setImage(e.target.files[0]);
                }}
              />
            </Button> */}
          </Stack>
          {/* <StandardImageList proId={proId}/> */}
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
    </>
  );
});

export default ProductEditForm;
