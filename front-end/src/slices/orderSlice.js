import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const prefixAPI = 'http://localhost:9004';

const initialState = {
    orders: [],
    orderDetails: [],
    orderHistory: [],
    orderCount: 0,
    lookedUpOrder: null
}

export const createOrder = createAsyncThunk (
    'order/create',
    async (orderData) => {
        const response = await axios.post(prefixAPI + '/api/order', orderData);
        return response.data;
    }
);

export const fetchOrder = createAsyncThunk (
    'order/fetch',
    async () => {
        const response = await axios.get(prefixAPI + '/api/order');
        return response.data;
    }
);

export const getOrderDetailByOrderId = createAsyncThunk (
    'order/getOrderDetail',
    async (orderId) => {
        const response = await axios.get(prefixAPI + `/api/order/${orderId}`);
        return response.data;
    }
);

export const confirmOrder = createAsyncThunk (
    'order/confirm',
    async ({orderId, confirmData}) => {
        const response = await axios.put(prefixAPI + `/api/order/confirm/${orderId}`, confirmData);
        console.log("Confirm order ok");
        return response.data;
    }
)

export const getOrderByCustomerId = createAsyncThunk (
    'order/getOrderByCustomerId',
    async (customerId) => {
        const response = await axios.get(prefixAPI + `/api/order/history/${customerId}`);
        return response.data;
    }
);

export const getOrderCountByCustomerId = createAsyncThunk (
    'order/getOrderCountByCustomerId',
    async (customerId) => {
        if (localStorage.getItem("customerID")) {
            const response = await axios.get(prefixAPI + `/api/order/count/${customerId}`);
            // console.log(response.data.orderCount);
            return response.data.orderCount;
        } else {
            return 0;
        }
    }
);

export const confirmPayment = createAsyncThunk (
    'order/paid',
    async (orderId) => {
        const response = await axios.put(prefixAPI + `/api/order/confirmPayment/${orderId}`);
        return response.data;
    }
);

export const completeOrder = createAsyncThunk (
    'order/complete',
    async (orderId) => {
        const response = await axios.put(prefixAPI + `/api/order/complete/${orderId}`);
        return response.data;
    }
);

export const lookupOrder = createAsyncThunk (
    'order/lookup',
    async (lookupData) => {
        const response = await axios.post(prefixAPI + '/api/order/lookup', lookupData);
        return response.data;
    }
);

const orderSlice = createSlice ({
    name: 'order',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createOrder.fulfilled, (state, action) => {
                console.log("order success");
            })
            .addCase(fetchOrder.fulfilled, (state, action) => {
                state.orders = action.payload;
            })
            .addCase(getOrderDetailByOrderId.fulfilled, (state, action) => {
                state.orderDetails = action.payload;
            })
            .addCase(getOrderByCustomerId.fulfilled, (state, action) => {
                state.orderHistory = action.payload;
            })
            .addCase(getOrderCountByCustomerId.fulfilled, (state, action) => {
                state.orderCount = action.payload;
            })
            .addCase(lookupOrder.fulfilled, (state, action) => {
                state.lookedUpOrder = action.payload;
            })
    }
})

export default orderSlice.reducer;