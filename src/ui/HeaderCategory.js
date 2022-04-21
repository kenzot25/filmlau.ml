import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { searchMovies } from "../app/moviesSlice";
import classes from "./HeaderCategory.module.css";
const HeaderCategory = ({ category }) => {
  const searchRef = useRef("");
  const dispatch = useDispatch();
  function searchHandler(e) {
    e.preventDefault();
    if (searchRef.current.value.trim().length !== 0) {
      dispatch(searchMovies(searchRef.current.value));
    }
  }
  return (
    <div className={classes.main}>
      <p className={classes.category}>{category}</p>
      <div className={classes.wrap}>
        <form onSubmit={searchHandler} className={classes.search}>
          <input
            ref={searchRef}
            type="text"
            className={classes.searchTerm}
            placeholder={`Search your ${
              category === "Movies" ? "movie" : "tv show"
            }...`}
          />
          <button type="submit" className={classes.searchButton}>
            <i className="fa fa-search"></i>
          </button>
        </form>
      </div>
    </div>
  );
};

export default HeaderCategory;
