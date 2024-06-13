import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

import { IconButton, TextField } from "@mui/material";
import { fetchReviews, reviewOrder } from "../../../slices/reviewSlice";
import { getOrderByCustomerId } from "../../../slices/orderSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { memo } from "react";
import { Transition } from "../../../components/customize/CustomizeComponent";


const ReviewDetailComponent = memo(({review, onClose}) => {
    console.log("ReviewDetailComponent");
    // console.log(order);

    const [open, setOpen] = React.useState(true);
    const handleClickOpen = () => {
        // if (order.orderCompleted == null) {
        //     alert("Vui lòng đợi đến khi hoàn thành đơn hàng")
        // } else {
            setOpen(true);
        // }
    };
    const handleClose = () => {
        setOpen(false);
        onClose();
    };


    return (
        <>
        
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle>{"Chi tiết đánh giá đơn hàng"} #{review.reviewId}</DialogTitle>
            <DialogContent>
                <Typography component="legend">Khách hàng: {review.user.userName}</Typography>
                <Typography component="legend">Mã đơn hàng: {review.order.orderCode}<IconButton
                      onClick={() =>
                        navigator.clipboard.writeText(order.orderCode)
                      }
                      aria-label="Copy order code"
                      size="small"
                    >
                      <ContentCopyIcon fontSize="small"/>
                    </IconButton></Typography>
                <Typography component="legend">Thời điểm đánh giá: {review.reviewTime}</Typography>
                <Typography component="legend">Mức đánh giá</Typography>
                <Rating
                    name="simple-controlled"
                    value={review.reviewRate}
                    // onChange={(event, newValue) => {
                    // setValue(newValue);
                    // }}
                    readOnly
                />
                <TextField
                    margin="normal"
                    // label="Nhập nội dung đánh giá"
                    multiline
                    rows={4}
                    fullWidth
                    value={review.reviewContent}
                    readOnly
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={()=>handleClose()}>OK</Button>
            </DialogActions>
        </Dialog>
        </>
    )
})

export default ReviewDetailComponent;