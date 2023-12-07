import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const prefixAPI = 'http://localhost:9004';

const initialState = {
    suppliers: []
}

export const fetchSuppliers = createAsyncThunk (
    'supplier/fetchSuppliers',
    async () => {
        const response = await axios.get(prefixAPI + '/api/supplier');
        return response.data;
    }
);

export const addSupplier = createAsyncThunk (
    'supplier/add',
    async (supplierData) => {
        const response = await axios.post(prefixAPI + '/api/supplier', supplierData);
        return response.data;
    }
);

export const editSupplier = createAsyncThunk (
    'supplier/edit',
    async ({supplierId, supplierData}) => {
        const response = await axios.put(prefixAPI + `/api/supplier/${supplierId}`, supplierData);
        return response.data;
    }
);

export const deleteSupplier = createAsyncThunk (
    'supplier/delete',
    async (supplierId) => {
        await axios.delete(prefixAPI + `/api/supplier/delete/${supplierId}`);
        return supplierId;
    }
)

export const searchSupplierByName = createAsyncThunk (
    'supplier/searchByName',
    async (searchData) => {
        const response = await axios.post(prefixAPI + '/api/supplier/searchByName', searchData);
        return response.data;
    }
)

const supplierSlice = createSlice ({
    name: 'suppliers',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSuppliers.fulfilled, (state, action) => {
                state.suppliers = action.payload;
            })
            .addCase(searchSupplierByName.fulfilled, (state, action) => {
                state.suppliers = action.payload;
            })
    }
});

export default supplierSlice.reducer;