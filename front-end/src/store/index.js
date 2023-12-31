import { createStore, applyMiddleware } from 'redux';
import { Provider, createStoreHook } from 'react-redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers'; // Import các reducers của bạn từ thư mục tương ứng
import categoryReducer from '../slices/categorySlice';
import { configureStore } from '@reduxjs/toolkit';
import brandSlice from '../slices/brandSlice';
import categorySlice from '../slices/categorySlice';
import supplierSlice from '../slices/supplierSlice';
import productSlice from '../slices/productSlice';
import importSlice from '../slices/importSlice';
import cartSlice from '../slices/cartSlice';
import customerSlice from '../slices/customerSlice';
import addressSlice from '../slices/addressSlice';
import paymentSlice from '../slices/paymentSlice';
import orderSlice from '../slices/orderSlice';
import shipperSlice from '../slices/shipperSlice';
import adminSlice from '../slices/adminSlice';
import reviewSlice from '../slices/reviewSlice';
import commentSlice from '../slices/commentSlice';
import accountSlice from '../slices/accountSlice';
import blogSlice from '../slices/blogSlice';
import contactSlice from '../slices/contactSlice';
import imageSlice from '../slices/imageSlice';
import revenueSlice from '../slices/revenueSlice';


// const store = createStore(rootReducer, applyMiddleware(thunk));
const store = configureStore ({
    reducer: {
        // categories: categoryReducer,
        customer: customerSlice,
        categories: categorySlice,
        brand: brandSlice,
        supplier: supplierSlice,
        product: productSlice,
        import: importSlice,
        cart: cartSlice,
        address: addressSlice,
        payment: paymentSlice,
        order: orderSlice,
        shipper: shipperSlice,
        admin: adminSlice,
        review: reviewSlice,
        comment: commentSlice,
        account: accountSlice,
        blog: blogSlice,
        contact: contactSlice,
        image: imageSlice,
        revenue: revenueSlice
    },
});

export default store;
