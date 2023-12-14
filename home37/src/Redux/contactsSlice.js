import { createSlice } from '@reduxjs/toolkit';

const contactsSlice = createSlice({
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

export const { addContact, deleteContact, fetchContacts } = contactsSlice.actions;
export default contactsSlice.reducer;
