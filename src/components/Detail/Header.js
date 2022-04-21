import React, { useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useDispatch, useSelector } from "react-redux";
import { abbreviateNumber } from "../../untils/helper";
import classes from "./Detail.module.css";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import { getTrailerMovie, removeTrailer } from "../../app/moviesSlice";
import { getTrailerTVShow, removeTrailerTV } from "../../app/tvshowsSlice";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: "0",
    border: "0",
    background: "none",
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.3)",
  },
};

Modal.setAppElement("#root");

const path_backdrop =
  "https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces";

const Header = ({ id, category }) => {
  const detail = useSelector((state) => {
    if (category === "movie") {
      return state.movies.pageDetail[id];
    } else {
      return state.tvs.pageDetail[id];
    }
  });
  const trailer = useSelector((state) => {
    if (category === "movie") {
      return state.movies.trailer;
    } else {
      return state.tvs.trailer;
    }
  });

  console.log(detail);
  const [modalIsOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  function openModal() {
    if (category === "movie") dispatch(getTrailerMovie(id));
    else dispatch(getTrailerTVShow(id));
    setIsOpen(true);
  }

  function afterOpenModal() {
    document.getElementById("trailer").style.display = "block";
  }

  function closeModal() {
    category === "movie"
      ? dispatch(removeTrailer())
      : dispatch(removeTrailerTV());
    setIsOpen(false);
  }
  return (
    <>
      <div className={classes.header}>
        {/* // backdrop */}
        {detail?.backdrop_path && (
          <div
            className={classes.image}
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.1)), url(${
                path_backdrop + detail.backdrop_path
              })`,
            }}
          ></div>
        )}
        {/* // main */}
        <div className={classes["header-content"]}>
          <div className={classes["header-content--box"]}>
            <Link to={`/${category}`} className={classes["header-title"]}>
              <img
                alt=""
                className={classes.icon}
                src={process.env.PUBLIC_URL + "/images/chevron-left-round.svg"}
              />
              <span>{detail?.title ? detail?.title : detail?.name}</span>
            </Link>
            <Link to={`/${category}`} className={classes.category}>
              {category}
            </Link>
          </div>
          <div className={classes["header-content--box"]}>
            {/* rating,votes,.. */}
            <div className={classes["header-votes"]}>
              {detail?.vote_count >=0 && detail?.vote_average >=0 && (
                <>
                  <CircularProgressbar
                    value={detail.vote_average}
                    maxValue={10}
                    text={`${detail.vote_average}`}
                  />
                  <p>{abbreviateNumber(detail.vote_count) + " VOTES"}</p>
                </>
              )}
            </div>
            <div className={classes.trailer} onClick={openModal}>
              <img
                alt=""
                className={classes.playbtn}
                src={process.env.PUBLIC_URL + "/images/PlayBTN.svg"}
              />
              <span>TRAILER</span>
            </div>
            <img
              alt=""
              className={classes.star}
              src={process.env.PUBLIC_URL + "/images/Favorite.svg"}
            />
          </div>
        </div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <iframe
          title="Trailer"
          id="trailer"
          width="800"
          height="400"
          frameBorder="0"
          allow="fullscreen"
          src={`https://www.youtube.com/embed/${trailer}`}
        ></iframe>
      </Modal>
    </>
  );
};

export default Header;
