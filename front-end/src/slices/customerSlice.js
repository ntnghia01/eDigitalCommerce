import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const prefixAPI = 'http://localhost:9004';

const initialState = {

    customer: {}
}

export const customerSignup = createAsyncThunk (
    'customer/signup',
    async (signupData) => {
        const response = await axios.post(prefixAPI + '/api/auth/signup', signupData);
        console.log(response.data);
        return response.data;
    }
)

export const customerLogin = createAsyncThunk (
    'customer/login',
    async (loginData) => {
        const response = await axios.post(prefixAPI + '/api/auth/signin', loginData);
        console.log(response.data);
        sessionStorage.setItem("customerID", response.data.userId);
        sessionStorage.setItem("customerName", response.data.username);
        sessionStorage.setItem("customerToken", response.data.accessToken);
        return response.data;
    }
)

export const getCustomerInfo = createAsyncThunk (
    'customer/getInfo',
    async (customerId) => {
        const response = await axios.get(prefixAPI + `/api/customer/${customerId}`);
        return response.data;
    }
)

export const deleteCustomerInfo = createAsyncThunk (
    'customer/deleteInfo',
    async () => {
        return null;
    }
)



const customerSlice = createSlice ({
    name: 'customer',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(customerSignup.fulfilled, (state, action) => {
                console.log(action.payload); // khong co tac dung
            })
            .addCase(getCustomerInfo.fulfilled, (state, action) => {
                state.customer = action.payload;
            })
            .addCase(deleteCustomerInfo.fulfilled, (state,action) => {
                state.customer = action.payload;
            })
    }
})

export default customerSlice.reducer;