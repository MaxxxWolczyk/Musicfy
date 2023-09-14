import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  gradientColor: "",
  showModal: false,
  userFavSongs: [],
  userPlaylists: [],
  playlistRefresh: true,
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
    setUserFavSongs: (state, action) => {
      state.userFavSongs = action.payload;
    },
    setUserPlaylists: (state, action) => {
      state.userPlaylists = action.payload;
    },
    setPlayerRefresh: (state) => {
      state.playlistRefresh = !state.playlistRefresh;
    },
  },
});

export const {
  setGradient,
  setShowModal,
  setUserFavSongs,
  setUserPlaylists,
  setPlayerRefresh,
} = DesignSlice.actions;

export default DesignSlice.reducer;
