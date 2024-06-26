import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import AddIcon from "@mui/icons-material/Add";
import { Box, Select, Stack, TextField, Typography } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories, fetchCategoriesAvailable } from "../../../slices/categorySlice";
import { fetchBrands, fetchBrandsAvailable } from "../../../slices/brandSlice";
import { addProduct, fetchProducts } from "../../../slices/productSlice";
import StandardImageList from "./ProductImageList";
import { useState } from "react";
import { addImage } from "../../../slices/imageSlice";
import { Transition, Alert, VisuallyHiddenInput } from "../../../components/customize/CustomizeComponent";

export default function ProductAddForm() {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    
    dispatch(fetchCategoriesAvailable());
    dispatch(fetchBrandsAvailable());
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setIsNull();
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



  React.useEffect(() => {
    dispatch(fetchCategoriesAvailable());
    dispatch(fetchBrandsAvailable());
  }, [dispatch]);

  

  const categoryData = useSelector((state) => state.categories.categories);
  const brandData = useSelector((state) => state.brand.brands);

  const [proName, setProName] = React.useState();
  const [proPrice, setProPrice] = React.useState();
  const [proDesc, setProDesc] = React.useState('');
  const [proQuantity, setProQuantity] = React.useState("0");
  const [proCategory, setProCategory] = React.useState();
  const [proBrand, setProBrand] = React.useState();
  const [image, setImage] = React.useState();

  const [isNull, setIsNull] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!proName) {
      setIsNull("proName");
    } else if (!proPrice) {
      setIsNull("proPrice");
    }  else if (!proCategory) {
      setIsNull("proCategory");
    } else if (!proBrand) {
      setIsNull("proBrand");
    } else if (!image) {
      setIsNull("image");
    } else {
      const newProduct = {
        proName: proName,
        proPrice: proPrice,
        proDesc: proDesc,
        proQuantity: proQuantity,
        cateId: proCategory,
        brandId: proBrand,
        proImage: image.name,
        image: image,
      };
      console.log(newProduct);
      console.log(imagesDetail);
      // dispatch(addProduct(newProduct))
      //   .then(() => {
      //     // add image
      //     const proId = resultAction.payload.productObject.proId;
      //     dispatch(addImage({ proId, image: imageData }));
  
      //     dispatch(fetchProducts());
      //     handleOpenSnackbar();
      //     console.log("Thêm sản phẩm thành công!");
      //     setOpen(false);
      //   })
      //   .catch((error) => {
      //     console.log("Thêm thất bại: " + error);
      //   });
      dispatch(addProduct(newProduct))
        .then((resultAction) => {
          // Lấy proId từ response của addProduct
          const proId = resultAction.payload.productObject.proId;
      
          // Tạo một mảng promises để lưu trữ các hàm addImage cho từng image trong imagesDetail
          const addImagePromises = imagesDetail.map((item) => {
            return dispatch(addImage({ proId, image: item.file }));
          });
      
          // Sử dụng Promise.all để đợi tất cả các hàm addImage hoàn thành
          return Promise.all(addImagePromises);
        })
        .then(() => {
          // Thực hiện các thao tác sau khi đã thêm hình ảnh thành công
          dispatch(fetchProducts());
          handleOpenSnackbar();
          console.log("Thêm sản phẩm và hình ảnh thành công!");
          setOpen(false);
        })
        .catch((error) => {
          console.log("Thêm sản phẩm hoặc hình ảnh thất bại: " + error);
        });
    }
    

  };

  const [imageURL, setImageURL] = useState("");

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const uploadedImageURL = e.target.result;
        setImageURL(uploadedImageURL);
      };
      reader.readAsDataURL(file);
    }
  };

  const [imagesDetail, setImagesDetail] = useState([]);

  // const handleImageUploadDetail = (files) => {
  //   const updatedImagesDetail = [...imagesDetail];
  //   for (let i = 0; i < files.length; i++) {
  //     const reader = new FileReader();
  //     reader.onload = (e) => {
  //       const uploadedImageURL = e.target.result;
  //       updatedImagesDetail.push({ image: uploadedImageURL });
  //       setImagesDetail(updatedImagesDetail);
  //     };
  //     reader.readAsDataURL(files[i]);
  //   }
  // };

  const handleImageUploadDetail = (files) => {
    const updatedImagesDetail = [...imagesDetail];
  
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      updatedImagesDetail.push({ file }); // Lưu trữ file vào mảng imagesDetail
    }
  
    setImagesDetail(updatedImagesDetail);
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
            required
            error={isNull == 'proName' ? true : false}
            helperText={isNull == 'proName' ? "Tên sản phẩm là bắt buộc" : ""}
          />
          <TextField
            autoFocus
            margin="dense"
            id="pro_price"
            label="Nhập giá sản phẩm"
            type="number"
            fullWidth
            variant="standard"
            onChange={(e) => {
              setProPrice(e.target.value);
            }}
            inputProps={{ min: 0 }}
            required
            error={isNull == 'proPrice' ? true : false}
            helperText={isNull == 'proPrice' ? "Giá sản phẩm là bắt buộc" : ""}
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
            type="number"
            fullWidth
            variant="standard"
            defaultValue={proQuantity}
            onChange={(e) => {
              setProQuantity(e.target.value);
            }}
            inputProps={{ min: 0 }}
          />
          <FormControl fullWidth sx={{ mt: 3 }}>
            <InputLabel id="demo-simple-select-label">Danh mục *</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              defaultValue=""
              label="Danh mục"
              onChange={(e) => {
                setProCategory(e.target.value);
              }}
              required
              error={isNull == 'proCategory' ? true : false}
              // helperText={isNull == 'proCategory' ? "Vui lòng chọn danh mục cho sản phẩm" : ""}
            >
              {categoryData.map((category) => (
                <MenuItem key={category.cateId} value={category.cateId}>
                  {category.cateName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ mt: 3 }}>
            <InputLabel id="demo-simple-select-label">Thương hiệu *</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              defaultValue=""
              label="Thương hiệu"
              onChange={(e) => {
                setProBrand(e.target.value);
              }}
              required
              error={isNull == 'proBrand' ? true : false}
              // helperText={isNull == 'proBrand' ? "Vui lòng chọn thương hiệu cho sản phẩm" : ""}
            >
              {brandData.map((brand) => (
                <MenuItem key={brand.brandId} value={brand.brandId}>
                  {brand.brandName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Stack spacing={2}>
            <Button
              component="label"
              variant="contained"
              style={{ marginTop: 20 }}
              startIcon={<CloudUploadIcon />}
            >
              Upload hình ảnh chính
              <VisuallyHiddenInput
                type="file"
                accept="image/*"
                onChange={(e) => {
                  setImage(e.target.files[0]);
                  handleImageUpload(e);
                }}
              />
            </Button>
            {imageURL && (
              <Box
                mt={2}
                display="flex"
                flexDirection="column"
                alignItems="center"
              >
                <Typography variant="subtitle1">Hình ảnh chính:</Typography>
                {imageURL && (
                  <img
                    src={imageURL}
                    alt="Uploaded"
                    style={{
                      maxWidth: "20%",
                      marginTop: "8px",
                      marginLeft: "auto",
                      marginRight: "auto",
                      display: "block",
                    }}
                  />
                )}
              </Box>
            )}
            {
              isNull == 'image' ? <Typography color="red" fontSize={15}>*Vui lòng upload ít nhất một hình ảnh cho sản phẩm</Typography> : null
            }
            <Button
              component="label"
              variant="contained"
              style={{ marginTop: 20 }}
              startIcon={<CloudUploadIcon />}
            >
              Upload hình ảnh liên quan
              <VisuallyHiddenInput
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => {
                  const files = e.target.files;
                  handleImageUploadDetail(files);
                }}
              />
            </Button>
            {/* {imagesDetail.map((item, index) => (
              <Box
                key={index}
                mt={2}
                display="flex"
                flexDirection="column"
                alignItems="center"
              >
                <Typography variant="subtitle1">
                  Hình ảnh {index + 1}:
                </Typography>
                <img
                  src={item.image}
                  alt={`Uploaded ${index + 1}`}
                  style={{
                    maxWidth: "20%",
                    marginTop: "8px",
                    marginLeft: "auto",
                    marginRight: "auto",
                    display: "block",
                  }}
                />
              </Box>
            ))} */}
            {imagesDetail.map((item, index) => (
  <Box
    key={index}
    mt={2}
    display="flex"
    flexDirection="column"
    alignItems="center"
  >
    <Typography variant="subtitle1">
      Hình ảnh {index + 1}:
    </Typography>
    <img
      src={URL.createObjectURL(item.file)}
      alt={`Uploaded ${index + 1}`}
      style={{
        maxWidth: "20%",
        marginTop: "8px",
        marginLeft: "auto",
        marginRight: "auto",
        display: "block",
      }}
    />
  </Box>
))}

          </Stack>
          {/* <StandardImageList /> */}
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
