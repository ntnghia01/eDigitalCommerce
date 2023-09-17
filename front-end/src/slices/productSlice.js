import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const prefixAPI = 'http://localhost:9004';

const initialState = {
    products: [],
}

export const fetchProducts = createAsyncThunk (
    'product/fetchProducts',
    async () => {
        const response = await axios.get(prefixAPI + '/api/product');
        return response.data;
    }
);

export const addProduct = createAsyncThunk (
    'product/add',
    async (productData) => {
        const response = await axios.post(prefixAPI + '/api/product', productData);
        return response.data;
    }
)

const productSlice = createSlice ({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.products = action.payload;
            })
    }
});

export default productSlice.reducer;