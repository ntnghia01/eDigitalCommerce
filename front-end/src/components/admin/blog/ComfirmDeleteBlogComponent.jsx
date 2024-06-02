import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch } from 'react-redux';
import { deleteBlog, fetchBlogs } from '../../../slices/blogSlice';
import { Transition } from '../../customize/CustomizeComponent';
import { memo } from 'react';

const ConfirmDeleteBlogComponent = memo(({blog, onClose, handleOpenSuccessSnackbar}) => {

  const [open, setOpen] = React.useState(true);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    onClose();
  };


  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(deleteBlog(blog.blogId))
      .then(() => {
        dispatch(fetchBlogs());
        handleOpenSuccessSnackbar("Xóa bài viết thành công");
        handleClose();
        console.log('Delete blog successfully');
      })
      .catch((error) => {
        console.log("Delete blog failed");
      });
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
        <DialogTitle>{"Xóa Bài Viết"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Bạn có chắc muốn xóa bài viết #{blog.blogId} này?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit}>Xác nhận</Button>
          <Button onClick={handleClose}>Hủy</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
})

export default ConfirmDeleteBlogComponent;