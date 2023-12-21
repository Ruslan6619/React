import React from 'react';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { addContact } from '../../Redux/contactsSlice';
import { useNavigate } from 'react-router-dom';
import { string, object } from 'yup';

interface ContactFormValues {
    name: string;
    surname: string;
    phone: string;
}

const AddContactForm: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const formik = useFormik<ContactFormValues>({
        initialValues: {
            name: '',
            surname: '',
            phone: '',
        },
        validationSchema: object({
            name: string().required('Пожалуйста, введите имя'),
            surname: string().required('Пожалуйста, введите фамилию'),
            phone: string().required('Пожалуйста, введите номер телефона'),
        }),
        onSubmit: (values) => {
            dispatch(addContact(values));
            formik.resetForm();
            navigate('/contacts', { replace: true });
        },

    });

    return (
        <div>
            <h2>Добавить контакт</h2>
            <form onSubmit={formik.handleSubmit} key="addContactForm">
                <label>
                    Имя:
                    <input
                        type="text"
                        name="name"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.name}
                    />
                </label>
                {formik.errors.name && formik.touched.name && <div className="error-text">{formik.errors.name}</div>}

                <label>
                    Фамилия:
                    <input
                        type="text"
                        name="surname"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.surname}
                    />
                </label>
                {formik.errors.surname && formik.touched.surname && (
                    <div className="error-text">{formik.errors.surname}</div>
                )}

                <label>
                    Телефон:
                    <input
                        type="text"
                        name="phone"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.phone}
                    />
                </label>
                {formik.errors.phone && formik.touched.phone && (
                    <div className="error-text">{formik.errors.phone}</div>
                )}

                <button type="submit" key="saveButton">
                    Сохранить
                </button>
                <button type="button" onClick={() => navigate('/contacts')}>
                    Отмена
                </button>
            </form>
        </div>
    );
};

export default AddContactForm;
