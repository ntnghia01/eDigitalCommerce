import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const prefixAPI = 'http://localhost:9004';

const initialState = {
    orders: [],
}

export const createOrder = createAsyncThunk (
    'order/create',
    async (orderData) => {
        const response = await axios.post(prefixAPI + '/api/order', orderData);
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
    }
})

export default orderSlice.reducer;