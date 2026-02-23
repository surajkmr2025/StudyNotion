import { createSlice } from "@reduxjs/toolkit";

// ✅ FIX: Wrapped the localStorage read in a try/catch.
// If localStorage contains corrupted or manually-edited JSON, JSON.parse
// will throw a SyntaxError and crash the entire app on startup.
// The catch returns null so the app degrades gracefully.
const parseUser = () => {
  try {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
};

const initialState = { 
  user: parseUser(),
  loading: false,
};

const profileSlice = createSlice({
  name: "profile",
  initialState: initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    setLoading(state, value) {
      state.loading = value.payload;
    },
  },
});

export const { setUser, setLoading } = profileSlice.actions;
export default profileSlice.reducer;
