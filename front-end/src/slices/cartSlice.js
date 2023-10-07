import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const prefixAPI = 'http://localhost:9004';

const initialState = {
    cart: []
}

export const addToCart = createAsyncThunk (
    'cart/addToCart',
    async (cartDetailData) => {
        const response = await axios.post(prefixAPI + '/api/cart/cartdetail', cartDetailData);
        return response.data;
    }
)

const cartSlice = createSlice ({
    name: 'cart',
    initialState,
    reducers: {},
    extraReducers: (builder) => {}
});

export default cartSlice.reducer;