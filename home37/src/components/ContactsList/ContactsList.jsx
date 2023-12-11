import React, { useState } from 'react';

const ContactsList = ({ contacts, onDeleteContact }) => {
    const [selectedContact, setSelectedContact] = useState(null);
    const [isModalOpen, setModalOpen] = useState(false);

    const openModal = (contact) => {
        setSelectedContact(contact);
        setModalOpen(true);
    };

    const closeModal = () => {
        setSelectedContact(null);
        setModalOpen(false);
    };

    const handleDelete = () => {
        onDeleteContact(selectedContact.id);
        closeModal();
    };

    return (
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
                            <button onClick={() => openModal(contact)}>Удалить</button>
                        </td>
                    </tr>
                ))}



                </tbody>
            </table>

            {isModalOpen && (
                <div className="modal" key={`modal-${selectedContact.id}`}>
                    <div className="modal-content">
                        <h2>Вы уверены, что хотите удалить этот контакт?</h2>
                        <p key={`contactName-${selectedContact.id}`}>
                            {selectedContact && `${selectedContact.name} ${selectedContact.surname}`}
                        </p>
                        <button key={`deleteButton-${selectedContact.id}`} onClick={handleDelete}>
                            Да, удалить
                        </button>
                        <button key={`cancelButton-${selectedContact.id}`} onClick={closeModal}>
                            Отменить
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ContactsList;
