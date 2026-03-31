import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: null,
  isAuth: false,  
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {

    setUser(state, action) {
      state.currentUser = action.payload;
      state.isAuth = true;
    },

    removeUser(state) {
      state.currentUser = null;
      state.isAuth = false;
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;