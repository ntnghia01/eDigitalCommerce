import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const prefixAPI = 'http://localhost:9004';

const initialState = {
    reviews: []
}

export const fetchReviews = createAsyncThunk (
    'review/fetch',
    async () => {
        const response = await axios.get(prefixAPI + '/api/review');
        return response.data;
    }
);

export const reviewOrder = createAsyncThunk (
    'order/review',
    async (reviewData) => {
        const response = await axios.post(prefixAPI + '/api/review', reviewData);
        return response.data;
    }
);

export const searchReviewByContent = createAsyncThunk (
    'review/searchByContent',
    async (searchData) => {
        const response = await axios.post(prefixAPI + '/api/review/searchByContent', searchData);
        return response.data;
    }
)



const reviewSlice = createSlice ({
    name: 'review',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchReviews.fulfilled, (state, action) => {
                state.reviews = action.payload;
            })
            .addCase(searchReviewByContent.fulfilled, (state, action) => {
                state.reviews = action.payload;
            })
    }
})

export default reviewSlice.reducer;