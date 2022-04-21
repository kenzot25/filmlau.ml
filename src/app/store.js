import { configureStore } from "@reduxjs/toolkit";
import filmReducer from "./filmSlice";
import moviesReducer from "./moviesSlice";
import tvReducer from "./tvshowsSlice";
export default configureStore({
  reducer: {
    film: filmReducer,
    movies: moviesReducer,
    tvs: tvReducer,
  },
});
