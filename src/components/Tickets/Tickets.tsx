import React, { useContext } from "react";
import CartContext from "../../store/cart-context";

import "./Tickets.scss";

const Tickets: React.FC = () => {
  const { cartArray, selectedMovie, updateSeatPrice } = useContext(CartContext);

  const prices = { fullPrice: 8, discountPrice: 6 };

  const movieToUpdate = cartArray.find(
    (movie) => movie.movieID === selectedMovie.movieID
  );

  const handlePriceChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
    seatNumber: string
  ) => {
    const selectedPrice = parseInt((event.target as HTMLSelectElement).value);
    updateSeatPrice(selectedMovie.movieID, seatNumber, selectedPrice);
  };

  return (
    <div>
      <div className="tickets__outer-container--shadow  mt-4">
        <div className="tickets__outer-container">
          {movieToUpdate ? (
            <div>
              {movieToUpdate.selectedSeats.map((ticket, idx) => {
                let seatRow = ticket.seatNumber
                  .split("")
                  .filter((char) => /[A-Z]/.test(char));
                let seatCol = ticket.seatNumber
                  .split("")
                  .filter((char) => /[0-9]/.test(char));
                return (
                  <div className="tickets__grid" key={idx}>
                    <div className="tickets__col--seat-sm">
                      <p>Seat</p>
                      <p className="bold">{ticket.seatNumber}</p>
                    </div>
                    <div className="tickets__col--seat-number">
                      <p>Seat number</p>
                      <p className="bold">{seatCol}</p>
                    </div>
                    <div className="tickets__col--seat-row">
                      <p>Row</p>
                      <p className="bold">{seatRow}</p>
                    </div>
                    <div className="tickets__col--price-selection">
                      <select
                        onChange={(event) =>
                          handlePriceChange(event, ticket.seatNumber)
                        }
                        className="price-selector"
                      >
                        <option value={prices.fullPrice}>
                          Full price: {prices.fullPrice}€
                        </option>
                        <option value={prices.discountPrice}>
                          Discounted: {prices.discountPrice}€
                        </option>
                      </select>
                    </div>
                    <div className="tickets__col--price-selected">
                      <p>Price</p>
                      <p className="bold">{ticket.seatPrice} €</p>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default Tickets;
