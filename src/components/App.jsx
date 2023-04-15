import { nanoid } from 'nanoid';
import { useState, useEffect } from 'react';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { Form } from './Form/Form';

const CONTACT_KEY = 'contacts';
export const App = () => {
  //функція у useState відбудеться ще до didMount, але це тільки для синхронних операцій--lazy initializatin
  const [contacts, setContacts] = useState(() => {
    const parsedContacts = JSON.parse(localStorage.getItem(CONTACT_KEY));
    if (parsedContacts) {
      return parsedContacts;
    }
    return [];
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem(CONTACT_KEY, JSON.stringify(contacts));
  }, [contacts]);

  const addContact = (name, number) => {
    const contact = {
      name,
      number,
      id: nanoid(),
    };
    const listOfNames = contacts.map(({ name }) => name.toUpperCase());
    const nameToUpperCase = name.toLocaleUpperCase();
    // console.log(listOfNames);

    if (listOfNames.includes(nameToUpperCase)) {
      return alert(`${name} is already in contacs.`);
    }
    setContacts(prevContacts => [contact, ...prevContacts]);
  };

  const filterChange = event => {
    setFilter(event.currentTarget.value);
  };
  const filterRender = () => {
    const normalizedFilter = filter.toLocaleUpperCase();
    return contacts.filter(contact =>
      contact.name.toLocaleUpperCase().includes(normalizedFilter)
    );
  };
  const onDelete = event => {
    const id = event.currentTarget.id;
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== id)
    );
  };
  const stats = filterRender();
  // console.log('stats: ', stats);
  return (
    <>
      <h2>Phonebook</h2>
      <div>
        <Form addContact={addContact} />
      </div>
      <h2>Contacts</h2>
      <Filter value={filter} onChange={filterChange}></Filter>
      <ContactList dataContact={stats} onDelete={onDelete} />
    </>
  );
};
