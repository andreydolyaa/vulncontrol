import { createSlice } from "@reduxjs/toolkit";

export const modalSlice = createSlice({
  name: "modal",
  initialState: {
    data: {
      title: "",
      text: "",
    },
    show: false,
    confirm: null,
  },
  reducers: {
    openModal: (state, action) => {
      state.show = true;
      state.data.title = action.payload.title;
      state.data.text = action.payload.text;
      state.confirm = action.payload.confirm || null;
    },
    close: (state, action) => {
      state.show = false;
      state.data.title = "";
      state.data.text = "";
      state.confirm = null;
    },
  },
});

export const { openModal, close } = modalSlice.actions;
export default modalSlice.reducer;
