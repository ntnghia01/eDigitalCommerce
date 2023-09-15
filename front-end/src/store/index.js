import { createStore, applyMiddleware } from 'redux';
import { Provider, createStoreHook } from 'react-redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers'; // Import các reducers của bạn từ thư mục tương ứng
import categoryReducer from '../slices/categorySlice';
import { configureStore } from '@reduxjs/toolkit';
import brandSlice from '../slices/brandSlice';
import categorySlice from '../slices/categorySlice';


// const store = createStore(rootReducer, applyMiddleware(thunk));
const store = configureStore ({
    reducer: {
        // categories: categoryReducer,
        categories: categorySlice,
        brand: brandSlice,
    },
});

export default store;
