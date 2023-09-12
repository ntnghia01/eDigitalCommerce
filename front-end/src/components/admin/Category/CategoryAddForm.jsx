import * as React from 'react';
import { useState } from "react"
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

// import Icons
import AddIcon from "@mui/icons-material/Add";
import { InputAdornment, TextField } from '@mui/material';

import { addCategory, fetchCategories } from '../../../slices/categorySlice';
import { useDispatch } from 'react-redux';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function CategoryAddForm() {

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  
  const [cateName, setCateName] = useState();
  const [cateDesc, setCateDesc] = useState();

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCategory = {
      categoryName: cateName,
      categoryDesc: cateDesc,
    };
    dispatch(addCategory(newCategory))
      .then(() => {
        dispatch(fetchCategories());
        console.log('Thêm danh mục mới thành công');
      })
      .catch((error) => {
          console.log('Thêm danh mục thất bại: '+error);
      });
    setOpen(false);
  }

  return (
    <div>
      <Button variant="contained" startIcon={<AddIcon />} onClick={handleClickOpen}>
        Thêm mới
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Thêm Mới Danh Mục"}</DialogTitle>
        <DialogContent>
          {/* <DialogContentText id="alert-dialog-slide-description">
            Tên danh mục
          </DialogContentText> */}
          <TextField
            autoFocus
            margin="dense"
            id="cate_name"
            label="Nhập tên danh mục"
            type="text"
            fullWidth
            variant="standard"
            onChange={e => {setCateName(e.target.value)}}
          />
          <TextField
            autoFocus
            margin="dense"
            id="cate_desc"
            label="Nhập mô tả danh mục"
            type="text"
            fullWidth
            variant="standard"
            onChange={e => {setCateDesc(e.target.value)}}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit}>Xác nhận</Button>
          <Button onClick={handleClose}>Hủy</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}