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

const paymentSlice = createSlice ({
    name: 'payment',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPayments.fulfilled, (state, action) => {
                state.payments = action.payload;
            })
    }
});

export default paymentSlice.reducer;