import React, { useEffect } from 'react';
import './App.css';
import ContactsList from '../ContactsList/ContactsList';
import AddContactForm from '../AddContactForm/AddContactForm';
import { Route, Routes, Link, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addContact, deleteContact, fetchContacts } from '../../Redux/actions';
import axios from 'axios';

function App() {
    const dispatch = useDispatch();
    const yourContactsArray = useSelector((state) => state.contacts.contacts);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://jsonplaceholder.typicode.com/users');
                const data = response.data;

                dispatch(fetchContacts(data));
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [dispatch]);

    const handleDeleteContact = (contactId) => {
        dispatch(deleteContact(contactId));
    };

    const handleSaveContact = (newContact) => {
        dispatch(addContact(newContact));
    };

    return (
        <div className="App">
            <h1>Телефонная книга</h1>
            <nav>
                <ul>
                    <li>
                        <Link to="/contacts">Список контактов</Link>
                    </li>
                    <li>
                        <Link to="/add-contact">Добавить контакт</Link>
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
}

export default App;
