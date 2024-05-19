import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const prefixAPI = 'http://localhost:9004';

const initialState = {
    products: [],
    product: {},
    productByCate: [],
    productByBrand: [],
    productNews: [],
    productMostSold: [],
    productRecentOrder: [],
    productRecentOrderBrand: []
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

export const fetchAvailableProductsDESC = createAsyncThunk (
    'product/availableDESC',
    async () => {
        const response = await axios.get(prefixAPI + '/api/product/availableDESC');
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

export const searchProductAvailable = createAsyncThunk (
    'productAvailable/search',
    async (searchData) => {
        const response = await axios.post(prefixAPI + '/api/product/available/search', searchData);
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

export const getProductByCategory = createAsyncThunk (
    'product/getByCategory',
    async (cateId) => {
        const response = await axios.get(prefixAPI + `/api/product/category/${cateId}`);
        return response.data;
    }
)

export const getProductByBrand = createAsyncThunk (
    'product/getByBrand',
    async (brandId) => {
        const response = await axios.get(prefixAPI + `/api/product/brand/${brandId}`);
        return response.data;
    }
)

export const getProductMostSold = createAsyncThunk (
    'product/mostSold',
    async () => {
        const response = await axios.get(prefixAPI + '/api/product/most-sold');
        return response.data;
    }
)

export const getProductRecentOrder = createAsyncThunk (
    'product/recentOrder',
    async (userId) => {
        const response = await axios.get(prefixAPI + `/api/product/recently-ordered-category-products/${userId}`);
        return response.data;
    }
)

export const getProductRecentOrderBrand = createAsyncThunk (
    'product/recentOrderBrand',
    async (userId) => {
        const response = await axios.get(prefixAPI + `/api/product/recently-ordered-brand-products/${userId}`);
        return response.data;
    }
)

export const lowToHigh = createAsyncThunk (
    'product/lowToHigh',
    async () => {
        const response = await axios.get(prefixAPI + `/api/product/sorted-by-price-desc}`);
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
            .addCase(getProductByCategory.fulfilled, (state, action) => {
                state.productByCate = action.payload;
            })
            .addCase(getProductByBrand.fulfilled, (state, action) => {
                state.productByBrand = action.payload;
            })
            .addCase(addProduct.fulfilled, (state, action) => {
                state.productByBrand = action.payload;
            })
            .addCase(searchProductAvailable.fulfilled, (state, action) => {
                state.products = action.payload;
            })
            .addCase(fetchAvailableProductsDESC.fulfilled, (state, action) => {
                state.productNews = action.payload;
            })
            .addCase(getProductMostSold.fulfilled, (state, action) => {
                state.productMostSold = action.payload;
            })
            .addCase(getProductRecentOrder.fulfilled, (state, action) => {
                state.productRecentOrder = action.payload;
            })
            .addCase(getProductRecentOrderBrand.fulfilled, (state, action) => {
                state.productRecentOrderBrand = action.payload;
            })
            .addCase(lowToHigh.fulfilled, (state, action) => {
                state.products = action.payload;
            })
    }
});

export default productSlice.reducer;