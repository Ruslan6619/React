import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddContactForm = ({ onSaveContact, onCancel }) => {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [phone, setPhone] = useState('');
    const [validationErrors, setValidationErrors] = useState({});
    const navigate = useNavigate();

    const handleSave = () => {
        if (!name || !surname || !phone) {
            setValidationErrors({
                name: !name,
                surname: !surname,
                phone: !phone,
            });
            return;
        }

        setValidationErrors({});

        onSaveContact({ name, surname, phone });
        onCancel();
        navigate('/contacts');
        setName('');
        setSurname('');
        setPhone('');
    };

    const handleCancel = () => {
        setValidationErrors({});
        onCancel();
        navigate('/contacts');
    };

    return (
        <div>
            <h2>Добавить контакт</h2>
            <form>
                <label>
                    Имя:
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        style={{ borderColor: validationErrors.name ? 'red' : '' }}
                    />
                </label>
                <label>
                    Фамилия:
                    <input
                        type="text"
                        value={surname}
                        onChange={(e) => setSurname(e.target.value)}
                        style={{ borderColor: validationErrors.surname ? 'red' : '' }}
                    />
                </label>
                <label>
                    Телефон:
                    <input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        style={{ borderColor: validationErrors.phone ? 'red' : '' }}
                    />
                </label>
                <button type="button" onClick={handleSave}>
                    Сохранить
                </button>
                <button type="button" onClick={handleCancel}>
                    Отменить
                </button>
            </form>
        </div>
    );
};

export default AddContactForm;
