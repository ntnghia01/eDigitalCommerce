import * as React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import RecommendIcon from '@mui/icons-material/Recommend';
import AddIcon from "@mui/icons-material/Add";

import { FormControl, Grid, InputAdornment, InputLabel, MenuItem, Select, Stack, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { fetchOrderByShipper, shipped } from "../../slices/shipperSlice";
import { Transition, Alert } from "../customize/CustomizeComponent";

export default function ShippedComponent(props) {
  console.log("check render");
  const { order } = props;
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

  const [confirmShipper, setConfirmShipper] = useState();

  const handleSubmit = (e) => {
    console.log("Start");
    dispatch(shipped(order.orderId))
      .then(() => {
        handleClose();
        dispatch(fetchOrderByShipper(localStorage.getItem("shipperID")));
        handleOpenSnackbar();
      });
  }

  return (
    <>
      <Button startIcon={<CheckCircleIcon />} variant="contained" onClick={() => {handleClickOpen();}} color="success">Giao xong</Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Giao xong đơn hàng"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Bạn đã giao xong đơn #{order.orderId} này?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit}>Xác nhận</Button>
          <Button onClick={handleClose}>Hủy</Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%', color: 'white' }}>
          Xác nhận giao xong
        </Alert>
      </Snackbar>
    </>
  );
}
