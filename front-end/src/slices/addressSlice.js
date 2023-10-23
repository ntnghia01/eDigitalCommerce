import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const prefixAPI = 'http://localhost:9004';

const initialState = {
    addresses: [],
    address: {},
    defaultAddress: {}
}

export const fetchAddresses = createAsyncThunk (
    'address/fetch',
    async (customerId) => {
        const response = await axios.get(prefixAPI + `/api/address/customer/${customerId}`);
        return response.data;
    }
)

export const addAddress = createAsyncThunk (
    'address/add',
    async (addressData) => {
        const response = await axios.post(prefixAPI + '/api/address', addressData);
        return response.data;
    }
);

export const deleteAddress = createAsyncThunk (
    'address/delete',
    async (addressId) => {
        const response = await axios.delete(prefixAPI + `/api/address/${addressId}`);
        return response.data;
    }
);

export const editAddress = createAsyncThunk (
    'address/edit',
    async ({addressId, addressData}) => {
        const response = await axios.put(prefixAPI + `/api/address/${addressId}`, addressData);
        return response.data;
    }
);

export const getAddress = createAsyncThunk (
    'address/getAddress',
    async (addressId) => {
        const response = await axios.get(prefixAPI + `/api/address/${addressId}`);
        return response.data;
    }
);

export const getDefaultAddress = createAsyncThunk (
    'address/default',
    async (customerId) => {
        const response = await axios.get(prefixAPI + `/api/address/default/${customerId}`);
        return response.data;
    }
)

const addressSlice = createSlice ({
    name: 'address',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addAddress.fulfilled, (state, action) => {
                console.log("add address success");
            })
            .addCase(fetchAddresses.fulfilled, (state,action) => {
                state.addresses = action.payload;
            })
            .addCase(getAddress.fulfilled, (state, action) => {
                state.address = action.payload;
            })
            .addCase(getDefaultAddress.fulfilled, (state, action) => {
                state.defaultAddress = action.payload;
            })
    }
})

export default addressSlice.reducer;