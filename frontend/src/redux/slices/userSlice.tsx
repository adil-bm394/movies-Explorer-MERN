import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  isLoggedIn: boolean;
  userDetails: {
    id?: string;
    name: string;
    email: string;
    phone: string;
    token: string; // Add token to user details
  } | null;
}

const initialState: UserState = {
  isLoggedIn: false,
  userDetails: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{
        id?: string;
        name: string;
        email: string;
        phone: string;
        token: string; // Add token to action payload
      }>
    ) => {
      state.isLoggedIn = true;
      state.userDetails = action.payload;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.userDetails = null;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
