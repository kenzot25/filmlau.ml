import React from "react";
import { Link } from "react-router-dom";
import { Autoplay, EffectFade } from "swiper";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { findCategoryOfMovieByGenreID } from "../../../untils/helper";
import classes from "./Hero.module.css";
const path_backdrop =
  "https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces";
const Hero = ({ herodata }) => {
  console.log("HERO data", herodata);
  return (
    <>
      <Swiper
        loop={true}
        spaceBetween={0}
        // effect={"fade"}
        centeredSlides={true}
        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
        }}
        speed={0}
        modules={[EffectFade, Autoplay]}
        className="fixedSwiper"
      >
        {herodata.map((film) => (
          <SwiperSlide key={film.id}>
            <div className={classes.hero}>
              <div
                className={classes.bg}
                style={{
                  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),url(${
                    path_backdrop + film?.backdrop_path
                  })`,
                }}
              ></div>
              <div className={classes.box}>
                <p className={classes.tag}>
                  {
                    findCategoryOfMovieByGenreID(
                      film.media_type,
                      film.genre_ids
                    )[0]
                  }
                </p>
                <div className="rating">
                  {/* {Array(Math.floor((film?.vote_average / 10) * 5))
                    .fill()
                    .map((_, i) => ( */}
                  <img
                    alt="star"
                    className="rating--star"
                    src={process.env.PUBLIC_URL + "/images/StarFill.svg"}
                  />
                  <span className="rating--num"> {film?.vote_average}/10</span>
                  {/* ))} */}
                </div>
                {/* movie.title ? movie.title : movie.original_name */}
                <h1 className={classes.title}>
                  {film?.title ? film?.title : film?.original_name}
                </h1>
                <p className={classes.description}>
                  {film?.overview.slice(0, 250) + "..."}
                </p>
                <Link
                  to={`${film.media_type === "movie" ? "movie" : "tv"}/watch/${
                    film.id
                  }`}
                  className={classes.btn}
                >
                  Watch Now
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      {/* <div className={classes.darker}></div> */}
    </>
  );
};

export default Hero;
