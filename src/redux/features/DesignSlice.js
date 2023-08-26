import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  gradientColor: "",
  showModal: false,
};

const DesignSlice = createSlice({
  name: "design",
  initialState,
  reducers: {
    setGradient: (state, action) => {
      state.gradientColor = `#${action.payload}`;
    },
    setShowModal: (state, action) => {
      state.showModal = action.payload;
    },
  },
});

export const { setGradient, setShowModal } = DesignSlice.actions;

export default DesignSlice.reducer;
