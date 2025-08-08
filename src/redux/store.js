import { configureStore } from '@reduxjs/toolkit';
import handleCart from './reducer/handleCart';
import { productsApi } from '../services/productsApi';

const store = configureStore({
    reducer: {
        handleCart,
        [productsApi.reducerPath]: productsApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(productsApi.middleware),
});

export default store;
