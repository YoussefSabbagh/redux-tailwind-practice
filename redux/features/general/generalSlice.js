import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  client: {
    toggleForm: false,
    userForm: 'add',
    deleteUser: { id: null, name: null },
    updateUserId: null,
  },
};

const generalSlice = createSlice({
  name: 'general',
  initialState,
  reducers: {
    addAction: (state) => {
      state.client.toggleForm = !state.client.toggleForm;
      state.client.userForm = 'Add';
    },
    deleteAction: (state, action) => {
      state.client.toggleForm = false;
      state.client.deleteUser = action.payload;
    },
    updateAction: (state, action) => {
      state.client.toggleForm = !state.client.toggleForm;
      state.client.userForm = 'Update';
      state.client.updateUserId = action.payload;
    },
  },
});

export const { addAction, updateAction, deleteAction } = generalSlice.actions;
export default generalSlice.reducer;
