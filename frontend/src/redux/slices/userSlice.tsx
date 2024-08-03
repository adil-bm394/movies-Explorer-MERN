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

// Function to get initial state from localStorage
const getInitialState = (): UserState => {
  const token = localStorage.getItem("authToken");
  if (token) {
    const userDetails = JSON.parse(localStorage.getItem("userDetails") || "{}");
    return {
      isLoggedIn: true,
      userDetails: {
        ...userDetails,
        token,
      },
    };
  }
  return initialState;
};

const userSlice = createSlice({
  name: "user",
  initialState: getInitialState(),
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
      // Save token and user details to localStorage
      localStorage.setItem("authToken", action.payload.token);
      localStorage.setItem("userDetails", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.userDetails = null;
      // Remove token and user details from localStorage
      localStorage.removeItem("authToken");
      localStorage.removeItem("userDetails");
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
