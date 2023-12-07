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
import { FormControl, FormControlLabel, Radio, RadioGroup, Select, TextField } from "@mui/material";
import FormLabel from '@mui/material/FormLabel';
import { useDispatch, useSelector } from "react-redux";
import { editBrand, fetchBrands } from "../../../slices/brandSlice";
import { editSupplier, fetchSuppliers } from "../../../slices/supplierSlice";
import { fetchCategories } from "../../../slices/categorySlice";
import { editProduct, fetchProducts } from "../../../slices/productSlice";
import { editBlog, fetchBlogs } from "../../../slices/blogSlice";


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

export default function BlogEditForm(props) {

  const {blog} = props;

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



  const [blogId, setBlogID] = React.useState(blog.blogId);
  const [blogTitle, setBlogTitle] = React.useState(blog.blogTitle);
  const [blogContent, setBlogContent] = React.useState(blog.blogContent);
  const [blogStatus, setBlogStatus] = React.useState(blog.blogStatus);
  const [blogImage, setBlogImage] = React.useState(blog.blogImage);
  const [image, setImage] = React.useState();
//   console.log(proCategory);  

const dispatch = useDispatch();

const handleSubmit = () => {
    const blogData = {
      blogTitle: blogTitle,
      blogContent: blogContent,
      blogStatus: blogContent,
      blogStatus: blogStatus,
      blogImage: blogImage,
      image: image
    }
    console.log(blogData);
    dispatch(editBlog({blogId: blog.blogId, blogData: blogData}))
      .then(() => {
        dispatch(fetchBlogs());
        handleOpenSuccessSnackbar();
        console.log("Cập nhật blog thành công!");
      }).catch((error) => {
        console.log('Cập nhật blog thất bại: ' + error);
      })
    setOpen(false);
}

  return (
    <div>
      <Button
        variant="contained"
        color="warning"
        startIcon={<EditIcon />}
        onClick={handleClickOpen}
        style={{width: '8rem'}}
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
        <DialogTitle>{`Chỉnh Sửa Bài Viết #${blog.blogId}`}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="pro_name"
            label="Tiêu đề"
            type="text"
            fullWidth
            variant="standard"
            value={blogTitle}
            onChange={(e) => {
              setBlogTitle(e.target.value);
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="pro_price"
            label="Nội dung"
            type="text"
            fullWidth
            variant="standard"
            value={blogContent}
            onChange={(e) => {
              setBlogContent(e.target.value);
            }}
          />
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            value={blogStatus}
            onChange={e => {setBlogStatus(e.target.value)}}
          >
            <FormControlLabel value="1" control={<Radio />} label="Hiển thị" />
            <FormControlLabel value="0" control={<Radio />} label="Ẩn" />
          </RadioGroup>
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
      <Snackbar open={openSuccessSnackbar} autoHideDuration={3000} onClose={handleCloseSuccessSnackbar}>
        <Alert onClose={handleCloseSuccessSnackbar} severity="success" sx={{ width: '100%', color: 'white' }}>
          Cập nhật thành công!
        </Alert>
      </Snackbar>
    </div>
  );
}
