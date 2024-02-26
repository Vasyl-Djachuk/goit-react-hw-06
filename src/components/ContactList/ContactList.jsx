import css from './ContactList.module.css';
import { Contact } from './Contact/Contact';
import { useSelector } from 'react-redux';
import { getContacts, getFilter } from '../../redux/selectors';
import { useDispatch } from 'react-redux';
import { deleteContact } from '../../redux/contactsSlice';

export const ContactList = () => {
  const filters = useSelector(getFilter);
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);

  let filtredContacts = [];
  if (contacts.length > 0)
    filtredContacts = contacts.filter(
      contact =>
        contact.name
          .toLowerCase()
          .split(` `)
          .filter(n => n.startsWith(filters.filter.toLowerCase())).length > 0
    );

  const handleDeleteClick = e => {
    dispatch(deleteContact(e.target.dataset.id));
  };

  return (
    <ul className={css.list}>
      {filtredContacts.length > 0 &&
        filtredContacts.map(({ id, name: names, number }) => {
          return (
            <li className={css.item} key={id}>
              <Contact
                id={id}
                names={names}
                number={number}
                handleDeleteClick={handleDeleteClick}
              />
            </li>
          );
        })}
    </ul>
  );
};
