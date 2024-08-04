import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    name: "John",
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    display: (state) => {
      console.log(state.user);
    },
    changeName: (state, action) => {
      state.user.name = action.payload;
    },
  },
});

export const { display, changeName } = userSlice.actions;
export default userSlice.reducer;
