
import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

import CancelIcon from '@mui/icons-material/Cancel';
import { DialogContentText } from "@mui/material";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

export default function CancelOrderComponent (props) {
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
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
            Bạn có chắc muốn hủy đơn hàng này?
          </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Xác nhận</Button>
                <Button onClick={handleClose}>Hủy</Button>
            </DialogActions>
        </Dialog>
        </>
    )
}