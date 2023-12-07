import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const prefixAPI = 'http://localhost:9004';

const initialState = {
    blogs: [],
    blog: null
}

export const fetchBlogs = createAsyncThunk (
    'blog/fetch',
    async () => {
        const response = await axios.get(prefixAPI + '/api/blog');
        return response.data;
    }
);

export const fetchBlogAvailable = createAsyncThunk (
    'blog/available',
    async () => {
        const response = await axios.get(prefixAPI + '/api/blog/available');
        return response.data;
    }
);

export const searchBlogByTitle = createAsyncThunk (
    'blog/searchByTitle',
    async (searchData) => {
        const response = await axios.post(prefixAPI + '/api/blog/searchByTitle', searchData);
        return response.data;
    }
)

export const searchBlogAvailableByTitle = createAsyncThunk (
    'blogAvailalbe/searchByTitle',
    async (searchData) => {
        const response = await axios.post(prefixAPI + '/api/blog/available/searchByTitle', searchData);
        return response.data;
    }
)


export const getBlogByID = createAsyncThunk (
    'blog/getByID',
    async (blogId) => {
        const response = await axios.get(prefixAPI + `/api/blog/${blogId}`);
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

export const editBlog = createAsyncThunk (
    'blog/edit',
    async ({blogId, blogData}) => {

        const formData = new FormData();

        // Đưa dữ liệu sản phẩm vào FormData
        formData.append('blogTitle', blogData.blogTitle);
        formData.append('blogContent', blogData.blogContent);
        formData.append('blogImage', blogData.blogImage);
        formData.append('blogStatus', blogData.blogStatus);

        // Kiểm tra xem có tệp hình ảnh được chọn không
        if (blogData.image != undefined) {
            formData.append('image', blogData.image);
        }
        try {
            const response = await fetch(prefixAPI + `/api/blog/${blogId}`, {
                method: 'PUT',
                body: formData,
            });

            const data = await response.json();
            return data;
        } catch (error) {
            throw error;
        }
    }
);

export const deleteBlog = createAsyncThunk (
    'blog/delete',
    async (blogId) => {
        const response = await axios.delete(prefixAPI + `/api/blog/delete/${blogId}`);
        return response.data;
    }
)



const blogSlice = createSlice ({
    name: 'blog',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchBlogs.fulfilled, (state, action) => {
                state.blogs = action.payload;
            })
            .addCase(fetchBlogAvailable.fulfilled, (state, action) => {
                state.blogs = action.payload;
            })
            .addCase(searchBlogByTitle.fulfilled, (state, action) => {
                state.blogs = action.payload;
            })
            .addCase(getBlogByID.fulfilled, (state, action) => {
                state.blog = action.payload;
            })
            .addCase(searchBlogAvailableByTitle.fulfilled, (state, action) => {
                state.blogs = action.payload;
            })
    }
})

export default blogSlice.reducer;