import React from 'react';
import { nanoid } from 'nanoid/non-secure';

import Filter from './Filter/Filter';
import ContactForm from './Forms/ContactForms';
import ContactList from './ContactList/ContactList';
import css from 'components/App.module.css';

export default class App extends React.Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const contacts = JSON.parse(localStorage.getItem('contacts'));
    if (contacts?.length) {
      this.setState({ contacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  addInput = e => {};

  addContact = ({ name, number }) => {
    this.setState(prevState => {
      const { contacts } = prevState;
      const inAlert = Boolean(
        contacts.find(e => e.name.toUpperCase() === name.toUpperCase())
      );
      if (inAlert) return alert(`контакт ${name}  існує`);
      const newContact = {
        name,
        id: nanoid(),
        number,
      };
      return { contacts: [newContact, ...contacts] };
    });
  };

  handleFilter = e => {
    this.setState({ filter: e.target.value });
  };

  filterContact = () => {
    const { filter, contacts } = this.state;
    if (!filter) return contacts;

    const normalizFilter = filter.toUpperCase();
    const res = contacts.filter(contact =>
      contact.name.toUpperCase().includes(normalizFilter)
    );
    return res;
  };

  removeContact = id => {
    this.setState(({ contacts }) => {
      const newContacts = contacts.filter(item => item.id !== id);
      return { contacts: newContacts };
    });
  };

  render() {
    const { filter } = this.state;

    return (
      <div className={css.appContainer}>
        <h1 className={css.title}>Phonebook</h1>
        <ContactForm onSubmit={this.addContact} />
        <Filter handleFilter={this.handleFilter} value={filter} />

        <h2 className={css.title}>Contacts</h2>
        <ContactList
          filterContact={this.filterContact()}
          removeContact={this.removeContact}
        />
      </div>
    );
  }
}
