import { createSlice, nanoid } from '@reduxjs/toolkit';

let savedContacts = JSON.parse(window.localStorage.getItem('contacts'));
savedContacts = savedContacts === null ? [] : savedContacts;

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: savedContacts,
  reducers: {
    addContacts: {
      reducer(state, action) {
        state.push(action.payload);
      },
      prepare(contact) {
        return {
          payload: {
            id: nanoid(),
            name: contact.name,
            number: contact.number,
          },
        };
      },
    },
    deleteContact(state, action) {
      const index = state.findIndex(contact => contact.id === action.payload);
      state.splice(index, 1);
    },
  },
});

export const { addContacts, deleteContact } = contactsSlice.actions;
export const contactsReducer = contactsSlice.reducer;
