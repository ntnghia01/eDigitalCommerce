import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import { FormControlLabel, Radio, RadioGroup, TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { editBlog, fetchBlogs } from "../../../slices/blogSlice";
import { VisuallyHiddenInput, Transition } from "../../customize/CustomizeComponent";
import { memo } from "react";


const BlogEditForm = memo(({blog, onClose, handleOpenSuccessSnackbar}) => {

  const [open, setOpen] = React.useState(true);
  const handleClose = () => {
    setOpen(false);
    onClose();
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
        handleOpenSuccessSnackbar("Cập nhật bài viết thành công");
        handleClose();
        console.log("Cập nhật blog thành công!");
      }).catch((error) => {
        console.log('Cập nhật blog thất bại: ' + error);
      })
}

  return (
    <div>
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
    </div>
  );
})

export default BlogEditForm;
