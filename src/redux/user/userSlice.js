import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  user: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState: INITIAL_STATE,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      (state.loading = false), (state.user = action.payload);
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    updateStart: (state) => {
      state.loading = true;
    },
    updateUser: (state, action) => {
      (state.loading = false), (state.user = action.payload);
      state.error = null;
    },
    updateUserError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    deleteStart: (state) => {
      state.loading = true;
    },
    deleteUser: (state, action) => {
      (state.loading = false), (state.user = null);
      state.error = null;
    },
    deleteUserError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    signoutuser: (state) => {
      state.user = null;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  updateStart,
  updateUser,
  updateUserError,
  deleteStart,
  deleteUser,
  deleteUserError,
  signoutuser,
} = userSlice.actions;
export default userSlice.reducer;
