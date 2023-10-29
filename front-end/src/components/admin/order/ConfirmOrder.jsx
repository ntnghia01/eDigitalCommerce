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
import { confirmOrder, fetchOrder, getOrderDetailByOrderId } from "../../../slices/orderSlice";
import { fetchShippers } from "../../../slices/shipperSlice";

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

  const newDateTime = `${date < 10 ? "0" : ""}${date}-${
    month < 10 ? "0" : ""
  }${month}-${year} ${hour < 10 ? "0" : ""}${hour}:${
    minute < 10 ? "0" : ""
  }${minute}:${second < 10 ? "0" : ""}${second}`;
  return newDateTime;
};

function formatNumberWithCommas(input) {
  if (typeof input === "number" && Number.isInteger(input))
    input = input.toString();
  if (typeof input !== "string") return "Invalid input";
  if (!/^\d+$/.test(input)) return "Invalid input";
  return input.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function ConfirmOrder(props) {
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

  useEffect(() => {
    dispatch(fetchShippers());
  }, [dispatch]);

  const shippers = useSelector((state) => state.shipper.shippers);
  // console.log(shippers);

  const [confirmShipper, setConfirmShipper] = useState();

  const handleSubmit = (e) => {
    const confirmData = {
      shipperId: confirmShipper
    };
    console.log(confirmData);
    dispatch(confirmOrder({orderId: order.orderId, confirmData: confirmData}))
      .then(() => {
        handleClose();
        dispatch(fetchOrder());
        handleOpenSnackbar();
      });
  }

  return (
    <>
      <Button startIcon={<RecommendIcon />} variant="contained" onClick={() => {handleClickOpen();}}>Xác nhận đơn hàng</Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Vui lòng điền các thông tin để xác nhận đơn hàng"}
        </DialogTitle>
        <DialogContent>
          {/* <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending
            anonymous location data to Google, even when no apps are running.
          </DialogContentText> */}
          <FormControl fullWidth sx={{mt: 3}}>
            <InputLabel id="demo-simple-select-label">Chỉ định người giao</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              defaultValue=""
              label="Người giao"
              onChange={(e) => {
                setConfirmShipper(e.target.value);
              }}
            >
                {shippers.map((shipper) => (
                    <MenuItem key={shipper.shipperId} value={shipper.shipperId}>{shipper.shipperName} - {shipper.shipperPhone}</MenuItem>
                ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit}>Xác nhận</Button>
          <Button onClick={handleClose} autoFocus>
            Hủy
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
          Xác nhận đơn hàng thành công!
        </Alert>
      </Snackbar>
    </>
  );
}
