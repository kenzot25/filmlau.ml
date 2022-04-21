import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  page: 1,
  list: {},
  loading: true,
  pageDetail: {},
  similar: null,
  trailer: null,
  totalPage: 500,
};
export const moviesSlice = createSlice({
  name: "filmsrc",
  initialState: initialState,
  reducers: {
    setList: (state, action) => {
      state.totalPage = 500;
      state.loading = true;
      console.log(action.payload);
      state.page = action.payload.page;
      state.list[action.payload.page] = [...action.payload.data];
      state.loading = false;
    },
    setLoading: (state) => {
      state.loading = true;
    },
    setPageDetail: (state, action) => {
      state.pageDetail[action.payload.id] = action.payload;
      console.log(action.payload);
    },
    setPageSimilar: (state, action) => {
      console.log(action.payload);
      state.similar = action.payload;
      // console.log(action.payload);
    },
    setTrailer: (state, action) => {
      console.log(action.payload);
      const result = action.payload.filter((e) => e.type.includes("Trailer"));
      state.trailer = result[0].key;
    },
    removeTrailer: (state) => {
      state.trailer = null;
    },
    setSearchData: (state) => {
      state.totalPage = 1;
    },
    reset: (state) => (state = initialState),
  },
});

// Action creators are generated for each case reducer function
export const {
  setList,
  setLoading,
  setPageDetail,
  setPageSimilar,
  setTrailer,
  removeTrailer,
  setSearchData,
  reset,
} = moviesSlice.actions;

export default moviesSlice.reducer;

export const getMoviesData = (page) => async (dispatch) => {
  axios
    .get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_KEY_API_THEMOVIEDB}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_watch_monetization_types=flatrate`
    )
    .then((res) => {
      console.log(res);
      dispatch(setList({ page: res.data.page, data: res.data.results }));
    });
};
export const getDetailMovie = (id) => async (dispatch) => {
  axios
    .get(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_KEY_API_THEMOVIEDB}&language=en-US`
    )
    .then((res) => {
      // console.log(res);
      dispatch(setPageDetail(res.data));
    });
};
export const getSimilarMovie = (id) => async (dispatch) => {
  axios
    .get(
      `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${process.env.REACT_APP_KEY_API_THEMOVIEDB}&language=en-US&page=1`
    )
    .then((res) => {
      console.log(res);
      dispatch(setPageSimilar(res.data.results));
    });
};
export const getTrailerMovie = (id) => async (dispatch) => {
  axios
    .get(
      `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${process.env.REACT_APP_KEY_API_THEMOVIEDB}&language=en-US`
    )
    .then((res) => {
      console.log(res);
      dispatch(setTrailer(res.data.results));
    });
};
export const searchMovies = (query) => async (dispatch) => {
  axios
    .get(
      `
      https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_KEY_API_THEMOVIEDB}&language=en-US&query=${query}&page=1&include_adult=false`
    )
    .then((res) => {
      console.log(res);
      dispatch(setList({ page: res.data.page, data: res.data.results }));
      dispatch(setSearchData());
    });
};
