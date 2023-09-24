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
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

// Redux
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../../slices/categorySlice";
import { fetchBrands } from "../../../slices/brandSlice";
import { addProduct, fetchProducts } from "../../../slices/productSlice";

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

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

  const categoryData = useSelector((state) => state.categories.categories);
  const brandData = useSelector((state) => state.brand.brands);

  React.useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchBrands());
  }, [dispatch]);

  const [proName, setProName] = React.useState();
  const [proPrice, setProPrice] = React.useState();
  const [proDesc, setProDesc] = React.useState();
  const [proQuantity, setProQuantity] = React.useState("0");
  const [proCategory, setProCategory] = React.useState();
  const [proBrand, setProBrand] = React.useState();
  const [image, setImage] = React.useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProduct = {
      proName: proName,
      proPrice: proPrice,
      proDesc: proDesc,
      proQuantity: proQuantity,
      cateId: proCategory,
      brandId: proBrand,
      proImage: image.name,
      image: image
    };
    console.log(newProduct);
    dispatch(addProduct(newProduct))
      .then(() => {
        dispatch(fetchProducts());
        handleOpenSnackbar();
        console.log("Thêm sản phẩm thành công!");
        setOpen(false);
      })
      .catch((error) => {
        console.log("Thêm thất bại: " + error);
      });
    
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
            defaultValue={proQuantity}
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
          <Button component="label" variant="contained" style={{marginTop: 20}} startIcon={<CloudUploadIcon />}>
            Upload hình ảnh
            <VisuallyHiddenInput type="file" onChange={(e) => { setImage(e.target.files[0]); }}/>
          </Button>
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
