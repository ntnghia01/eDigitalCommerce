import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const prefixAPI = 'http://localhost:9004';

const initialState = {
    products: [],
    product: {}
}

export const fetchProducts = createAsyncThunk (
    'product/fetchProducts',
    async () => {
        const response = await axios.get(prefixAPI + '/api/product');
        return response.data;
    }
);

export const fetchAvailableProducts = createAsyncThunk (
    'product/available',
    async () => {
        const response = await axios.get(prefixAPI + '/api/product/available');
        return response.data;
    }
)

export const getProductDetail = createAsyncThunk (
    'product/detail',
    async (proId) => {
        const response = await axios.get(prefixAPI + `/api/product/${proId}`);
        // console.log(response.data);
        return response.data;
    }
)

export const addProduct = createAsyncThunk (
    'product/add',
    async (productData) => {
        const formData = new FormData();

        // Đưa dữ liệu sản phẩm vào FormData
        formData.append('proName', productData.proName);
        formData.append('proPrice', productData.proPrice);
        formData.append('proDesc', productData.proDesc);
        formData.append('proQuantity', productData.proQuantity);
        formData.append('cateId', productData.cateId);
        formData.append('brandId', productData.brandId);
        formData.append('proImage', productData.proImage);

        // Kiểm tra xem có tệp hình ảnh được chọn không
        if (productData.image) {
            formData.append('image', productData.image);
        }

        try {
            const response = await fetch(prefixAPI + '/api/product', {
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

export const editProduct = createAsyncThunk (
    'product/edit',
    async ({proId, productData}) => {

        const formData = new FormData();

        // Đưa dữ liệu sản phẩm vào FormData
        formData.append('proName', productData.proName);
        formData.append('proPrice', productData.proPrice);
        formData.append('proDesc', productData.proDesc);
        formData.append('proQuantity', productData.proQuantity);
        formData.append('cateId', productData.cateId);
        formData.append('brandId', productData.brandId);
        formData.append('proImage', productData.proImage);
        formData.append('proStatus', productData.proStatus);

        // Kiểm tra xem có tệp hình ảnh được chọn không
        if (productData.image != undefined) {
            formData.append('image', productData.image);
        }
        try {
            const response = await fetch(prefixAPI + `/api/product/${proId}`, {
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

export const deleteProduct = createAsyncThunk (
    'product/delete',
    async (proId) => {
        await axios.delete(prefixAPI + `/api/product/${proId}`);
        return proId;
    }
)

export const searchProductByName = createAsyncThunk (
    'product/searchByName',
    async (searchData) => {
        const response = await axios.post(prefixAPI + '/api/product/search', searchData);
        console.log("ok");
        return response.data;
    }
)

const productSlice = createSlice ({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.products = action.payload;
            })
            .addCase(fetchAvailableProducts.fulfilled, (state, action) => {
                state.products = action.payload;
            })
            .addCase(getProductDetail.fulfilled, (state, action) => {
                state.product = action.payload;
            })
            .addCase(searchProductByName.fulfilled, (state, action) => {
                state.products = action.payload;
            })
    }
});

export default productSlice.reducer;