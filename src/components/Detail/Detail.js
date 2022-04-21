import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { getDetailMovie, getSimilarMovie } from "../../app/moviesSlice";
import { getDetailTVShow, getSimilarTVShow } from "../../app/tvshowsSlice";
import Content from "./Content";
import classes from "./Detail.module.css";
import Header from "./Header";
import MoreLikeThis from "./MoreLikeThis";
const Detail = () => {
  const location = useLocation();
  const params = useParams();
  const dispatch = useDispatch();
  const category = location.pathname.includes("movie") ? "movie" : "tv";
  // const loading = useSelector((state) => {
  //   if (category === "movie") {
  //     return state.movies.loading;
  //   } else {
  //     return state.tvs.loading;
  //   }
  // });
  useEffect(() => {
    if (category === "movie") {
      dispatch(getDetailMovie(params.id));
      dispatch(getSimilarMovie(params.id));
    } else if (category === "tv") {
      dispatch(getDetailTVShow(params.id));
      dispatch(getSimilarTVShow(params.id));
    }
  }, [category, dispatch, params.id]);

  return (
    <>
      <div className={classes.detail}>
        <Header category={category} id={params.id} />
        <div className={classes.section}>
          <Content category={category} id={params.id} />
          <MoreLikeThis category={category} id={params.id} />
        </div>
      </div>
    </>
  );
};

export default Detail;
