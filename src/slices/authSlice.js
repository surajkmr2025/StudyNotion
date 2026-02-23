import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  signupData: null,
  loading: false,
  // ✅ Hydrate token from localStorage on app boot so a page refresh
  // doesn't log the user out.  Falls back to null if nothing is stored.
  token: localStorage.getItem("token") || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setSignupData(state, action) {
      state.signupData = action.payload;
    },
  },
});

export const { setToken, setLoading, setSignupData } = authSlice.actions;
export default authSlice.reducer;
