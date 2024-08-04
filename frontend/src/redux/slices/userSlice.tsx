import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserState } from "../../utils/interface/types";


const initialState: UserState = {
  isLoggedIn: false,
  userDetails: null,
};

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
        token: string; 
      }>
    ) => {
      state.isLoggedIn = true;
      state.userDetails = action.payload;
      localStorage.setItem("authToken", action.payload.token);
      localStorage.setItem("userDetails", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.userDetails = null;
      localStorage.removeItem("authToken");
      localStorage.removeItem("userDetails");
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
