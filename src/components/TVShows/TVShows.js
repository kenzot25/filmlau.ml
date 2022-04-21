import Pagination from "rc-pagination";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTVData, setLoading } from "../../app/tvshowsSlice";
import Box from "../../ui/Box";
import HeaderCategory from "../../ui/HeaderCategory";

const path_poster = "https://image.tmdb.org/t/p/w600_and_h900_bestv2/";

const TVShows = () => {
  const tvs = useSelector((state) => state.tvs);
  const dispatch = useDispatch();
  const [current, setCurrent] = useState(1);

  useEffect(() => {
    if (!tvs.list[current]) {
      tvs.loading && dispatch(getTVData(current));
    }
    tvs.loading && dispatch(getTVData(current));
  }, [tvs, dispatch, current]);

  //

  // const [PerPage, SetPerPage] = useState(10);
  const [Size, setSize] = useState(20);

  const PerPageChange = (value) => {
    setSize(value);
    const newPerPage = Math.ceil(tvs?.list?.length / value);
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
      <HeaderCategory category={"TV Shows"} />
      <div className="category--box">
        {tvs?.list[current]?.map((tv) => (
          <Box
            key={tv.id}
            image={path_poster + tv.poster_path}
            rating={tv.vote_average}
            // tag={"Rating: " + movie.vote_average}
            genre_ids={tv.genre_ids}
            title={tv.title ? tv.title : tv.original_name}
            //  type="big"
            id={tv.id}
            category={"tv"}
            className={"box-in-list"}
          />
        ))}
      </div>
      {!tvs.loading && (
        <Pagination
          className="pagination-data"
          showTotal={(total, range) =>
            `Showing ${range[0]}-${range[1]} of ${total}`
          }
          onChange={PaginationChange}
          total={500 * 20}
          current={current}
          pageSize={Size}
          showSizeChanger={false}
          itemRender={PrevNextArrow}
          onShowSizeChange={PerPageChange}
        />
      )}
    </div>
  );
};

export default TVShows;
