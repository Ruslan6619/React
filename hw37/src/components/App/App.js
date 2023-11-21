import React, { useState, useEffect } from 'react';
import './App.css';
import ContactsList from '../ContactsList/ContactsList';
import AddContactForm from '../AddContactForm/AddContactForm';
import { Route, Routes, Link, Navigate } from 'react-router-dom';

function App() {
    const [yourContactsArray, setYourContactsArray] = useState([]);
    const [showContacts, setShowContacts] = useState(false);

    useEffect(() => {
        const storedContacts = JSON.parse(localStorage.getItem('contacts')) || [];
        setYourContactsArray(storedContacts);

        const fetchData = async () => {
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/users');
                const data = await response.json();

                const formattedData = data.map(user => {
                    const [name, surname] = user.name.split(' ');
                    return {
                        id: user.id,
                        name,
                        surname,
                        phone: user.phone,
                    };
                });

                setYourContactsArray(formattedData);
                localStorage.setItem('contacts', JSON.stringify(formattedData));
            } catch (error) {
                console.error('Ошибка загрузки данных:', error);
            }
        };

        fetchData();
    }, []);

    const handleDeleteContact = (contactId) => {
        const updatedContacts = yourContactsArray.filter(contact => contact.id !== contactId);
        setYourContactsArray(updatedContacts);
        localStorage.setItem('contacts', JSON.stringify(updatedContacts));
    };

    const handleSaveContact = (newContact) => {
        setYourContactsArray([...yourContactsArray, newContact]);
        setShowContacts(true);
    };

    const handleCancel = () => {
        setShowContacts(true);
    };

    return (
        <div className="App">
            <h1>Телефонная книга</h1>
            <nav>
                <ul>
                    <li>
                        <Link to="/contacts" onClick={() => setShowContacts(true)}>Список контактов</Link>
                    </li>
                    <li>
                        <Link to="/add-contact">Добавить контакт</Link>
                    </li>
                </ul>
            </nav>
            <Routes>
                <Route path="/*" element={<Navigate to="/contacts" />} />
                {showContacts && (
                    <Route
                        path="/contacts"
                        element={<ContactsList contacts={yourContactsArray} onDeleteContact={handleDeleteContact} />}
                    />
                )}
                <Route
                    path="/add-contact"
                    element={
                        <AddContactForm
                            onSaveContact={handleSaveContact}
                            onCancel={handleCancel}
                        />
                    }
                />
            </Routes>
        </div>
    );
}

export default App;
