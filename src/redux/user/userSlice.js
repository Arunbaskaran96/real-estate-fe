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
    },
    loginFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure } = userSlice.actions;
export default userSlice.reducer;
