
'use client';

import { createSlice } from '@reduxjs/toolkit';


let storedUser = null;
let storedUsers = [];

if (typeof window !== 'undefined') {
  try {
    storedUser = JSON.parse(localStorage.getItem('user'));
    storedUsers = JSON.parse(localStorage.getItem('users')) || [];
  } catch (error) {
    console.error('Failed to parse localStorage:', error);
  }
}
const initialState = {
  users: storedUsers,
  user: storedUser,
  isAuthenticated: !!storedUser,
  loginFailed: false,
  errorMessage: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    register: (state, action) => {
      state.users.push(action.payload);
      localStorage.setItem('users', JSON.stringify(state.users));
    },
    login: (state, action) => {
      const { email, password } = action.payload;
      const foundUser = state.users.find((u) => u.email === email);

      if (!foundUser) {
        state.loginFailed = true;
        state.errorMessage = 'User not found. Please sign up.';
        state.isAuthenticated = false;
      } else if (foundUser.password !== password) {
        state.loginFailed = true;
        state.errorMessage = 'Invalid password.';
        state.isAuthenticated = false;
      } else {
        state.user = foundUser;
        state.isAuthenticated = true;
        state.loginFailed = false;
        state.errorMessage = '';
        localStorage.setItem('user', JSON.stringify(foundUser));
      }
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem('user');
    },
    resetLoginFailed: (state) => {
      state.loginFailed = false;
      state.errorMessage = '';
    },
  },
});

export const { register, login, logout, resetLoginFailed } = authSlice.actions;
export default authSlice.reducer;
