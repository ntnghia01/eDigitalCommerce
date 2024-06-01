import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from 'react-redux';
import { deleteBrand, fetchBrands } from '../../../slices/brandSlice';
import { deleteSupplier, fetchSuppliers } from '../../../slices/supplierSlice';
import { deleteProduct, fetchProducts } from '../../../slices/productSlice';
import { disableComment, fetchComments } from '../../../slices/commentSlice';
import { Transition } from '../../customize/CustomizeComponent';
import { memo } from 'react';
import { useState } from 'react';


const DisableCommentComponent =memo(({comment, onClose, handleOpenSuccessSnackbar}) => {
  console.log("DisableCommentComponent");

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
    dispatch(disableComment(comment.cmtId))
      .then(() => {
        dispatch(fetchComments());
        handleClose();
        handleOpenSuccessSnackbar("Ẩn bình luận thành công");
        console.log('Disable comment successfully');
      })
      .catch((error) => {
        console.log("Disable comment failed");
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
        <DialogTitle>{`Ẩn bình luận #${comment.cmtId}`}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Bạn có chắc muốn ẩn bình luận này?
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

export default DisableCommentComponent;