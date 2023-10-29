import * as React from 'react';
import { useState } from "react"
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import HandshakeIcon from '@mui/icons-material/Handshake';

// import Icons
import AddIcon from "@mui/icons-material/Add";
import { Grid, InputAdornment, Stack, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getOrderDetailByOrderId } from '../../../slices/orderSlice';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const formatDateTime = (oriDateTime) => {
  const dateTime = new Date(oriDateTime);
  const date = dateTime.getDate();
  const month = dateTime.getMonth() + 1;
  const year = dateTime.getFullYear();
  const hour = dateTime.getHours();
  const minute = dateTime.getMinutes();
  const second = dateTime.getSeconds();

  const newDateTime = `${date < 10 ? '0' : ''}${date}-${month < 10 ? '0' : ''}${month}-${year} ${hour < 10 ? '0' : ''}${hour}:${minute < 10 ? '0' : ''}${minute}:${second < 10 ? '0' : ''}${second}`;
  return newDateTime;
}

function formatNumberWithCommas(input) {
  if (typeof input === "number" && Number.isInteger(input)) input = input.toString();
  if (typeof input !== "string") return "Invalid input";
  if (!/^\d+$/.test(input)) return "Invalid input";
  return input.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export default function ConfirmPayment(props) {
    const { order } = props;
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(getOrderDetailByOrderId(order.orderId));
  // }, [dispatch]);
  const handleGetOrderDetail = (orderId) => {
    dispatch(getOrderDetailByOrderId(orderId));
  }
  // console.log("check render");
  const orderDetails = useSelector((state) => state.order.orderDetails);
  // console.log(orderDetails);
  return (
    <>
      <Button startIcon={<HandshakeIcon />} variant='outlined' onClick={() => {handleClickOpen();}}>Xác nhận thanh toán</Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending anonymous
            location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleClose} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
