import { useDispatch, useSelector } from "react-redux";
import { addContact } from "../../redux/contactsSlice"
import { getContacts } from 'redux/selectors';
import { Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { nanoid } from 'nanoid';
import { Report } from 'notiflix/build/notiflix-report-aio';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { IconContext } from 'react-icons';
import {
    RiContactsFill,
    RiUserVoiceFill,
    RiUserFollowFill,
} from 'react-icons/ri';
import {
    FormWrp,
    LabelForm,
    InputForm,
    ButtonForm,
    InputError,
} from './ContactForm.styled';

const REGEX_NAME = /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/;
const REGEX_NUMBER =
    /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/;

const contactSchema = Yup.object().shape({
    name: Yup.string()
        .min(2)
        .max(20)
        .matches(
            REGEX_NAME,
            'Name may contain only letters, apostrophe, dash and spaces'
        )
        .required(),
    number: Yup.string()
        .matches(
            REGEX_NUMBER,
            'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +'
        )
        .required(),
});

export const ContactForm = () => {
    const dispatch = useDispatch();
    const contacts = useSelector(getContacts)

    const sendContact = ({ name, number }, { resetForm }) => {
        const contactId = nanoid();
        const newContact = { name, number, id: contactId };

        // check uniq contact
        if (!checkUniq(name)) {
            //send data to store
            dispatch(addContact(newContact));
            Notify.success('The contact has been sent to storage', {
                position: 'center-top',
            });
            resetForm();
        } else {
            Report.warning(
                'Sorry',
                'Not a unique contact - write a new one!',
                'Okay'
            );
        }
    };

    const checkUniq = name => {
        const newName = name.toLowerCase();
        return contacts.find(({ name }) => name.toLowerCase() === newName);
    };

    return (
        <Formik
            initialValues={{ name: '', number: '' }}
            onSubmit={sendContact}
            validationSchema={contactSchema}
        >
            <FormWrp autoComplete="off">
                <LabelForm>
                    <IconContext.Provider value={{ className: 'global-icon' }}>
                        <RiContactsFill />
                    </IconContext.Provider>
                    Name:
                    <InputForm type="text" name="name" />
                    <ErrorMessage name="name" component={InputError} />
                </LabelForm>
                <LabelForm>
                    <IconContext.Provider value={{ className: 'global-icon' }}>
                        <RiUserVoiceFill />
                    </IconContext.Provider>
                    Number:
                    <InputForm type="tel" name="number" />
                    <ErrorMessage name="number" component={InputError} />
                </LabelForm>
                <ButtonForm type="submit">
                    <IconContext.Provider value={{ className: 'global-icon' }}>
                        <RiUserFollowFill />
                    </IconContext.Provider>
                    Add contact
                </ButtonForm>
            </FormWrp>
        </Formik>
    );
};