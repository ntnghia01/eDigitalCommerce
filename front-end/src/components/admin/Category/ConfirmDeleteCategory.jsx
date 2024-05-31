import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

import { useDispatch, useSelector } from "react-redux";
import { deleteCategory, fetchCategories } from '../../../slices/categorySlice';
import { memo } from 'react';
import { useCallback } from 'react';
import { Transition } from "../../customize/CustomizeComponent";


const DeleteCategory = memo (({category, onClose, handleOpenSuccessSnackbar}) => {
  console.log("DeleteCategory", category.cateId);
  const [open, setOpen] = React.useState(true);

  const handleClose = useCallback(() => {
    setOpen(false);
    onClose();
  }, [onClose]);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(deleteCategory(category.cateId)).then(() => {
      dispatch(fetchCategories());
      handleOpenSuccessSnackbar("Xóa danh mục thành công");
      onClose();
      console.log('Delete category successfully');
    })
    .catch((error) => {
        console.log('Delete category failed: '+error);
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
        <DialogTitle>{`Xóa Danh Mục #${category.cateId} `}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Bạn có chắc muốn xóa danh mục này?
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

export default DeleteCategory;