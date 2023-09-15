// categorySlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const pathAPI = 'http://localhost:9004';

const initialState = {
    categories: [],
    isLoading: false,
    error: null,
    selectedCategoryId: null,
    searchTerm: '',
};

export const fetchCategories = createAsyncThunk(
    'categories/fetchCategories',
    async () => {
        const response = await axios.get(pathAPI + '/api/category');
        return response.data;
    }
);

export const addCategory = createAsyncThunk(
    'categories/addCategory',
    async (categoryData) => {
        const response = await axios.post(pathAPI + '/api/category', categoryData);
        return response.data;
    }
);

export const updateCategory = createAsyncThunk(
    'categories/updateCategory',
    async ({ categoryId, categoryData }) => {
        const response = await axios.put(pathAPI+`/api/category/${categoryId}`, categoryData);
        return response.data;
    }
);

export const deleteCategory = createAsyncThunk(
    'categories/deleteCategory',
    async (categoryId) => {
        await axios.delete(pathAPI+`/api/category/delete/${categoryId}`);
        return categoryId;
    }
);

export const fetchCategory = createAsyncThunk(
    'categories/fetchCategory',
    async (categoryId) => {
        const response = await axios.get(`http://localhost:3001/api/category/${categoryId}`);
        return response.data;
    }
);

export const searchCategories = createAsyncThunk(
    'categories/search',
    async (searchTerm, thunkAPI) => {
        try {
            const response = await axios.get(`http://localhost:3001/api/categories/search?search=${encodeURIComponent(searchTerm)}`);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

const categorySlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        setSelectedCategoryId: (state, action) => {
            state.selectedCategoryId = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.isLoading = false;
                state.categories = action.payload;
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
            .addCase(addCategory.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(addCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                // state.categories.push(action.payload);
            })
            .addCase(addCategory.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
            .addCase(updateCategory.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(updateCategory.fulfilled, (state, action) => {
                // const updatedCategory = action.payload;
                // const index = state.categories.findIndex((category) => category.cate_id === updatedCategory.cate_id);
                // if (index !== -1) {
                //     state.categories[index] = updatedCategory;
                // }
            })
            .addCase(updateCategory.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
            .addCase(deleteCategory.fulfilled, (state, action) => {
                // const deltedCategoryId = action.payload;
                // state.categories = state.categories.filter((category) => category.cate_id !== deltedCategoryId);
            })
            .addCase(fetchCategory.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.categories = [action.payload];
            })
            .addCase(fetchCategory.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
            .addCase(searchCategories.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(searchCategories.fulfilled, (state, action) => {
                state.isLoading = false;
                state.categories = action.payload;
            })
            .addCase(searchCategories.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            ;
    },
    // cac reducers khac...
//    categories: [],
});
// categories: [],
export const { setSelectedCategoryId } = categorySlice.actions;
export default categorySlice.reducer;
