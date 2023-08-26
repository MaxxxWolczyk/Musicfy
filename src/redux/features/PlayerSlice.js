import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentSongs: [],
  currentKey: "",
  currentIndex: "",
  isPlaying: false,
  activeSong: {},
  shuffle: false,
};

const PlayerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    playPause: (state, action) => {
      state.isPlaying = action.payload;
    },
    setCurrentSongs: (state, action) => {
      state.currentSongs = action.payload;
    },
    setCurrentKey: (state, action) => {
      state.currentKey = action.payload;
    },
    setActiveSong: (state, action) => {
      state.currentIndex = state.currentSongs.findIndex(
        (item) => item.key === state.currentKey
      );
      state.activeSong = state.currentSongs[state.currentIndex];
    },
    setNextSong: (state) => {
      if (state.shuffle) {
        state.currentIndex = Math.floor(
          Math.random() * state.currentSongs.length
        );
        state.activeSong = state.currentSongs[state.currentIndex];
        return;
      }
      state.activeSong =
        state.currentSongs[
          state.currentIndex === state.currentSongs.length - 1
            ? 0
            : state.currentIndex + 1
        ];
      state.currentIndex === state.currentSongs.length - 1
        ? (state.currentIndex = 0)
        : (state.currentIndex += 1);
    },
    setPrevSong: (state) => {
      state.activeSong =
        state.currentSongs[
          state.currentIndex === 0
            ? state.currentSongs.length - 1
            : state.currentIndex - 1
        ];
      state.currentIndex === 0
        ? (state.currentIndex = state.currentSongs.length - 1)
        : (state.currentIndex -= 1);
    },
    setShuffle: (state) => {
      state.shuffle = !state.shuffle;
    },
  },
});

export const {
  playPause,
  setCurrentSongs,
  setCurrentKey,
  setActiveSong,
  setNextSong,
  setPrevSong,
  setShuffle,
} = PlayerSlice.actions;

export default PlayerSlice.reducer;
