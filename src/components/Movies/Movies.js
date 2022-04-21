import Pagination from "rc-pagination";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMoviesData, setLoading } from "../../app/moviesSlice";
import Box from "../../ui/Box";
import HeaderCategory from "../../ui/HeaderCategory";
const path_poster = "https://image.tmdb.org/t/p/w600_and_h900_bestv2/";

const Movies = () => {
  const movies = useSelector((state) => state.movies);
  const dispatch = useDispatch();
  const [current, setCurrent] = useState(1);

  useEffect(() => {
    console.log(movies);
    if (!movies.list[current]) {
      movies.loading && dispatch(getMoviesData(current));
    }
    movies.loading && dispatch(getMoviesData(current));
  }, [movies, dispatch, current]);

  //

  // const [PerPage, SetPerPage] = useState(10);
  const [Size, setSize] = useState(20);

  const PerPageChange = (value) => {
    setSize(value);
    const newPerPage = Math.ceil(movies?.list?.length / value);
    if (current > newPerPage) {
      setCurrent(newPerPage);
    }
  };

  // const getData = (current, pageSize) => {
  //   // Normally you should get the data from the server
  //   return movies?.list?.slice((current - 1) * pageSize, current * pageSize);
  // };

  const PaginationChange = (page, pageSize) => {
    setCurrent(page);
    dispatch(setLoading());
    setSize(pageSize);
  };

  const PrevNextArrow = (current, type, originalElement) => {
    if (type === "prev") {
      return (
        <button>
          <i className="fa fa-angle-double-left"></i>
        </button>
      );
    }
    if (type === "next") {
      return (
        <button>
          <i className="fa fa-angle-double-right"></i>
        </button>
      );
    }
    return originalElement;
  };

  //
  return (
    <div className="category">
      <HeaderCategory category={"Movies"} />
      <div className="category--box">
        {movies?.list[current]?.map((movie) => (
          <Box
            key={movie.id}
            image={
              path_poster +
              (movie.poster_path ? movie.poster_path : movie.backdrop_path)
            }
            rating={movie.vote_average}
            // tag={"Rating: " + movie.vote_average}
            genre_ids={movie.genre_ids}
            title={movie.title ? movie.title : movie.original_name}
            //  type="big"
            id={movie.id}
            category={"movie"}
            className={"box-in-list"}
          />
        ))}
      </div>
      {!movies.loading && (
        <Pagination
          className="pagination-data"
          showTotal={(total, range) =>
            `Showing ${range[0]}-${range[1]} of ${total}`
          }
          onChange={PaginationChange}
          total={movies?.totalPage * 20}
          current={current}
          pageSize={Size}
          showSizeChanger={false}
          itemRender={PrevNextArrow}
          onShowSizeChange={PerPageChange}
        />
      )}

      {/* {movies.loading && (
        <ClockLoader
          speedMultiplier={3}
          color={"#fff"}
          loading={movies.loading}
          css={override}
          size={100}
        />
      )} */}
    </div>
  );
};

export default Movies;
