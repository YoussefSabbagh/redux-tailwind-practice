import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  users: [],
  error: '',
};

export const fetchUsers = createAsyncThunk('user/fetchUsers', async () => {
  const response = await fetch('http://localhost:3000/api/users');
  const users = await response.json();
  return users;
});

export const fetchUserById = createAsyncThunk(
  'user/fetchUserById',
  async (userId) => {
    const response = await fetch(`http://localhost:3000/api/users/${userId}`);
    const users = await response.json();
    return users;
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    add: (state) => {
      state.numOfIcecream--;
    },
    update: (state, action) => {
      state.numOfIcecream += action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      (state.loading = false),
        (state.users = action.payload),
        (state.error = '');
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      (state.loading = false),
        (state.users = []),
        (state.error = action.error.message);
    });

    builder.addCase(fetchUserById.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(fetchUserById.fulfilled, (state, action) => {
      (state.loading = false),
        (state.users = action.payload),
        (state.error = '');
    });

    builder.addCase(fetchUserById.rejected, (state, action) => {
      (state.loading = false),
        (state.users = []),
        (state.error = action.error.message);
    });
  },
});

export default userSlice.reducer;
