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

export default function ReviewDetailComponent (props) {
    const {review} = props;
    // console.log(order);

    const dispatch = useDispatch();

    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        // if (order.orderCompleted == null) {
        //     alert("Vui lòng đợi đến khi hoàn thành đơn hàng")
        // } else {
            setOpen(true);
        // }
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



    useEffect(() => {
        fetchReviews();
    })

    const reviews = useSelector((state) => state.review.reviews);

    // const [isReviewed, setIsReviewed] = useState();

    // const isReviewed = reviews.some((review) => review.order.orderId == order.orderId);
    // console.log("isReviewed:", isReviewed);

    return (
        <>
        <Button size="small" variant="outlined" startIcon={<RateReviewIcon />} onClick={handleClickOpen}>Xem chi tiết</Button>
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle>{"Chi tiét đánh giá đơn hàng"} #{review.reviewId}</DialogTitle>
            <DialogContent>
                {/* <TextField
                    margin="normal"
                    label="Nhập mức đánh giá"
                    fullWidth
                    value={reviewRate}
                    type="number"
                    onChange={(e) => setReviewRate(e.target.value)}
                /> */}
                <Typography component="legend">Khách hàng: {review.user.userName}</Typography>
                <Typography component="legend">Mã đơn hàng: {review.order.orderCode}</Typography>
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
                    label="Nhập nội dung đánh giá"
                    multiline
                    rows={4}
                    fullWidth
                    value={review.reviewContent}
                    readOnly
                />
            </DialogContent>
            <DialogActions>
                <Button>OK</Button>
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