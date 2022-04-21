import React from "react";
import { A11y, Navigation, Scrollbar } from "swiper";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Swiper, SwiperSlide } from "swiper/react";
import Box from "../../../ui/Box";

const path_poster = "https://image.tmdb.org/t/p/w600_and_h900_bestv2/";
const FeaturedShows = ({ tvs }) => {
  return (
    <>
      <h4 className="title-content">Featured TV shows {">"}</h4>
      {/* <div className="slide"> */}
      <Swiper
        modules={[Navigation, Scrollbar, A11y]}
        spaceBetween={0}
        slidesPerView={3}
        navigation
        scrollbar={{ draggable: true }}
        breakpoints={{
          1300: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 2,
          },
          700: {
            slidesPerView: 2,
          },
          400: {
            slidesPerView: 1,
          },
        }}
      >
        {tvs?.map((movie) => {
          return (
            <SwiperSlide key={movie.id}>
              <Box
                key={movie.id}
                image={path_poster + movie.poster_path}
                rating={movie.vote_average}
                // tag={"Rating: " + movie.vote_average}
                genre_ids={movie.genre_ids}
                title={movie.title ? movie.title : movie.original_name}
                type="big"
                id={movie.id}
                category={"tv"}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
      {/* </div> */}
    </>
  );
};

export default FeaturedShows;
