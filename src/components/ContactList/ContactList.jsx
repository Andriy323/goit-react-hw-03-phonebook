import PropTypes from 'prop-types';
import css from '../ContactList/ContactList.module.css';
const ContactList = ({ filterContact, removeContact }) => {
  const isName = Boolean(filterContact.length);
  if (isName) {
    return (
      <ul className={css.list}>
        {filterContact.map(({ name, id, number }) => (
          <li key={id} className={css.item}>
            {name}:{number}{' '}
            <button
              className={css.btnDelete}
              onClick={() => removeContact(id)}
              type="button"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    );
  } else {
    return <p>There is no contact list</p>;
  }
};

export default ContactList;

ContactList.prototypes = {
  removeContact: PropTypes.func,
  filterContact: PropTypes.arrayOf(PropTypes.object),
};

ContactList.defaultProps = {
  filterContact: [],
};