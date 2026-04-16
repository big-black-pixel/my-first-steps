import { createSlice } from '@reduxjs/toolkit';

type TUser = {
  id: string;
  email: string;
};

interface IUserState {
  currentUser: null | TUser;
  isAuth: boolean;
}


const initialState: IUserState = {
  currentUser: null ,
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