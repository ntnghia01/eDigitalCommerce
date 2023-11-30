import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const prefixAPI = 'http://localhost:9004';

const initialState = {
    customerAccounts: [],
    shipperAccounts: [],
    adminAccounts: []
}

export const fetchCustomerAccounts = createAsyncThunk (
    'account/fetchCustomer',
    async () => {
        const response = await axios.get(prefixAPI + '/api/account/customer');
        return response.data;
    }
);

export const fetchShipperAccounts = createAsyncThunk (
    'account/fetchShipper',
    async () => {
        const response = await axios.get(prefixAPI + '/api/account/shipper');
        return response.data;
    }
);

export const fetchAdminAccounts = createAsyncThunk (
    'account/fetchAdmin',
    async () => {
        const response = await axios.get(prefixAPI + '/api/account/admin');
        return response.data;
    }
);

export const disableCustomerAccount = createAsyncThunk (
    'account/disableCustomer',
    async (userId) => {
        const response = await axios.delete(prefixAPI + `/api/account/${userId}`);
        return response.data;
    }
)

export const activeCustomerAccount = createAsyncThunk (
    'account/activeCustomer',
    async (userId) => {
        const response = await axios.put(prefixAPI + `/api/account/active/${userId}`);
        return response.data;
    }
)

export const fetchCommentByProductID = createAsyncThunk (
    'comment/fetchByProductID',
    async (proId) => {
        const response = await axios.get(prefixAPI + `/api/comment/product/${proId}`);
        return response.data;
    }
);


export const addComment = createAsyncThunk (
    'comment/add',
    async (commentData) => {
        const response = await axios.post(prefixAPI + '/api/comment', commentData);
        return response.data;
    }
);

export const disableComment = createAsyncThunk (
    'comment/disable',
    async (cmtId) => {
        const response = await axios.put(prefixAPI + `/api/comment/${cmtId}`);
        return response.data;
    }
);

export const activeComment = createAsyncThunk (
    'comment/active',
    async (cmtId) => {
        const response = await axios.put(prefixAPI + `/api/comment/active/${cmtId}`);
        return response.data;
    }
);


const accountSlice = createSlice ({
    name: 'accountt',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCustomerAccounts.fulfilled, (state, action) => {
                state.customerAccounts = action.payload;
            })
            .addCase(fetchShipperAccounts.fulfilled, (state, action) => {
                state.shipperAccounts = action.payload;
            })
            .addCase(fetchAdminAccounts.fulfilled, (state, action) => {
                state.adminAccounts = action.payload;
            })
    }
})

export default accountSlice.reducer;