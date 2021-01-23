import React from 'react';
import PropTypes from 'prop-types';
import s from '../ContactForm/ContactForm.module.css';


export default function СontactForm({ contactList, onDeleted }) {
  return (
    <ul className='table'>
      {contactList.map(({ id, name, number }) => {
        return (
          <li key={id}>
            {name}: {number}
            <button
              className={s.btnList}
              type="button"
              onClick={() => onDeleted(id)}
            >
             Удалить
            </button>
          </li>
        );
      })}
    </ul>
  );
}

СontactForm.propTypes = {
  contactList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }),
  ),
  onDeleted: PropTypes.func.isRequired,
};