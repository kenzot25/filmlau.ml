import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  page: 1,
  list: {},
  loading: true,
  pageDetail: {},
  similar: null,
  trailer: null,
};
export const tvshowsSlice = createSlice({
  name: "tvshowsslice",
  initialState: initialState,
  reducers: {
    setList: (state, action) => {
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
      const result = action.payload[0];
      state.trailer = result.key;
    },
    removeTrailerTV: (state) => {
      state.trailer = null;
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
  removeTrailerTV,
  reset,
} = tvshowsSlice.actions;

export default tvshowsSlice.reducer;

export const getTVData = (page) => async (dispatch) => {
  axios
    .get(
      `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_KEY_API_THEMOVIEDB}&language=en-US&sort_by=popularity.desc&page=${page}&timezone=America%2FNew_York&include_null_first_air_dates=false&with_watch_monetization_types=flatrate&with_status=0&with_type=0`
    )
    .then((res) => {
      console.log(res);
      dispatch(setList({ page: res.data.page, data: res.data.results }));
    });
};
export const getDetailTVShow = (id) => async (dispatch) => {
  axios
    .get(
      `https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.REACT_APP_KEY_API_THEMOVIEDB}&language=en-US`
    )
    .then((res) => {
      // console.log(res);
      dispatch(setPageDetail(res.data));
    });
};
export const getSimilarTVShow = (id) => async (dispatch) => {
  axios
    .get(
      `https://api.themoviedb.org/3/tv/${id}/similar?api_key=${process.env.REACT_APP_KEY_API_THEMOVIEDB}&language=en-US&page=1`
    )
    .then((res) => {
      console.log(res);
      dispatch(setPageSimilar(res.data.results));
    });
};
export const getTrailerTVShow = (id) => async (dispatch) => {
  axios
    .get(
      `https://api.themoviedb.org/3/tv/${id}/season/1/videos?api_key=${process.env.REACT_APP_KEY_API_THEMOVIEDB}&language=en-US`
    )
    .then((res) => {
      console.log("TV trailer",res);
      dispatch(setTrailer(res.data.results));
    });
};
