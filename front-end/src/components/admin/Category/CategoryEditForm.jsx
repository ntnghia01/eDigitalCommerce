
import React, { useEffect, useState } from 'react';
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import EditIcon from '@mui/icons-material/Edit';

// import Icons
import UpdateIcon from "@mui/icons-material/Update";
import { FormControlLabel, Radio, RadioGroup, TextField } from "@mui/material";
import FormLabel from '@mui/material/FormLabel';

import { useDispatch, useSelector } from "react-redux";
import { fetchCategories, fetchCategory, updateCategory } from "../../../slices/categorySlice";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CategoryEditForm(props) {

  // console.log(props.data.id);
  const existCategory = props.data;

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

  const dispatch = useDispatch();

  const [cateId, setCateID] = useState(existCategory.id);
  const [cateName, setCateName] = useState(existCategory.name);
  const [cateDesc, setCateDesc] = useState(existCategory.desc);
  const [cateStatus, setCateStatus] = useState(existCategory.status);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const updateCategoryData = {
      categoryName: cateName,
      categoryDesc: cateDesc,
      categoryStatus: cateStatus,
    };
    // console.log(updateCategory);
    dispatch(updateCategory({categoryId: cateId, categoryData: updateCategoryData}))
      .then(() => {
        dispatch(fetchCategories());
        handleOpenSuccessSnackbar();
        console.log('Category updated successfully');
      })
      .catch((error) => {
          console.log('Sủa danh mục thất bại: '+error);
      });
    setOpen(false);
  }

  return (
    <div>
      <Button
        variant="contained"
        color="warning"
        startIcon={<EditIcon />}
        onClick={handleClickOpen}
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
        <DialogTitle>{`Chỉnh Sửa Danh Mục #${existCategory.id}`}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="cate_name"
            label="Tên danh mục"
            type="text"
            fullWidth
            variant="standard"
            defaultValue={cateName}
            onChange={e => {setCateName(e.target.value)}}
          />
          <TextField
            autoFocus
            margin="dense"
            id="cate_desc"
            label="Mô tả danh mục"
            type="text"
            fullWidth
            variant="standard"
            defaultValue={cateDesc}
            onChange={e => {setCateDesc(e.target.value)}}
          />
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            value={cateStatus}
            onChange={e => {setCateStatus(e.target.value)}}
          >
            <FormControlLabel value="1" control={<Radio />} label="Hoạt động" />
            <FormControlLabel value="0" control={<Radio />} label="Không hoạt động" />
          </RadioGroup>
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
