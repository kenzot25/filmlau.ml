import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getConfigSubtitle } from "../untils/fetchData";

const magnet_path = "magnet:?xt=urn:btih:";
const initialState = {
  torrent: {
    //   Hash
    version: {
      720: null,
      1080: null,
    },
    subtitle: {
      // ID
      version: {
        720: {
          link: null,
          id: null,
        },
        1080: {
          link: null,
          id: null,
        },
      },
    },
    poster: null,
    title: null,
  },
  iframe: {
    link: null,
  },
  type: "searchIMDB",
  imdbid: null,
  params: {},
  loading: true,
};
export const filmSlice = createSlice({
  name: "filmsrc",
  initialState: initialState,
  reducers: {
    searchTorrent: (state, action) => {
      console.log("Searching torrent with payload: ", action.payload);
      if (
        state.type === "searchTorrent" &&
        action.payload &&
        action.payload.id !== 0
      ) {
        state.torrent = {
          ...state.torrent,
          version: {
            720: action.payload?.torrents?.find((e) => e.quality === "720p")
              .hash,
            1080: action.payload?.torrents?.find((e) => e.quality === "1080p")
              .hash,
          },
          poster: action.payload.background_image,
          title: action.payload.title,
        };
        state.type = "gotTorrent";
      } else {
        state.type = "iframe";
      }
    },
    renderTorrentToVid: (state, action) => {
      if (state.type === "gotTorrentandSub" || state.type === "gotTorrent") {
        console.log("rendering torrent to vid....");
        console.log(state.torrent.version[1080], state.torrent.version[720]);
        const fixedParams = {
          poster: state.torrent.poster,
          title: "Filmlau.ml | " + state.torrent.title,
        };

        if (state.torrent.version[1080]) {
          fixedParams.magnet =
            magnet_path +
            state.torrent.version[1080] +
            "&dn=filmlau.ml&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80&tr=udp%3A%2F%2Fopentor.org%3A2710&tr=udp%3A%2F%2Ftracker.ccc.de%3A80&tr=udp%3A%2F%2Ftracker.blackunicorn.xyz%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969";
          fixedParams.subtitlesSRC = state.torrent.subtitle.version[1080].link;
          state.params = fixedParams;
          state.type = "finish";
          state.loading = false;
        } else if (state.torrent.version[720]) {
          fixedParams.magnet =
            magnet_path +
            state.torrent.version[720] +
            "&dn=filmlau.ml&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80&tr=udp%3A%2F%2Fopentor.org%3A2710&tr=udp%3A%2F%2Ftracker.ccc.de%3A80&tr=udp%3A%2F%2Ftracker.blackunicorn.xyz%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969";
          fixedParams.subtitlesSRC = state.torrent.subtitle.version[720].link;
          state.params = fixedParams;
          state.type = "finish";
          state.loading = false;
        } else {
          state.type = "iframe";
        }
      }
    },
    renderIframe: (state, action) => {
      if (state.type === "iframe" && state.type !== "finish") {
        console.log("rendering iframe....");
        state.type = "iframe";
        state.loading = false;
      }
    },
    searchIBDMID: (state, action) => {
      console.log("Searching imdb id...");
      if (action.payload.facebook_id !== null) {
        console.log("Got imdb id and tuning to searchTorrent");
        state.imdbid = action.payload.imdb_id;
      } else {
        state.imdbid = null;
        console.log("turnning to iframe");
        state.type = "iframe";
      }
      state.type = "searchTorrent";
    },
    setFileSubID: (state, action) => {
      console.log("Got torrent and find file sub id in setFileSubID");
      if (state.type === "gotTorrent")
        state.torrent.subtitle.version[720].id = action.payload[720];
      state.torrent.subtitle.version[1080].id = action.payload[1080];
    },
    setFileSub: (state, action) => {
      console.log("Got torrent and find file sub id in setFileSub");
      console.log("SLice", action.payload);

      state.torrent.subtitle.version = { ...action.payload };
      state.type = "gotTorrentandSub";
    },
    setType: (state, action) => {
      state.type = action.payload;
    },
    reset: (state) => (state = initialState),
  },
});

// Action creators are generated for each case reducer function
export const {
  searchTorrent,
  renderTorrentToVid,
  renderIframe,
  searchIBDMID,
  setFileSubID,
  setFileSub,
  showVidTorrent,
  setType,
  reset,
} = filmSlice.actions;

export default filmSlice.reducer;

export const getIMDBID = (category, id) => async (dispatch) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/${category}/${id}/external_ids?api_key=${process.env.REACT_APP_KEY_API_THEMOVIEDB}&external_source=imdb_id`
    );
    console.log(response);
    dispatch(searchIBDMID(response.data));
  } catch (err) {
    console.log("HIIIIIIIIIIIIIIIII");
    dispatch(setType("iframe"));
    throw new Error(err);
  }
};
export const getInfoMovie = (imdbid) => async (dispatch) => {
  fetch(`https://yts-proxy.now.sh/movie_details.json?imdb_id=${imdbid}`)
    .then((res) => {
      console.log(res);
      if (res.url.includes("=null")) return null;
      return res.json();
    })
    .then((data) => {
      console.log(data);
      if (data && data.data.movie.torrents) {
        dispatch(searchTorrent(data.data.movie));
        return data.data.movie;
      } else {
        console.log("Failed get info movie");
        dispatch(searchTorrent(data));
      }
    });
};

export const findFileSubID = (id) => async (dispatch) => {
  const srtobj = await getConfigSubtitle(id);
  console.log("SRT OBJ", srtobj);
  dispatch(setFileSub(srtobj));
};
