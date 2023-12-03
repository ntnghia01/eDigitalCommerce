import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const prefixAPI = 'http://localhost:9004';

const initialState = {
    cart: [],
    countCart: null,
    totalCart: null,
    calcCartData: {}
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
        if (localStorage.getItem("customerID")) {
            const response = await axios.get(prefixAPI + `/api/cart/${customerId}`);
            // console.log(response.data.length);
            return response.data.length;
        } else {
            return 0;
        }
    }
)

export const calcTotalCart = createAsyncThunk (
    'cart/total',
    async (customerId) => {
        const response = await axios.get(prefixAPI + `/api/cart/${customerId}`);
        let total=0;
        response.data.map((cartDetail) => {
            total += (cartDetail.product.proPrice*cartDetail.cartDetailQuantity);
            // console.log('total:' + total);
            // console.log(response.data);
        })
        return total;
    }
)

export const calcCart = createAsyncThunk (
    'cart/calc',
    async (customerId) => {
        const response = await axios.get(prefixAPI + `/api/cart/calculate/${customerId}`);
        return response.data;
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
            .addCase(calcTotalCart.fulfilled, (state, action) => {
                state.totalCart = action.payload;
            })
            .addCase(calcCart.fulfilled, (state, action) => {
                state.calcCartData = action.payload;
            })
    }
});

export default cartSlice.reducer;