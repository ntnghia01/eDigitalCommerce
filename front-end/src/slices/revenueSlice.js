import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const prefixAPI = 'http://localhost:9004';

const initialState = {
    revenue: null,
    reviewAvg: null,
    totalProductQuantityValue: null,
    totalSoldProductsValue: null,
    totaAmountByQuarterValue: [
        0,
        0,
        0,
        1897000000
    ],
    totaAmountByQuarterValue2: [
        0,
        0,
        0,
        283111000
    ],
    genderCountValue: [
        {
            "label": "Male",
            "value": 9
        },
        {
            "label": "Female",
            "value": 2
        },
        {
            "label": "Other",
            "value": 1
        }
    ],
    reviewCountValue: [
        {
            label: 1,
            value: 0
        },
        {
            label: 2,
            value: 0
        },
        {
            label: 3,
            value: 1
        },
        {
            label: 4,
            value: 1
        },
        {
            label: 5,
            value: 1
        }
    ]
}

export const totalRevenue = createAsyncThunk (
    'revenue/total',
    async () => {
        const response = await axios.get(prefixAPI + '/api/revenue/total-revenue');
        return response.data;
    }
);


export const reviewAVG = createAsyncThunk (
    'review/AVG',
    async () => {
        const response = await axios.get(prefixAPI + '/api/review/average-rating-for-orders');
        return response.data;
    }
);

export const totalProductQuantity = createAsyncThunk (
    'revenue/totalProductQuantity',
    async () => {
        const response = await axios.get(prefixAPI + '/api/revenue/total-product-quantity');
        return response.data;
    }
);

export const totalSoldProducts = createAsyncThunk (
    'revenue/totalSoldProducts',
    async () => {
        const response = await axios.get(prefixAPI + '/api/revenue/total-sold-products');
        return response.data;
    }
);


export const totaAmountByQuarter = createAsyncThunk (
    'revenue/totaAmountByQuarter',
    async () => {
        const response = await axios.get(prefixAPI + '/api/revenue/total-amount-by-quarter');
        return response.data;
    }
);

export const totaAmountByQuarter2 = createAsyncThunk (
    'revenue/totaAmountByQuarter2',
    async () => {
        const response = await axios.get(prefixAPI + '/api/revenue/total-amount-by-quarter2');
        return response.data;
    }
);

export const genderCount = createAsyncThunk (
    'revenue/genderCount',
    async () => {
        const response = await axios.get(prefixAPI + '/api/revenue/gender-stats');
        return response.data;
    }
);

export const reviewCount = createAsyncThunk (
    'revenue/reviewCount',
    async () => {
        const response = await axios.get(prefixAPI + '/api/revenue/count-by-rate');
        return response.data;
    }
);


const revenueSlice = createSlice ({
    name: 'revenue',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(totalRevenue.fulfilled, (state, action) => {
                state.revenue = action.payload;
            })
            .addCase(reviewAVG.fulfilled, (state, action) => {
                state.reviewAvg = action.payload;
            })
            .addCase(totalProductQuantity.fulfilled, (state, action) => {
                state.totalProductQuantityValue = action.payload;
            })
            .addCase(totalSoldProducts.fulfilled, (state, action) => {
                state.totalSoldProductsValue = action.payload;
            })
            .addCase(totaAmountByQuarter.fulfilled, (state, action) => {
                state.totaAmountByQuarterValue = action.payload;
            })
            .addCase(totaAmountByQuarter2.fulfilled, (state, action) => {
                state.totaAmountByQuarterValue2 = action.payload;
            })
            .addCase(genderCount.fulfilled, (state, action) => {
                state.genderCountValue = action.payload;
            })
            .addCase(reviewCount.fulfilled, (state, action) => {
                state.reviewCountValue = action.payload;
            })
    }
})

export default revenueSlice.reducer;