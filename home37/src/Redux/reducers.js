import { createSlice } from '@reduxjs/toolkit';

const contactSlice = createSlice({
    name: 'contacts',
    initialState: {
        contacts: [],
    },
    reducers: {
        addContact: (state, action) => {
            state.contacts.push(action.payload);
        },
        deleteContact: (state, action) => {
            state.contacts = state.contacts.filter((contact) => contact.id !== action.payload);
        },
        fetchContacts: (state, action) => {
            state.contacts = action.payload;
        },
    },
});


export default contactSlice.reducer;
