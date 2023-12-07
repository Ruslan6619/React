import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { addContact } from '../Redux/actions';
import { useNavigate } from 'react-router-dom';

const AddContactForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            name: '',
            surname: '',
            phone: '',
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Пожалуйста, введите имя'),
            surname: Yup.string().required('Пожалуйста, введите фамилию'),
            phone: Yup.string().required('Пожалуйста, введите номер телефона'),
        }),
        onSubmit: (values, { resetForm }) => {
            dispatch(addContact(values));
            resetForm();
            navigate('/contacts');
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

                <button type="submit" key="saveButton">Сохранить</button>
                <button type="button" onClick={() => navigate('/contacts')}>Отмена</button>
            </form>
        </div>
    );
};

export default AddContactForm;
