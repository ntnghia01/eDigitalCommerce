import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const prefixAPI = 'http://localhost:9004';

const initialState = {
    comments: []
}

export const fetchComments = createAsyncThunk (
    'comment/fetch',
    async () => {
        const response = await axios.get(prefixAPI + '/api/comment');
        return response.data;
    }
);

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

export const searchCommentByContent = createAsyncThunk (
    'comment/searchByContent',
    async (searchData) => {
        const response = await axios.post(prefixAPI + '/api/comment/searchByContent', searchData);
        return response.data;
    }
)


const commentSlice = createSlice ({
    name: 'comment',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCommentByProductID.fulfilled, (state, action) => {
                state.comments = action.payload;
            })
            .addCase(fetchComments.fulfilled, (state, action) => {
                state.comments = action.payload;
            })
            .addCase(searchCommentByContent.fulfilled, (state, action) => {
                state.comments = action.payload;
            })
    }
})

export default commentSlice.reducer;