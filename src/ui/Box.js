import React from "react";
import { Link } from "react-router-dom";
import { findCategoryOfMovieByGenreID } from "../untils/helper";
import classes from "./Box.module.css";
const Box = ({
  type = "small",
  image,
  title,
  rating,
  id,
  category,
  genre_ids,
  className
}) => {
  const filmtag = findCategoryOfMovieByGenreID(category, genre_ids);
  return (
    <div
      className={`${classes.container} ${className && className} ${
        type === "big" ? classes["container-big"] : ""
      }`}
    >
      <div
        className={classes.image}
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.1)),url(${image})`,
        }}
      ></div>
      <div className={classes.box}>
        <Link to={`/${category}/detail/${id}`} className={classes.info}>
          <small className={classes.tag}>{filmtag[0]}</small>
          <div className="rating">
            {/* {Array(rating)
              .fill()
              .map((_, i) => ( */}
            <img
              alt="star"
              className="rating--star"
              src={process.env.PUBLIC_URL + "/images/StarFill.svg"}
            />
            <span className="rating--num">{" "}{rating}/10</span>
            {/* ))} */}
          </div>
          <p className={classes.title}>{title}</p>
        </Link>

        <Link to={`/${category}/detail/${id}`} className={classes.btn}>
          More Info {" >"}
        </Link>
      </div>
    </div>
  );
};

export default Box;
