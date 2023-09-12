import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

// import Icons
import DeleteIcon from '@mui/icons-material/Delete';

import { useDispatch, useSelector } from "react-redux";
import { deleteCategory, fetchCategories } from '../../../slices/categorySlice';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DeleteCategory(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(props.deleteID);
    dispatch(deleteCategory(props.deleteID)).then(() => {
      dispatch(fetchCategories());
      setOpen(false);
      console.log('Delete category successfully');
    })
    .catch((error) => {
        console.log('Delete category failed: '+error);
    });
  }

  return (
    <div>
      <Button variant="contained" color="error" startIcon={<DeleteIcon />} onClick={handleClickOpen}>
        Xóa
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Xóa Danh Mục"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Bạn có chắc muốn xóa danh mục ID={props.deleteID} này?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit}>Xác nhận</Button>
          <Button onClick={handleClose}>Hủy</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}