import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const prefixAPI = 'http://localhost:9004';

const initialState = {
    blogs: []
}

export const fetchBlogs = createAsyncThunk (
    'blog/fetch',
    async () => {
        const response = await axios.get(prefixAPI + '/api/blog');
        return response.data;
    }
);

export const addBlog = createAsyncThunk (
    'blog/add',
    async (blogData) => {
        const formData = new FormData();

        // Đưa dữ liệu sản phẩm vào FormData
        formData.append('blogTitle', blogData.blogTitle);
        formData.append('blogContent', blogData.blogContent);
        formData.append('userId', blogData.userId);
        formData.append('blogImage', blogData.blogImage);

        // Kiểm tra xem có tệp hình ảnh được chọn không
        if (blogData.image) {
            formData.append('image', blogData.image);
        }

        try {
            const response = await fetch(prefixAPI + '/api/blog', {
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



const blogSlice = createSlice ({
    name: 'blog',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchBlogs.fulfilled, (state, action) => {
                state.blogs = action.payload;
            })
    }
})

export default blogSlice.reducer;