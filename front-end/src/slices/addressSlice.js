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
    addressWard: [],
    calculateShipFee: 0
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

export const calculateFeee = createAsyncThunk(
    'address/calculateFee',
    async ({districtId, wardCode}, thunkAPI) => {
        try {
            const myToken = 'c5d043f1-7706-11ee-96dc-de6f804954c9';
            const response = await axios.post("https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee", 
            {
                "from_district_id":1572,
                "from_ward_code":"550113",
                "service_id":53323,
                "service_type_id":null,
                "to_district_id": 2264,
                "to_ward_code": "90816",
                "height":50,
                "length":20,
                "weight":200,
                "width":20,
                "insurance_value":10000,
                "cod_failed_amount":2000,
                "coupon": null
            },
            {
                headers: {
                    'Token': myToken,
                    'Content-Type': 'application/json',
                    'ShopId': '4664671',
                    'Content-Type': 'text/plain'
                }
            });
            return response.data.data.total;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const calculateFee = createAsyncThunk(
    'address/calculateFee',
    async ({ districtId, wardCode }, thunkAPI) => {
        if (districtId==1572 && wardCode=="550113") {
            return 0;
        }
        try {
            const myToken = 'c5d043f1-7706-11ee-96dc-de6f804954c9';
            const apiUrl = "https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee";

            const requestHeaders = {
                'Content-Type': 'application/json',
                'token': myToken,
                'ShopId': '4664671',
            };

            const requestBody = {
                "from_district_id": 1572,
                "from_ward_code": "550113",
                "service_id": null,
                "service_type_id": 2,
                "to_district_id": districtId,
                "to_ward_code": wardCode,
                "height":50,
                "length":20,
                "weight":200,
                "width":20,
                "insurance_value": 10000,
                "cod_failed_amount": 2000,
                "coupon": null
            };

            const response = await axios({
                method: 'POST',
                url: apiUrl,
                headers: requestHeaders,
                data: JSON.stringify(requestBody)
            });

            return response.data.data.total;
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
            .addCase(calculateFee.fulfilled, (state, action) => {
                state.calculateShipFee = action.payload;
            })
            .addCase(calculateFee.rejected, (state, action) => {
                console.error('Error calculate fee:', action.error.message);
            })
    }
})

export default addressSlice.reducer;