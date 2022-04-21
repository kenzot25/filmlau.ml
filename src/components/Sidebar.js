import React from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { getMoviesData } from "../app/moviesSlice";
import { getTVData } from "../app/tvshowsSlice";
import classes from "./Sidebar.module.css";
const Sidebar = () => {
  const dispatch = useDispatch();
  return (
    <div className={classes.sidebar}>
      {/* logo */}

      <NavLink to={`/`}>
        <img
          className={classes.logo}
          alt=""
          src={process.env.PUBLIC_URL + "/images/Logo.svg"}
        />
      </NavLink>

      {/* Home */}
      <div className={classes.btn}>
        <NavLink to={`/`}>
          <img
            className={classes["btn--img"]}
            alt=""
            src={process.env.PUBLIC_URL + "/images/Home.svg"}
          />
        </NavLink>
      </div>
      {/* Movies */}
      <div className={classes.btn}>
        <NavLink
          to={`/movie`}
          onClick={() => {
            dispatch(getMoviesData(1));
          }}
        >
          <img
            className={classes["btn--img"]}
            alt=""
            src={process.env.PUBLIC_URL + "/images/Movie.svg"}
          />
        </NavLink>
      </div>
      {/* TV Shows */}
      <div className={classes.btn}>
        <NavLink
          to={`/tv`}
          onClick={() => {
            dispatch(getTVData(1));
          }}
        >
          <img
            className={classes["btn--img"]}
            alt=""
            src={process.env.PUBLIC_URL + "/images/TV.svg"}
          />
        </NavLink>
      </div>
      {/* Favorites */}
      <div className={classes.btn}>
        <NavLink to={`/favorites`}>
          <img
            className={classes["btn--img"]}
            alt=""
            src={process.env.PUBLIC_URL + "/images/Favorite.svg"}
          />
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
