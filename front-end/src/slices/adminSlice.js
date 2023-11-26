import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const prefixAPI = 'http://localhost:9004';

const initialState = {
    admin: {}
}

export const adminLogin = createAsyncThunk (
    'admin/login',
    async (loginData) => {
        const response = await axios.post(prefixAPI + '/api/auth/signin', loginData);
        console.log(response.data);
        localStorage.setItem("adminID", response.data.userId);
        localStorage.setItem("adminName", response.data.username);
        localStorage.setItem("adminToken", response.data.accessToken);
        return response.data;
    }
)

// export const getCustomerInfo = createAsyncThunk (
//     'customer/getInfo',
//     async (customerId) => {
//         const response = await axios.get(prefixAPI + `/api/customer/${customerId}`);
//         return response.data;
//     }
// )

// export const deleteCustomerInfo = createAsyncThunk (
//     'customer/deleteInfo',
//     async () => {
//         return null;
//     }
// )



const adminSlice = createSlice ({
    name: 'admin',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // builder
            // .addCase(adminSignup.fulfilled, (state, action) => {
            //     console.log(action.payload); // khong co tac dung
            // })
            // .addCase(getCustomerInfo.fulfilled, (state, action) => {
            //     state.customer = action.payload;
            // })
            // .addCase(deleteCustomerInfo.fulfilled, (state,action) => {
            //     state.customer = action.payload;
            // })
    }
})

export default adminSlice.reducer;