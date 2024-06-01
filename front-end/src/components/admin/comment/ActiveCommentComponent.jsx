import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import MuiAlert from '@mui/material/Alert';
import { useDispatch } from 'react-redux';
import { activeComment, disableComment, fetchComments } from '../../../slices/commentSlice';
import { Transition } from "../../customize/CustomizeComponent";
import { memo } from 'react';
import { useState } from 'react';


const ActiveCommentComponent = memo(({comment, onClose, handleOpenSuccessSnackbar}) => {
  console.log("ActiveCommentComponent");

  const [open, setOpen] = useState(true);
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
    dispatch(activeComment(comment.cmtId))
      .then(() => {
        dispatch(fetchComments());
        handleClose();
        handleOpenSuccessSnackbar("Bình luận đã được hiển thị thành công");
        console.log('Active comment successfully');
      })
      .catch((error) => {
        console.log("Active comment failed");
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
        <DialogTitle>{`Hiển thị lại bình luận #${comment.cmtId}`}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Bạn có chắc hiển thị lại bình luận này?
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

export default ActiveCommentComponent;