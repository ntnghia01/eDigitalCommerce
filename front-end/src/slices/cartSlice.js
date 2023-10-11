import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const prefixAPI = 'http://localhost:9004';

const initialState = {
    cart: [],
    countCart: null
}

export const addToCart = createAsyncThunk (
    'cart/addToCart',
    async (cartDetailData) => {
        const response = await axios.post(prefixAPI + '/api/cart/cartdetail', cartDetailData);
        return response.data;
    }
)

export const fetchCartDetail = createAsyncThunk (
    'cart/fetchCartDetail',
    async (customerId) => {
        const response = await axios.get(prefixAPI + `/api/cart/${customerId}`);
        return response.data;
    }
)

export const updateCartDetailQuantity = createAsyncThunk (
    'cart/updateCartDetailQuantity',
    async (updateCartDetailQuantityData) => {
        const response = await axios.post(prefixAPI + '/api/cart/updateQuantity', updateCartDetailQuantityData);
        return response.data;
    }
)

export const deleteCartDetail = createAsyncThunk (
    'cart/delete',
    async (cartDetailId) => {
        const response = await axios.delete(prefixAPI + `/api/cart/cartdetail/${cartDetailId}`);
        return response.data;
    }
)

export const countCartDetail = createAsyncThunk (
    'cart/count',
    async (customerId) => {
        const response = await axios.get(prefixAPI + `/api/cart/${customerId}`);
        // console.log(response.data.length);
        return response.data.length;
    }
)

const cartSlice = createSlice ({
    name: 'cart',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCartDetail.fulfilled, (state, action) => {
                state.cart = action.payload;
            })
            .addCase(countCartDetail.fulfilled, (state, action) => {
                state.countCart = action.payload;
            })
    }
});

export default cartSlice.reducer;