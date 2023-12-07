import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const prefixAPI = 'http://localhost:9004';

const initialState = {
    images: []
}

export const fetchImageByProductID = createAsyncThunk (
    'image/fetch',
    async (proId) => {
        const response = await axios.get(prefixAPI + `/api/image/${proId}`);
        return response.data;
    }
);

export const addImage = createAsyncThunk (
    'image/add',
    async (imageData) => {
        const formData = new FormData();
        // Đưa dữ liệu sản phẩm vào FormData
        formData.append('proId', imageData.proId);
        // Kiểm tra xem có tệp hình ảnh được chọn không
        if (imageData.image) {
            formData.append('image', imageData.image);
        }
        try {
            const response = await fetch(prefixAPI + '/api/image', {
                method: 'POST',
                body: formData,
            });
            const data = await response.json();
            return data;
        } catch (error) {
            throw error;
        }
    }
);

export const deleteImage = createAsyncThunk (
    'image/delete',
    async (imageId) => {
        const response = await axios.delete(prefixAPI + `/api/image/delete/${imageId}`);
        return response.data;
    }
);



const imageSlice = createSlice ({
    name: 'image',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchImageByProductID.fulfilled, (state, action) => {
                state.images = action.payload;
            })
    }
})

export default imageSlice.reducer;