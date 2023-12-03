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

import RateReviewIcon from '@mui/icons-material/RateReview';
import { TextField } from "@mui/material";
import { fetchReviews, reviewOrder } from "../../../slices/reviewSlice";
import { getOrderByCustomerId } from "../../../slices/orderSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function ReviewOrderComponent (props) {
    const {order} = props;
    // console.log(order);

    const dispatch = useDispatch();

    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        if (order.orderCompleted == null) {
            alert("Vui lòng đợi đến khi hoàn thành đơn hàng")
        } else {
            setOpen(true);
        }
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

    const [reviewRate, setReviewRate] = React.useState(0);
    const [reviewContent, setReviewContent] = React.useState('');

    const handleSubmit = (e) => {
        const reviewData = {
            reviewRate: reviewRate,
            reviewContent: reviewContent,
            order: order.orderId,
            user: localStorage.getItem("customerID")
        }
        console.log(reviewData);
        dispatch(reviewOrder(reviewData))
            .then(() => {
                handleClose();
                dispatch(getOrderByCustomerId(localStorage.getItem("customerID")));
                handleOpenSnackbar();
            });
    }

    useEffect(() => {
        fetchReviews();
    })

    const reviews = useSelector((state) => state.review.reviews);

    // const [isReviewed, setIsReviewed] = useState();

    const isReviewed = reviews.some((review) => review.order.orderId == order.orderId);
    // console.log("isReviewed:", isReviewed);

    return (
        <>
        { isReviewed ? (<Button size="small" variant="outlined" startIcon={<RateReviewIcon />} color="warning" disabled>Đã đánh giá</Button>) 
        : (<Button size="small" variant="outlined" startIcon={<RateReviewIcon />} color="warning" onClick={handleClickOpen}>Đánh giá</Button>) }
        
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle>{"Đánh giá đơn hàng"}</DialogTitle>
            <DialogContent>
                {/* <TextField
                    margin="normal"
                    label="Nhập mức đánh giá"
                    fullWidth
                    value={reviewRate}
                    type="number"
                    onChange={(e) => setReviewRate(e.target.value)}
                /> */}
                <Typography component="legend">Mức đánh giá</Typography>
                <Rating
                    name="simple-controlled"
                    value={reviewRate}
                    // onChange={(event, newValue) => {
                    // setValue(newValue);
                    // }}
                    onChange={(e) => setReviewRate(e.target.value)}
                />
                <TextField
                    margin="normal"
                    label="Nhập nội dung đánh giá"
                    multiline
                    rows={4}
                    fullWidth
                    value={reviewContent}
                    onChange={(e) => setReviewContent(e.target.value)}
                />
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
            Đánh giá thành công
            </Alert>
        </Snackbar>
        </>
    )
}