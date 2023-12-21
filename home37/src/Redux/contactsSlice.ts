import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Contact {
    id: number;
    name: string;
    surname: string;
    phone: string;
}

interface ContactsState {
    contacts: Contact[];
}

const contactsSlice = createSlice({
    name: 'contacts',
    initialState: { contacts: [] } as ContactsState,
    reducers: {
        addContact: (state, action: PayloadAction<Contact>) => {
            state.contacts.push(action.payload);
        },
        deleteContact: (state, action: PayloadAction<number>) => {
            state.contacts = state.contacts.filter((contact) => contact.id !== action.payload);
        },
        fetchContacts: (state, action: PayloadAction<Contact[]>) => {
            state.contacts = action.payload;
        },
    },
});

export const { addContact, deleteContact, fetchContacts } = contactsSlice.actions;
export default contactsSlice.reducer;
