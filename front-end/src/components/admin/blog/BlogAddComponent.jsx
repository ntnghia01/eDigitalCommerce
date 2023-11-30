import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import AddIcon from "@mui/icons-material/Add";
import { TextField } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

// Redux
import { useDispatch } from "react-redux";
import { addBlog, fetchBlogs } from "../../../slices/blogSlice";

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

export default function BlogAddComponent() {
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

  const [blogTitle, setBlogTitle] = React.useState();
  const [blogContent, setBlogContent] = React.useState();
  const [image, setImage] = React.useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newBlog = {
      blogTitle: blogTitle,
      blogContent: blogContent,
      userId: localStorage.getItem("adminID"),
      blogImage: image.name,
      image: image
    };
    console.log(newBlog);
    dispatch(addBlog(newBlog))
      .then(() => {
        dispatch(fetchBlogs());
        handleOpenSnackbar();
        console.log("Thêm blog thành công!");
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
        Thêm bài viết mới
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Thêm Bài Viết Mới"}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="pro_name"
            label="Nhập tiêu đề"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => {
              setBlogTitle(e.target.value);
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="pro_desc"
            label="Nhập nội dung bài viết"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => {
              setBlogContent(e.target.value);
            }}
          />
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
          Thêm blog mới thành công!
        </Alert>
      </Snackbar>
    </div>
  );
}
