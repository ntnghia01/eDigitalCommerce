import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const prefixAPI = 'http://localhost:9004';

const initialState = {
    imports: [],
    importDetails: []
}

export const fetchImports = createAsyncThunk (
    'import/fetchImports',
    async () => {
        const response = await axios.get(prefixAPI + '/api/import');
        return response.data;
    }
);

export const fetchImportDetails = createAsyncThunk (
    'import/importDetails',
    async (importID) => {
        const response = await axios.get(prefixAPI + `/api/importdetail/${importID}`);
        return response.data;
    }
)

export const addImport = createAsyncThunk (
    'import/add',
    async ({importData, importDetailData}) => {
        try {
            const response = await axios.post(prefixAPI + '/api/import', importData);
            const importId = response.data.importObject.importId;
            console.log(importData);

            const importDetailPromises = importDetailData.map(async (detailData) => {
                detailData.importImport = importId;
                console.log(detailData);
                return axios.post(prefixAPI + '/api/importdetail', detailData);
            });

            await Promise.all(importDetailPromises);
            
            return response.data;
        } catch (error) {
            // Xử lý lỗi ở đây nếu cần
            console.error('Error:', error);
            throw error; // Ném lại lỗi để Redux Toolkit xử lý
        }
        
    }
)

const importSlice = createSlice ({
    name: 'import',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchImports.fulfilled, (state, action) => {
                state.imports = action.payload;
            })
            .addCase(fetchImportDetails.fulfilled, (state, action) => {
                state.importDetails = action.payload;
            })
    }
});

export default importSlice.reducer;