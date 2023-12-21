
import React, { useEffect } from 'react';
import './App.css';
import ContactsList from '../ContactsList/ContactsList';
import AddContactForm from '../AddContactForm/AddContactForm';
import { useDispatch, useSelector } from 'react-redux';
import { addContact, deleteContact, fetchContacts } from '../../Redux/contactsSlice';
import axios from 'axios';
import { Route, Routes, Link as ReactRouterLink, Navigate, useNavigate } from 'react-router-dom';

interface Contact {
    name: string;
    surname: string;
    phone: string;
}


type RootState = {
    contacts: {
        contacts: Contact[];
    };
};

const App: React.FC = () => {
    const dispatch = useDispatch();
    const yourContactsArray = useSelector((state: RootState) => state.contacts.contacts);



    const handleDeleteContact = (contactId: number) => {
        dispatch(deleteContact(contactId));
    };

    const handleSaveContact = (newContact: Contact) => {
        dispatch(addContact(newContact));
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get<Contact[]>('https://jsonplaceholder.typicode.com/users');
                const data = response.data;

                dispatch(fetchContacts(data));
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [dispatch]);

    return (
        <div className="App">
            <h1>Телефонная книга</h1>
            <nav>
                <ul>
                    <li>
                        <ReactRouterLink to="/contacts">Список контактов</ReactRouterLink>
                    </li>
                    <li>
                        <ReactRouterLink to="/add-contact">Добавить контакт</ReactRouterLink>
                    </li>
                </ul>
            </nav>
            <Routes>
                <Route path="/" element={<Navigate to="/contacts" />} />
                <Route
                    path="/contacts"
                    element={<ContactsList contacts={yourContactsArray} onDeleteContact={handleDeleteContact} />}
                />
                <Route path="/add-contact" element={<AddContactForm onSaveContact={handleSaveContact} />} />
            </Routes>
        </div>
    );
};

export default App;
