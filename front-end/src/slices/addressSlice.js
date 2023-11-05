import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const prefixAPI = 'http://localhost:9004';
const myToken = 'c5d043f1-7706-11ee-96dc-de6f804954c9';

const initialState = {
    addresses: [],
    address: {},
    defaultAddress: {},
    addressProvince: [],
    addressDistrict: [],
    addressWard: []
}

export const fetchAddresses = createAsyncThunk (
    'address/fetch',
    async (customerId) => {
        const response = await axios.get(prefixAPI + `/api/address/customer/${customerId}`);
        return response.data;
    }
)

export const addAddress = createAsyncThunk (
    'address/add',
    async (addressData) => {
        const response = await axios.post(prefixAPI + '/api/address', addressData);
        return response.data;
    }
);

export const deleteAddress = createAsyncThunk (
    'address/delete',
    async (addressId) => {
        const response = await axios.delete(prefixAPI + `/api/address/${addressId}`);
        return response.data;
    }
);

export const editAddress = createAsyncThunk (
    'address/edit',
    async ({addressId, addressData}) => {
        const response = await axios.put(prefixAPI + `/api/address/${addressId}`, addressData);
        return response.data;
    }
);

export const getAddress = createAsyncThunk (
    'address/getAddress',
    async (addressId) => {
        const response = await axios.get(prefixAPI + `/api/address/${addressId}`);
        return response.data;
    }
);

export const getDefaultAddress = createAsyncThunk (
    'address/default',
    async (customerId) => {
        const response = await axios.get(prefixAPI + `/api/address/default/${customerId}`);
        return response.data;
    }
);

export const fetchAddressProvince = createAsyncThunk(
    'address/fetchAddressProvince',
    async (_, thunkAPI) => {
      try {
        const myToken = 'c5d043f1-7706-11ee-96dc-de6f804954c9';
        const response = await axios.get("https://online-gateway.ghn.vn/shiip/public-api/master-data/province", {
            headers: {
                'token': myToken,
                'Content-Type': 'application/json'
              }
        });
        return response.data.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  );

export const fetchAddressDistrictByProvinceID = createAsyncThunk(
    'address/fetchAddressDistrictByProvinceID',
    async (provinceId, thunkAPI) => {
      try {
        const myToken = 'c5d043f1-7706-11ee-96dc-de6f804954c9';
        const response = await axios.get("https://online-gateway.ghn.vn/shiip/public-api/master-data/district", {
            headers: {
                'token': myToken,
                'Content-Type': 'application/json'
            },
            params: {
                province_id: provinceId
            }
        });
        return response.data.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  );

  export const fetchAddressWardByDistrictID = createAsyncThunk(
    'address/fetchAddressWardByDistrictID',
    async (districtId, thunkAPI) => {
      try {
        const myToken = 'c5d043f1-7706-11ee-96dc-de6f804954c9';
        const response = await axios.get("https://online-gateway.ghn.vn/shiip/public-api/master-data/ward", {
            headers: {
                'token': myToken,
                'Content-Type': 'application/json'
            },
            params: {
                district_id: districtId
            }
        });
        return response.data.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  );
  
  

const addressSlice = createSlice ({
    name: 'address',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addAddress.fulfilled, (state, action) => {
                console.log("add address success");
            })
            .addCase(fetchAddresses.fulfilled, (state,action) => {
                state.addresses = action.payload;
            })
            .addCase(getAddress.fulfilled, (state, action) => {
                state.address = action.payload;
            })
            .addCase(getDefaultAddress.fulfilled, (state, action) => {
                state.defaultAddress = action.payload;
            })
            .addCase(fetchAddressProvince.fulfilled, (state, action) => {
                state.addressProvince = action.payload;
            })
            .addCase(fetchAddressProvince.rejected, (state, action) => {
                console.error('Error fetching address province:', action.error.message);
            })
            .addCase(fetchAddressDistrictByProvinceID.fulfilled, (state, action) => {
                state.addressDistrict = action.payload;
            })
            .addCase(fetchAddressDistrictByProvinceID.rejected, (state, action) => {
                console.error('Error fetching address district:', action.error.message);
            })
            .addCase(fetchAddressWardByDistrictID.fulfilled, (state, action) => {
                state.addressWard = action.payload;
            })
            .addCase(fetchAddressWardByDistrictID.rejected, (state, action) => {
                console.error('Error fetching address ward:', action.error.message);
            })
    }
})

export default addressSlice.reducer;