import { useContext } from "react";
import { motion } from "framer-motion";
import { BsClockFill } from "react-icons/bs";
import movies from "../../../movies.json";

import CartContext from "../../../store/cart-context";

import "./MovieCard.scss";

const date = new Date();
const today =
  String(date.getMonth() + 1).padStart(2, "0") +
  "/" +
  String(date.getDate()).padStart(2, "0") +
  "/" +
  date.getFullYear();

const MovieCard: React.FC = () => {
  const cartCtx = useContext(CartContext);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.1 } }}
    >
      <div className="date-container">{today}</div>
      {movies.map((movie) => (
        <div key={movie.id} className="movie-card__main-container">
          <div className="movie-card__info">
            <div className="movie-card__info--data">
              <img
                className="movie-poster"
                src={movie.poster}
                alt="movie_poster"
              />
              <div className="movie-card__info--grid-container">
                <h1 className="movie-title">{movie.title}</h1>
                <p className="movie-original-title">
                  {" "}
                  {movie.originalTitle
                    ? `Original title: ${movie.originalTitle}`
                    : ""}
                </p>
                <div className="movie-additional-data">
                  <p>
                    {movie.genres.map((genre, idx) => (
                      <span className="movie-genre" key={idx}>
                        {genre}
                      </span>
                    ))}
                  </p>
                  <p className="movie-year">{movie.year}</p>
                  <p className="movie-runtime">
                    <BsClockFill className="movie-runtime--icon" />{" "}
                    {movie.runtime}
                  </p>
                  <p className="movie-language">{movie.language}</p>
                </div>
              </div>
            </div>
            <div className="movie-card__info--synopsis">
              <p>{movie.plot}</p>
            </div>
            <div>
              {movie.hours.map((hour, idx) => {
                return (
                  <button
                    key={idx}
                    onClick={() =>
                      cartCtx.handleMovieSelection(movie.title, hour)
                    }
                    className="movie-card__btn"
                  >
                    {hour}
                  </button>
                );
              })}
            </div>
          </div>
          <div
            className="movie-card__bg-image"
            style={{
              background: `url(${movie.movieBg})`,
              backgroundPosition: "15rem",
              backgroundSize: "contain",
            }}
          ></div>
        </div>
      ))}
    </motion.div>
  );
};

export default MovieCard;
