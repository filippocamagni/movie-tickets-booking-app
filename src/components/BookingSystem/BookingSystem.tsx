import { useContext, useEffect } from "react";
import { SelectedMovieInterface } from "../../interfaces/interfaces";
import { motion } from "framer-motion";
import CartContext from "../../store/cart-context";
import Tickets from "../Tickets/Tickets";
import movies from "../../movies.json";

import "./BookingSystem.scss";
import AddToCart from "../AddToCart/AddToCart";

const columns = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"];
const rows = ["a", "b", "c", "d", "e", "f", "g", "h"];

const BookingSystem: React.FC = () => {
  const { cartArray, selectedMovie, handleSeatSelection, setSelectedMovie } =
    useContext(CartContext);

  let movieIsAdded = cartArray.some(
    (movie) => movie.movieID === selectedMovie.movieID
  );

  useEffect(() => {
    setSelectedMovie(() => {
      if (movieIsAdded) {
        let existingMovie = cartArray.find(
          (movie) => movie.movieID === selectedMovie.movieID
        ) as SelectedMovieInterface;
        return { ...existingMovie };
      } else {
        return selectedMovie as SelectedMovieInterface;
      }
    });
  }, [cartArray]);

  const handleSeatsClasses = (id: string) => {
    let seatsArray = selectedMovie.selectedSeats.map((seat) => seat.seatNumber);
    return seatsArray.includes(id) ? `seat selected` : `seat`;
  };

  const [movie] = movies.filter(
    (movie) => movie.title === selectedMovie.movieTitle
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.1 } }}
    >
      {Object.keys(selectedMovie).length === 0 ? (
        <div className="mt-8">
          <p>No movie selected. Please select a movie first.</p>
        </div>
      ) : (
        <div className="booking-system__container">
          <div className="booking-system__screen">
            <div
              className="booking-system__movie-summary"
              style={{
                background: `url(${movie.movieBg})`,
                backgroundSize: "cover",
              }}
            >
              <div className="booking-system__movie-summary--inner">
                <p>Selected movie</p>
                <h3>{selectedMovie.movieTitle}</h3>
                <p className="mt-2">Selected hour</p>
                <h3>{selectedMovie.selectedHour}</h3>
                <p className="mt-2">Please select your seats.</p>
              </div>
            </div>
          </div>
          <div className="booking-system__theatre">
            <div className="seats-container">
              {columns.map((column, idx) => {
                return (
                  <div key={idx} className={`col-${column}`}>
                    {rows.map((row) => {
                      let id: string = column + row.toLocaleUpperCase();
                      return (
                        <div
                          key={id}
                          id={id}
                          className={handleSeatsClasses(id)}
                          onClick={(event) => handleSeatSelection(event)}
                        >
                          {id}
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>
          <AddToCart />
          <Tickets />
        </div>
      )}
    </motion.div>
  );
};

export default BookingSystem;
