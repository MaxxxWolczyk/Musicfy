import { configureStore } from "@reduxjs/toolkit";
import { shazamCoreApi } from "./services/ShazamCore";
import PlayerReducer from "./features/PlayerSlice";
import DesignReducer from "./features/DesignSlice";

export const store = configureStore({
  reducer: {
    [shazamCoreApi.reducerPath]: shazamCoreApi.reducer,
    player: PlayerReducer,
    design: DesignReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(shazamCoreApi.middleware),
});
