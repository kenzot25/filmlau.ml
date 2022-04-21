import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import classes from "./Detail.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const path_poster = "https://image.tmdb.org/t/p/w600_and_h900_bestv2/";

const Content = ({ id, category }) => {
  const detail = useSelector((state) => {
    if (category === "movie") {
      return state.movies.pageDetail[id];
    } else {
      return state.tvs.pageDetail[id];
    }
  });
  function copy() {
    toast("🦄 Copied!", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    const el = document.createElement("input");
    el.value = window.location.href;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
  }
  return (
    <div className={classes.content}>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className={classes.poster}>
        <img alt="" src={path_poster + detail?.poster_path} />
        <div className={classes["content-status"]}>
          <p>{detail?.status}</p>
          <p>{detail?.release_date}</p>
        </div>
      </div>
      <div className={classes["content-info"]}>
        <h1>{detail?.title ? detail?.title : detail?.name}</h1>
        <div className={classes["content-info--box"]}>
          <div className={classes.genres}>
            {detail?.genres.map((e) => (
              <div key={e.id} className={classes["genres-box"]}>
                {e.name}
              </div>
            ))}
          </div>
          <div className={classes.actions}>
            <Link
              to={`/${category}/watch/${detail?.id}`}
              className={classes.watch}
            >
              <img
                alt=""
                className={classes.playbtn}
                src={process.env.PUBLIC_URL + "/images/PlayBTNWhite.svg"}
              />
              <span>WATCH</span>
            </Link>
            {/* <img className={classes.btn} alt="star" src={process.env.PUBLIC_URL + "/images/star-circle.svg"}/> */}
            <img
              onClick={copy}
              className={classes.btn}
              alt="share"
              src={process.env.PUBLIC_URL + "/images/share.svg"}
            />
          </div>
          {category !== "movie" && (
            <div className={classes.season}>
              <h5>SEASON</h5>
              <div className={classes.season_box}>
                {detail?.seasons?.map((e) => (
                  <Link
                    className={classes.season_number}
                    key={e.id}
                    to={`/tv/season/${e.id}`}
                  >
                    {e.season_number}
                  </Link>
                ))}
              </div>
            </div>
          )}
          <div className={classes.story}>
            <h5>STORYLINE</h5>
            <p>{detail?.overview}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Content;
