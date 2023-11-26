import * as React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createOrder, getOrderCountByCustomerId } from "../../../slices/orderSlice";
import { getCustomerInfo } from "../../../slices/customerSlice";
import { calcCart, countCartDetail, fetchCartDetail } from "../../../slices/cartSlice";
import { fetchAddresses, getDefaultAddress } from "../../../slices/addressSlice";
import { fetchPayments } from "../../../slices/paymentSlice";
import { Button } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import InventoryIcon from '@mui/icons-material/Inventory';

export default function SuccessfulPaymentPage() {
    console.log("check render SuccessfulPaymentPage");
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [transactionStatus, setTransactionStatus] = useState(null);
    const [orderInfo, setOrderInfo] = useState(null);

    useEffect(() => {
        // Parse query parameters from the URL
        const params = new URLSearchParams(location.search);
        const vnpTransactionStatus = params.get("vnp_TransactionStatus");
        const vnpOrderInfo = params.get("vnp_OrderInfo");

        // Set the transaction status in state
        setTransactionStatus(vnpTransactionStatus);
        setOrderInfo(vnpOrderInfo);

        // If both values exist, dispatch the action
        if (vnpTransactionStatus && vnpOrderInfo && localStorage.getItem("paymentId")) {
            const orderData = {
                customerId: localStorage.getItem("customerID"),
                paymentId: localStorage.getItem("paymentId"),
                orderName: localStorage.getItem("orderName"),
                orderPhone: localStorage.getItem("orderPhone"),
                orderAddress: localStorage.getItem("orderAddress"),
                orderNote: localStorage.getItem("orderNote"),
                orderShipFee: localStorage.getItem("orderShipFee"),
                orderTotalAmount: localStorage.getItem("orderTotalAmount")
            }
            dispatch(createOrder(orderData)).then(() => {
                console.log("Pay with VNPay successfully");
                dispatch(getCustomerInfo(localStorage.getItem("customerID")));
                dispatch(fetchCartDetail(localStorage.getItem("customerID")));
                dispatch(fetchAddresses(localStorage.getItem("customerID")));
                dispatch(getDefaultAddress(localStorage.getItem("customerID")));
                dispatch(fetchPayments());
                dispatch(calcCart(localStorage.getItem("customerID")));
                dispatch(countCartDetail(localStorage.getItem("customerID")));
                dispatch(getOrderCountByCustomerId(localStorage.getItem("customerID")));
            });
        }
    }, [location.search, dispatch]);

    const handleRedirectToHomePage = () => {
        localStorage.removeItem("paymentId");
        localStorage.removeItem("orderName");
        localStorage.removeItem("orderPhone");
        localStorage.removeItem("orderAddress");
        localStorage.removeItem("orderNote");
        localStorage.removeItem("orderShipFee");
        localStorage.removeItem("orderTotalAmount");
        navigate('/');
    }

    const handleRedirectToHistoryPage = () => {
        localStorage.removeItem("paymentId");
        localStorage.removeItem("orderName");
        localStorage.removeItem("orderPhone");
        localStorage.removeItem("orderAddress");
        localStorage.removeItem("orderNote");
        localStorage.removeItem("orderShipFee");
        localStorage.removeItem("orderTotalAmount");
        navigate(`/history/${localStorage.getItem('customerID')}`)
    }

    return (
        <>
            {transactionStatus && orderInfo ? (
                transactionStatus === "00" ? (<>
                    <Alert severity="success">
                        <AlertTitle>Thanh toán thành công qua VNPay</AlertTitle>
                        Chúc mừng bạn đã thanh toán thành công — <strong>xem lại đơn hàng!</strong>
                    </Alert>
                    <Button variant="contained" sx={{margin: 1}} startIcon={<HomeIcon />} onClick={() => handleRedirectToHomePage()}>Về trang chủ</Button>
                    <Button variant="contained" sx={{margin: 1}} startIcon={<InventoryIcon />} onClick={() => handleRedirectToHistoryPage()}>Xem lại đơn hàng</Button></>
                ) : (<>
                    <Alert severity="error">
                        <AlertTitle>Thanh toán thất bại</AlertTitle>
                        Vui lòng kiểm tra tài khoản hoặc kết nối mạng — <strong>thanh toán lại!</strong>
                    </Alert>
                    <Button variant="contained" sx={{margin: 1}} startIcon={<HomeIcon />} onClick={() => {navigate('/')}}>Về trang chủ</Button></>
                )
            ) : ( <>
                <Alert severity="error">
                    <AlertTitle>Bạn chưa thực hiện thanh toán nào</AlertTitle>
                    Vui lòng thực hiện đặt hàng và thanh toán sau — <strong>về trang chủ!</strong>
                </Alert>
                <Button variant="contained" sx={{margin: 1}} startIcon={<HomeIcon />} onClick={() => {navigate('/')}}>Về trang chủ</Button></>
            )}
        </>
    );
}
