import axios from "axios";
import React, { useState } from "react";
import Hero from "./Hero/Hero";
import classes from "./Home.module.css";
import FeaturedShows from "./ListFilm/FeaturedShows";
import NewRelease from "./ListFilm/NewRelease";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [tv, setTV] = useState([]);
  const [data, setData] = useState(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/trending/all/week?api_key=${process.env.REACT_APP_KEY_API_THEMOVIEDB}`
      )
      .then((res) => res.data.results)
      .then((results) => {
        results.map((result) => {
          if (result.media_type === "tv") {
            setTV((prev) => [...prev, result]);
          } else {
            setMovies((prev) => [...prev, result]);
          }
          return setData(results);
        });
      });
  });

  return (
    <div className={classes.home}>
      {data && <Hero herodata={data} />}
      <div className={classes.content}>
        <NewRelease movies={movies} />
        <FeaturedShows tvs={tv} />
      </div>
    </div>
  );
};

export default Home;
