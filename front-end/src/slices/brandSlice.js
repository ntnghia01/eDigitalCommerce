import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const prefixAPI = 'http://localhost:9004';

const initialState = {
    brands: [],
}

export const fetchBrands = createAsyncThunk (
    'brand/fetchBrands',
    async () => {
        const response = await axios.get(prefixAPI + '/api/brand');
        return response.data;
    }
);

export const addBrand = createAsyncThunk (
    'brand/add',
    async (brandData) => {
        const response = await axios.post(prefixAPI + '/api/brand', brandData);
        return response.data;
    }
);

export const editBrand = createAsyncThunk (
    'brand/edit',
    async ({ brandId, brandData }) => {
        const response = await axios.put(prefixAPI + `/api/brand/${brandId}`, brandData);
        return response.data;
    }
)

export const deleteBrand = createAsyncThunk (
    'brand/delete',
    async (brandId) => {
        await axios.delete(prefixAPI + `/api/brand/delete/${brandId}`);
        return brandId;
    }
)

const brandSlice = createSlice ({
    name: 'brands', // not important
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder
            .addCase(fetchBrands.fulfilled, (state, action) => {
                state.brands = action.payload;
            })
    }
});

export default brandSlice.reducer;