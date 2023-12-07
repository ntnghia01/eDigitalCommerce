import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const prefixAPI = 'http://localhost:9004';

const initialState = {
    shippers: [],
    orderByShipper: []
}

export const fetchShippers = createAsyncThunk (
    'shipper/fetch',
    async () => {
        const response = await axios.get(prefixAPI + '/api/shipper');
        return response.data;
    }
);

export const shipperLogin = createAsyncThunk (
    'shipper/login',
    async (loginData) => {
        const response = await axios.post(prefixAPI + '/api/auth/signin', loginData);
        console.log(response.data);
        localStorage.setItem("shipperID", response.data.userId);
        localStorage.setItem("shipperName", response.data.username);
        localStorage.setItem("shipperToken", response.data.accessToken);
        return response.data;
    }
);

export const fetchOrderByShipper = createAsyncThunk (
    'orderByShipper/fetch',
    async (shipperId) => {
        const response = await axios.get(prefixAPI + `/api/order/byShipperId/${shipperId}`);
        return response.data;
    }
);

export const startShip = createAsyncThunk (
    'shipper/startShip',
    async (orderId) => {
        const response = await axios.put(prefixAPI + `/api/shipper/startShip/${orderId}`);
        return response.data;
    }
);

export const shipped = createAsyncThunk (
    'shipper/shipped',
    async (orderId) => {
        const response = await axios.put(prefixAPI + `/api/shipper/shipped/${orderId}`);
        return response.data;
    }
);

export const searchOrderByShipperID = createAsyncThunk (
    'order/searchByShipperID',
    async (searchData) => {
        const response = await axios.post(prefixAPI + '/api/order/byShipperId/search', searchData);
        return response.data;
    }
)



const shipperSlice = createSlice ({
    name: 'shipper',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchShippers.fulfilled, (state, action) => {
                state.shippers = action.payload;
            })
            .addCase(fetchOrderByShipper.fulfilled, (state, action) => {
                state.orderByShipper = action.payload;
            })
            .addCase(searchOrderByShipperID.fulfilled, (state, action) => {
                state.orderByShipper = action.payload;
            })
    }
})

export default shipperSlice.reducer;