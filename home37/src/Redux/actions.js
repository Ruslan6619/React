import { createSlice } from '@reduxjs/toolkit';

const contactSlice = createSlice({
    name: 'contacts',
    initialState: [],
    reducers: {
        addContact: (state, action) => {
            return [...state, action.payload];
        },
        deleteContact: (state, action) => {
            return state.filter((contact) => contact.id !== action.payload);
        },
        fetchContacts: (state, action) => {
            return action.payload;
        },
    },
});

export const { addContact, deleteContact, fetchContacts } = contactSlice.actions;

