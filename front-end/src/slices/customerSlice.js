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
        localStorage.setItem("customerID", response.data.userId);
        localStorage.setItem("customerName", response.data.username);
        localStorage.setItem("customerToken", response.data.accessToken);
        localStorage.setItem("customerImage", response.data.image);
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

export const updateCustomerInfomation = createAsyncThunk (
    'customer/updateInfo',
    async ({userId, updateData}) => {
        const response = await axios.put(prefixAPI + `/api/customer/${userId}`, updateData);
        return response.data;
    }
)

export const deleteCustomerAccount = createAsyncThunk (
    'customer/deleteAccount',
    async (userId) => {
        const response = await axios.delete(prefixAPI + `/api/customer/${userId}`);
        return response.data;
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