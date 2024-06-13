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
import CancelIcon from '@mui/icons-material/Cancel';

// import Icons
import AddIcon from "@mui/icons-material/Add";
import { Badge, Grid, InputAdornment, Stack, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { confirmCancelOrder, fetchOrder, getOrderDetailByOrderId } from "../../../slices/orderSlice";
import { Transition, Alert } from "../../customize/CustomizeComponent";


export default function ConfirmCancel(props) {
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

  const handleSubmit = (e) => {
    console.log("confirm cancel", order.orderId);
    dispatch(confirmCancelOrder(order.orderId))
      .then(() => {
        handleClose();
        dispatch(fetchOrder());
        handleOpenSnackbar();
      });
  }

  return (
    <>
      <Badge color="secondary" variant="dot" invisible={order.orderCancelled!=null && order.orderStatus!=-1? false : true} sx={{marginLeft: 1}}>
        <Button startIcon={<CancelIcon />} variant="outlined" onClick={() => {handleClickOpen();}} 
        disabled={order.orderConfirmed!= null || order.orderStatus==-1  ? true : false}
        >Xác nhận hủy</Button>
      </Badge>
      
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Xác nhận cho phép hủy đơn hàng?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Bạn có chắc muốn xác nhận yêu cầu hủy đơn hàng #{order.orderId} này?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit}>Có</Button>
          <Button onClick={handleClose} autoFocus>
            Không
          </Button>
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
         Xác nhận hủy đơn hàng thành công!
        </Alert>
      </Snackbar>
    </>
  );
}
