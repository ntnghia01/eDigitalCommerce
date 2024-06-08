import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import AddIcon from "@mui/icons-material/Add";
import { TextField, Typography } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

// Redux
import { useDispatch } from "react-redux";
import { addBlog, fetchBlogs } from "../../../slices/blogSlice";
import { useState } from "react";
import { VisuallyHiddenInput, Transition, Alert } from "../../../customize/CustomizeComponent";


export default function BlogAddComponent() {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
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

  const [blogTitle, setBlogTitle] = React.useState();
  const [blogContent, setBlogContent] = React.useState();
  const [image, setImage] = React.useState();
  const [isNull, setIsNull] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!blogTitle) {
      setIsNull("blogTitle");
    } else if (!blogContent) {
      setIsNull("blogContent");
    } else if (!image) {
      setIsNull("image");
    } else {
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
          handleClose();
        })
        .catch((error) => {
          console.log("Thêm thất bại: " + error);
        });
    }

    
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
            required
            error={isNull == 'blogTitle' ? true : false}
            helperText={isNull == 'blogTitle' ? "Tiêu đề là bắt buộc" : ""}
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
            required
            error={isNull == 'blogContent' ? true : false}
            helperText={isNull == 'blogContent' ? "Nội dung là bắt buộc" : ""}
          />
          <Button component="label" variant="contained" style={{marginTop: 20}} startIcon={<CloudUploadIcon />}>
            Upload hình ảnh
            <VisuallyHiddenInput type="file" onChange={(e) => { setImage(e.target.files[0]); }}/>
          </Button>
          {
            isNull == 'image' ? <Typography color="red" fontSize={15}>*Vui lòng upload ít nhất một hình ảnh cho bài viết</Typography> : null
          }
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
