import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    role: null,
    isAuthenticated: false
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.role = action.payload?.isDoctor ? 'doctor' : action.payload?.isAdmin ? 'admin' : 'user';
      state.isAuthenticated = true;
    },
    clearUser: (state) => {
      state.user = null;
      state.role = null;
      state.isAuthenticated = false;
    }
  }
});
export const { setUser, clearUser } = userSlice.actions;
