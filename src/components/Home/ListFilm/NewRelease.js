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

const NewRelease = ({ movies }) => {
  console.log(movies);
  return (
    <>
      <h4 className="title-content">Top Movies {">"}</h4>
      <Swiper
        modules={[Navigation, Scrollbar, A11y]}
        slidesPerView={5}
        spaceBetween={5}
        // navigation
        scrollbar={{ draggable: true }}
        breakpoints={{
          400: {
            slidesPerView: 1,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 5,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 5,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 5,
          },
          1300: {
            slidesPerView: 5,
            spaceBetween: 5,
          },
        }}
      >
        {movies?.map((movie) => {
          return (
            <SwiperSlide key={movie.id}>
              <Box
                image={path_poster + movie.poster_path}
                rating={movie.vote_average}
                // tag={"Rated:" + movie.vote_average}
                title={movie.title ? movie.title : movie.original_name}
                id={movie.id}
                category={"movie"}
                genre_ids={movie.genre_ids}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
};

export default NewRelease;
