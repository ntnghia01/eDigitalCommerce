import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const prefixAPI = 'http://localhost:9004';

const initialState = {
    payments: []
}

export const fetchPayments = createAsyncThunk (
    'payment/fetch',
    async () => {
        const response = await axios.get(prefixAPI + '/api/payment');
        return response.data;
    }
);

export const payWithVNPay = createAsyncThunk (
    'payment/payWithVNPay',
    async (vnpayData) => {
        try {
            const response = await axios.post(prefixAPI + '/api/vnpay/submitOrder', vnpayData);
            console.log(response.data);

            // Kiểm tra xem response có chứa đường dẫn không
            if (response.data) {
                // Thực hiện chuyển hướng đến đường dẫn ngoài dự án
                window.location.href = response.data;
            }

            return response;
        } catch (error) {
            // Xử lý lỗi nếu cần thiết
            console.error(error);
            throw error;
        }
    }
);

const paymentSlice = createSlice ({
    name: 'payment',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPayments.fulfilled, (state, action) => {
                state.payments = action.payload;
            })
            .addCase(payWithVNPay.fulfilled, (state, action) => {
                console.log("Payment successfully");
            })
            .addCase(payWithVNPay.rejected, (state, action) => {
                console.error('Error pay with VNPay:', action.error.message);
            })
    }
});

export default paymentSlice.reducer;