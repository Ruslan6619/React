import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

const AddContactForm = ({ onSaveContact, onCancel }) => {
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
            onSaveContact(values);
            onCancel();
            navigate('/contacts');
            resetForm();
        },
    });


    return (
        <div>
            <h2>Добавить контакт</h2>
            <form onSubmit={formik.handleSubmit}>
                <label>
                    Имя:
                    <input
                        type="text"
                        name="name"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.name}
                        className={formik.errors.name && formik.touched.name ? 'error' : ''}
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
                        className={formik.errors.surname && formik.touched.surname ? 'error' : ''}
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
                        className={formik.errors.phone && formik.touched.phone ? 'error' : ''}
                    />
                </label>
                {formik.errors.phone && formik.touched.phone && <div className="error-text">{formik.errors.phone}</div>}

                <button type="submit">Сохранить</button>
                <button type="button" onClick={() => { onCancel(); navigate('/contacts'); }}>
                    Отменить
                </button>

            </form>
        </div>
    );
};

export default AddContactForm;
