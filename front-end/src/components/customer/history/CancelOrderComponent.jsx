
import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

import CancelIcon from '@mui/icons-material/Cancel';
import { DialogContentText, Snackbar } from "@mui/material";
import { getOrderByCustomerId, requestCancelOrder } from "../../../slices/orderSlice";
import { useDispatch } from "react-redux";
import { Transition, Alert } from "../../../components/customize/CustomizeComponent";

export default function CancelOrderComponent (props) {

    const dispatch = useDispatch();
    const {order} = props;
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


    const handleSubmit = (e) => {
        console.log("request cancel", order.orderId);
        dispatch(requestCancelOrder(order.orderId))
          .then(() => {
            handleClose();
            dispatch(getOrderByCustomerId(localStorage.getItem("customerID")));
            handleOpenSnackbar();
          });
      }

    return (
        <>
        <Button size="small" variant="outlined" startIcon={<CancelIcon />} color="error" onClick={handleClickOpen}>Yêu cầu hủy</Button>
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle>{"Xác nhận hủy đơn hàng"}</DialogTitle>
            <DialogContent>

            
                <DialogContentText id="alert-dialog-description">
            Bạn có chắc muốn hủy đơn hàng #{order.orderId} này?
          </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleSubmit}>Xác nhận</Button>
                <Button onClick={handleClose}>Hủy</Button>
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
         Yêu cầu hủy đơn hàng thành công!
        </Alert>
      </Snackbar>
        </>
    )
}