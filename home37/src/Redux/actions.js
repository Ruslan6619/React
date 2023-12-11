export const ADD_CONTACT = 'ADD_CONTACT';
export const DELETE_CONTACT = 'DELETE_CONTACT';
export const FETCH_CONTACTS = 'FETCH_CONTACTS';

export const addContact = (contact) => ({
    type: ADD_CONTACT,
    payload: contact,
});

export const deleteContact = (contactId) => ({
    type: DELETE_CONTACT,
    payload: contactId,
});

export const fetchContacts = (contacts) => ({
    type: FETCH_CONTACTS,
    payload: contacts,
});
