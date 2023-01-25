import React from 'react';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';
import css from '../Forms/ContactForm.module.css';
export default class ContactForm extends React.Component {
  state = {
    name: '',
    number: '',
  };

  idName = nanoid();
  idNumber = nanoid();

  hendleSubmit = e => {
    e.preventDefault();
    const { onSubmit } = this.props;
    onSubmit({ ...this.state });
    this.setState({
      name: '',
      number: '',
    });
  };

  handleChange = e => {
    const { value, name } = e.target;

    this.setState({
      [name]: value,
    });
  };

  render() {
    const { hendleSubmit, handleChange } = this;
    const { name, number } = this.state;
    return (
      <div className={css.formContainer}>
        <form onSubmit={hendleSubmit} className={css.form}>
          <label htmlFor={this.idName}>Name</label>
          <input
            id={this.idName}
            type="text"
            value={name}
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            onChange={handleChange}
          />
          <label htmlFor={this.idNumber}>Number</label>
          <input
            id={this.idNumber}
            type="number"
            name="number"
            onChange={handleChange}
            value={number}
          />
          <button className={css.btnAdd} type="submit">
            Add contact
          </button>
        </form>
      </div>
    );
  }
}

ContactForm.prototypes = {
  hendleSubmit: PropTypes.func,
};
