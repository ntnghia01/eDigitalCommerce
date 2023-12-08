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


export const searchContact = createAsyncThunk (
    'contact/search',
    async (searchData) => {
        const response = await axios.post(prefixAPI + '/api/contact/search', searchData);
        return response.data;
    }
)

export const confirmContact = createAsyncThunk (
    'contact/confirm',
    async (contactId) => {
        const response = await axios.put(prefixAPI + `/api/contact/confirm/${contactId}`);
        return response.data;
    }
)

export const deleteContact = createAsyncThunk (
    'contact/delete',
    async (contactId) => {
        const response = await axios.delete(prefixAPI + `/api/contact/delete/${contactId}`);
        return response.data;
    }
)

export const addContact = createAsyncThunk (
    'contact/addd',
    async (contactData) => {
        const response = await axios.post(prefixAPI + "/api/contact", contactData);
        return response.data;
    }
)


const contactSlice = createSlice ({
    name: 'contact',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchContacts.fulfilled, (state, action) => {
                state.contacts = action.payload;
            })
            .addCase(searchContact.fulfilled, (state, action) => {
                state.contacts = action.payload;
            })
    }
})

export default contactSlice.reducer;