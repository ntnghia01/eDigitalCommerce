import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const prefixAPI = 'http://localhost:9004';

const initialState = {
    customerAccounts: [],
    shipperAccounts: [],
    adminAccounts: [],
    users: []
}

export const fetchCustomerAccounts = createAsyncThunk (
    'account/fetchCustomer',
    async () => {
        const response = await axios.get(prefixAPI + '/api/account/customer');
        return response.data;
    }
);

export const fetchShipperAccounts = createAsyncThunk (
    'account/fetchShipper',
    async () => {
        const response = await axios.get(prefixAPI + '/api/account/shipper');
        return response.data;
    }
);

export const fetchAdminAccounts = createAsyncThunk (
    'account/fetchAdmin',
    async () => {
        const response = await axios.get(prefixAPI + '/api/account/admin');
        return response.data;
    }
);

export const disableCustomerAccount = createAsyncThunk (
    'account/disableCustomer',
    async (userId) => {
        const response = await axios.delete(prefixAPI + `/api/account/${userId}`);
        return response.data;
    }
)

export const activeCustomerAccount = createAsyncThunk (
    'account/activeCustomer',
    async (userId) => {
        const response = await axios.put(prefixAPI + `/api/account/active/${userId}`);
        return response.data;
    }
)

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

export const searchCustomerAccount = createAsyncThunk (
    'account/searchCustomer',
    async (searchData) => {
        const response = await axios.post(prefixAPI + '/api/account/searchCustomer', searchData);
        return response.data;
    }
)

export const searchAdminAccount = createAsyncThunk (
    'account/searchAdmin',
    async (searchData) => {
        const response = await axios.post(prefixAPI + '/api/account/searchAdmin', searchData);
        return response.data;
    }
)

export const searchShipperAccount = createAsyncThunk (
    'account/searchShipper',
    async (searchData) => {
        const response = await axios.post(prefixAPI + '/api/account/searchShipper', searchData);
        return response.data;
    }
)

export const fetchAllUserAccount = createAsyncThunk (
    'account/fetchAllUserAccount',
    async () => {
        const response = await axios.get(prefixAPI + '/api/account');
        return response.data;
    }
)



export const uploadAvatar = createAsyncThunk (
    'account/uploadAvatar',
    async ({userId, avatarData}) => {
        const formData = new FormData();

        // Đưa dữ liệu sản phẩm vào FormData
        formData.append('userId', avatarData.userId);
        formData.append('userImage', avatarData.userImage);

        // Kiểm tra xem có tệp hình ảnh được chọn không
        if (avatarData.image != undefined) {
            formData.append('image', avatarData.image);
        }
        try {
            const response = await fetch(prefixAPI + `/api/account/avatar/${userId}`, {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();
            return data;
        } catch (error) {
            throw error;
        }
    }
)


const accountSlice = createSlice ({
    name: 'accountt',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCustomerAccounts.fulfilled, (state, action) => {
                state.customerAccounts = action.payload;
            })
            .addCase(fetchShipperAccounts.fulfilled, (state, action) => {
                state.shipperAccounts = action.payload;
            })
            .addCase(fetchAdminAccounts.fulfilled, (state, action) => {
                state.adminAccounts = action.payload;
            })
            .addCase(searchCustomerAccount.fulfilled, (state, action) => {
                state.customerAccounts = action.payload;
            })
            .addCase(searchAdminAccount.fulfilled, (state, action) => {
                state.adminAccounts = action.payload;
            })
            .addCase(searchShipperAccount.fulfilled, (state, action) => {
                state.shipperAccounts = action.payload;
            })
            .addCase(fetchAllUserAccount.fulfilled, (state, action) => {
                state.users = action.payload;
            })
    }
})

export default accountSlice.reducer;