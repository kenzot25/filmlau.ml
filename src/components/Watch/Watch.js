import { css } from "@emotion/react";
import React, { useEffect } from "react";
// import { showVidTorrent } from "../../untils/torrentToVid";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { ClockLoader } from "react-spinners";
import {
  findFileSubID,
  getIMDBID,
  getInfoMovie,
  renderIframe,
  renderTorrentToVid,
  reset,
  setType,
} from "../../app/filmSlice";
import { getVidByTorrent } from "../../untils/torrentToVid";
import classes from "./Watch.module.css";
const override = css`
  display: block;
  margin: 0 auto;
  border-color: #fff;
`;

const Watch = ({ idbmID = null }) => {
  const film = useSelector((state) => state.film);

  const dispatch = useDispatch();

  const query = useParams();
  const location = useLocation();
  // const [loading, setLoading] = useState(true);
  const category = location.pathname.includes("movie") ? "movie" : "tv";

  // async function findFileSubID() {
  //   const srtobj = await getConfigSubtitle(query.id);
  //   dispatch(setFileSub(srtobj));
  // }

  useEffect(() => {
    dispatch(reset());
  }, [dispatch]);
  useEffect(() => {
    const player = document.getElementById("player");
    // const iframe = document.getElementById("iframe");
    // if(iframe && iframe.sanbox) {
    //   iframe.sanbox = "allow-forms allow-pointer-lock allow-same-origin allow-scripts allow-top-navigation"
    // }
    if (film.type === "finish") {
      console.log(player);
      getVidByTorrent({ ...film.params });
    }

    if (film.type === "searchIMDB") {
      player.innerHTML = "";
      dispatch(reset());
      dispatch(getIMDBID(category, query.id));
    }
    film.type === "searchTorrent" && dispatch(getInfoMovie(film.imdbid));
    film.type === "gotTorrent" && dispatch(findFileSubID(query.id));
    film.type === "gotTorrentandSub" && dispatch(renderTorrentToVid());
    if (film.type === "iframe") {
      dispatch(renderIframe());
      // setLoading(false);
      console.log("iframe...");
    }
  }, [film.type, film.params, film.imdbid, category, query.id, dispatch]);

  function changeServer(num) {
    if (num === 1) {
      dispatch(setType("searchIMDB"));
    }
    num === 2 && dispatch(setType("iframe"));
  }
  return (
    <div className={classes.box}>
      {/* <button onClick={() => dispatch(renderIframe())}>Iframe</button> */}
      {film.loading && (
        <ClockLoader
          speedMultiplier={4}
          color={"#fff"}
          loading={film.loading}
          css={override}
          size={100}
        />
      )}
      {film.type !== "iframe" && (
        <div
          id="player"
          className={classes.player}
          style={{
            display: film.loading ? "none" : "block",
          }}
        />
      )}
      {!film.loading && film.type === "iframe" && (
        <iframe
          title="Watching"
          id="iframe"
          // src={`https://www.2embed.ru/embed/tmdb/movie?id=${query.id}`}
          src={`${
            film.idbmid
              ? "https://vidsrc.me/embed/"
              : `https://www.2embed.ru/embed/tmdb/${category}?id=`
          }${film.idbmid ? film.idbmid : query.id}`}
          width="80%"
          height="80%"
          allowFullScreen={true}
          // margin="1rem"
          // webkitallowfullscreen={true}
          // mozallowfullscreen="true"
          frameBorder="0"
        ></iframe>
      )}
      {!film.loading && (
        <div className={classes["list--server"]}>
          <span onClick={() => changeServer(1)}>VIP #1</span>
          <span onClick={() => changeServer(2)}>VIP #2</span>
          {/* <span onClick={() => changeServer(3)}>VIP #3</span> */}
        </div>
      )}
    </div>
  );
};

export default Watch;
/*
1/get data about film through params
2.get idbm id( if not have yet) to search torrent(3)
3.search torrent by imdb id (if not, return iframe(2embeb.ru / vidsrc))
4. get the subtitle(if have torrent) and return a vid on screen
*/
