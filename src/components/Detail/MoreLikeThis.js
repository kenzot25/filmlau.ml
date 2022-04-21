import { Link } from "react-router-dom";
import React from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import { useSelector } from "react-redux";
import classes from "./Detail.module.css";

const path_poster = "https://image.tmdb.org/t/p/w600_and_h900_bestv2/";

const MoreLikeThis = ({ id, category }) => {
  const similarMovies = useSelector((state) => {
    if (category === "movie") return state.movies.similar;
    else return state.tvs.similar;
  });
  console.log(similarMovies);
  return (
    <div className={classes.morelikethis}>
      <p>More like this</p>
      <div className={classes["morelikethis-box"]}>
        {similarMovies &&
          similarMovies?.map((e) => (
            <Link
              to={`/movie/detail/${e.id}`}
              className={`${classes.poster} ${classes["morelikethis--img"]}`}
            >
              <img alt="" src={path_poster + e?.poster_path} />
              <div className={classes["morelikethis--img--box"]}>
                <p>{e.title ? e.title : e.name}</p>
                <div className={classes["morelikethis--img--votes"]}>
                  <CircularProgressbar
                    value={e.vote_average}
                    maxValue={10}
                    text={`${e.vote_average}`}
                  />
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default MoreLikeThis;
