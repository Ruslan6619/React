const initialState = {
    contacts: [],
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_CONTACT':
            return {
                ...state,
                contacts: [...state.contacts, action.payload],
            };
        case 'DELETE_CONTACT':
            return {
                ...state,
                contacts: state.contacts.filter((contact) => contact.id !== action.payload),
            };
        case 'FETCH_CONTACTS':
            return {
                ...state,
                contacts: action.payload,
            };
        default:
            return state;
    }
};

export default rootReducer;
