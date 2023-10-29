import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const prefixAPI = 'http://localhost:9004';

const initialState = {
    shippers: []
}

export const fetchShippers = createAsyncThunk (
    'shipper/fetch',
    async () => {
        const response = await axios.get(prefixAPI + '/api/shipper');
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
    }
})

export default shipperSlice.reducer;