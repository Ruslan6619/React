import React from 'react';

const ContactsList = ({ contacts, onDeleteContact }) => (
    <div>
        <h2>Список контактов</h2>
        <table>
            <thead>
            <tr>
                <th>Имя</th>
                <th>Фамилия</th>
                <th>Телефон</th>
                <th>Удалить</th>
            </tr>
            </thead>
            <tbody>
            {contacts.map((contact, index) => (
                <tr key={index}>
                    <td>{contact.name}</td>
                    <td>{contact.surname}</td>
                    <td>{contact.phone}</td>
                    <td>
                        <button onClick={() => onDeleteContact(contact.id)}>Удалить</button>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    </div>
);


export default ContactsList;
