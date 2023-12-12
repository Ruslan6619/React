import { configureStore } from '@reduxjs/toolkit';
import contactReducer from './reducers';

const store = configureStore({
    reducer: {
        contacts: contactReducer,
    },
});

export default store;
