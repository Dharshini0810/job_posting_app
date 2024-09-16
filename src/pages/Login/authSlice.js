import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userLoggedIn: false,
  companyLoggedIn: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginUser(state) {
      state.userLoggedIn = true;
      state.companyLoggedIn = false;
    },
    loginCompany(state) {
      state.userLoggedIn = false;
      state.companyLoggedIn = true;
    },
    logout(state) {
      state.userLoggedIn = false;
      state.companyLoggedIn = false;
    },
  },
});

export const { loginUser, loginCompany, logout } = authSlice.actions;
export default authSlice.reducer;
