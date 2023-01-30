import { motion } from "framer-motion";
import { useContext } from "react";
import { Link } from "react-router-dom";
import CartContext from "../../store/cart-context";

import { FaTicketAlt } from "react-icons/fa";
import movies from "../../movies.json";
import "./Checkout.scss";

const date = new Date();
const today =
  String(date.getMonth() + 1).padStart(2, "0") +
  "/" +
  String(date.getDate()).padStart(2, "0") +
  "/" +
  date.getFullYear();

const Checkout = () => {
  const { cartArray, personalData } = useContext(CartContext);
  const totalPrice = cartArray
    .map((movie) => movie.selectedSeats.reduce((a, b) => a + b.seatPrice, 0))
    .reduce((a, b) => a + b, 0);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.1 } }}
    >
      {cartArray.length === 0 ? (
        <div className="mt-8 checkout__empty-container">
          <p>
            Your cart is empty. Please select a movie and insert your personal
            data first.
          </p>
        </div>
      ) : (
        <div className="checkout__main-container">
          <div className="checkout__tickets-container">
            {cartArray.map((movie, idx) => {
              const [dbMovie] = movies.filter(
                (dbMovie) => dbMovie.title === movie.movieTitle
              );
              return (
                <div
                  key={idx}
                  className="checkout__movie--bg-container"
                  style={{
                    background: `url(${dbMovie.movieBg})`,
                    backgroundSize: "contain",
                    backgroundPosition: "-120px",
                    backgroundRepeat: "no-repeat",
                  }}
                >
                  <div className="checkout__movie--inner-container">
                    <p className="checkout__movie--upper-text">{today}</p>
                    <p className="checkout__movie--title">{movie.movieTitle}</p>
                    <div className="checkout__movie--hour-container">
                      <div>
                        <p className="checkout__movie--upper-text">Tickets</p>
                        <p className="checkout__movie--hour">
                          <FaTicketAlt className="checkout__movie--hour-icon" />{" "}
                          {movie.selectedSeats.length}
                        </p>
                      </div>
                      <div>
                        <p className="checkout__movie--upper-text">Hour</p>
                        <p className="checkout__movie--hour">
                          {movie.selectedHour}
                        </p>
                      </div>
                    </div>
                    <div className="checkout__movie--tickets">
                      {movie.selectedSeats.map((seat, idx) => (
                        <div
                          key={idx}
                          className="checkout__movie--single-ticket"
                        >
                          <p
                            className={
                              seat.seatNumber.length < 3
                                ? "checkout__movie--seat-number"
                                : "checkout__movie--seat-number-big"
                            }
                          >
                            {seat.seatNumber}
                          </p>
                          <p className="checkout__movie--seat-price">
                            {seat.seatPrice}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="checkout__amount-container">
            <p>
              Total:{" "}
              <span className="checkout__amount--price">{totalPrice} €</span>
            </p>
          </div>
          <div className="checkout__data--container">
            <p className="checkout__data--title">Name:</p>
            <p className="checkout__data--value">
              {personalData.name} {personalData.surname}
            </p>
            <p className="checkout__data--title">
              The tickets will be sent to:
            </p>
            <p className="checkout__data--value">{personalData.email}</p>
            <p className="checkout__data--title">Phone number:</p>
            <p className="checkout__data--value">{personalData.tel}</p>
          </div>
          <div className="checkout__button-container">
            <Link to={"/dataform"}>
              <button className="btn-main">Edit data</button>
            </Link>
            <button className="btn-main">Pay</button>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default Checkout;
