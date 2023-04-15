import { useState } from 'react';
import propTypes from 'prop-types';

export const Form = props => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const resetForm = () => {
    setName('');
    setNumber('');
  };
  const inputChangeHandler = event => {
    const name = event.currentTarget.name;
    const text = event.currentTarget.value;

    if (name === 'name') {
      setName(text);
    } else if (name === 'number') {
      setNumber(text);
    }
  };

  const formSubmitHandler = event => {
    event.preventDefault();

    props.addContact(name, number);
    resetForm();
  };

  return (
    <form onSubmit={formSubmitHandler}>
      <label htmlFor="name">
        Name
        <input
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          value={name}
          onChange={inputChangeHandler}
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </label>
      <label htmlFor="number">
        Number
        <input
          type="tel"
          name="number"
          value={number}
          onChange={inputChangeHandler}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </label>
      <button>Add contact</button>
    </form>
  );
};
Form.propTypes = {
  addContact: propTypes.func.isRequired,
};
