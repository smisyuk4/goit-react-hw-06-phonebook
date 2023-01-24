// import { useState, useEffect } from 'react';
import { ContactForm } from 'components/ContactForm';
import { ListContacts } from 'components/ListContacts';
import { Title } from 'components/Title';
import { Phonebook, MainTitle } from "./App.styled"

import { useSelector } from "react-redux";
import { getContacts, getFilter } from 'redux/selectors';

//custom hook
// const useLocalStorage = (key, defaultValue) => {
//   const [state, setState] = useState(() => {
//     return JSON.parse(localStorage.getItem(key)) ?? defaultValue
//   })

//   useEffect(() => {
//     localStorage.setItem(key, JSON.stringify(state))
//   },[key, state])

//   return [state, setState]
// }

export const App =()=>{
  const contacts = useSelector(getContacts)
  const filterValue = useSelector(getFilter)
  // const [contacts, setContact] = useLocalStorage('contacts', [...contacts])

  const showContacts = () => {
    const fullBaseContacts = contacts;
    const findName = filterValue.toLowerCase();

    return fullBaseContacts.filter(({ name }) =>
      name.toLowerCase().includes(findName)
    );
  };

  return (
    <Phonebook>
      <MainTitle>My favorite</MainTitle>
      <Title
        title="Phonebook"
        children={
          <ContactForm/>
        }
      />
      <Title
        title="Contacts"
        children={
          <ListContacts
            arrayContacts={showContacts()}    
          />
        }
      />
    </Phonebook>
  );
}