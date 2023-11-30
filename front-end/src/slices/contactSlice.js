import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const prefixAPI = 'http://localhost:9004';

const initialState = {
    contacts: []
}

export const fetchContacts = createAsyncThunk (
    'contact/fetch',
    async () => {
        const response = await axios.get(prefixAPI + '/api/contact');
        return response.data;
    }
);





const contactSlice = createSlice ({
    name: 'contact',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchContacts.fulfilled, (state, action) => {
                state.contacts = action.payload;
            })
    }
})

export default contactSlice.reducer;