import { useContext } from "react";
import { CartProps } from "../../interfaces/interfaces";
import { Link } from "react-router-dom";

import CartContext from "../../store/cart-context";
import Modal from "../UI/Modal/Modal";

import { GoStar } from "react-icons/go";
import { BsScissors } from "react-icons/bs";
import { FaTicketAlt } from "react-icons/fa";

import "./Cart.scss";

const Cart: React.FC<CartProps> = (props) => {
  const { cartArray, personalData, removeSeatFromCart } =
    useContext(CartContext);

  const cartItems = (
    <div className="cart__main-container">
      {cartArray.map((movie, idx) => (
        <div key={idx} className="cart__items-container">
          <div className="cart__items-details">
            <div className="cart__items-details--left-wrapper">
              <p className="cart__items-details--title">
                Movie title: <span className="bold">{movie.movieTitle}</span>
              </p>
              <p className="cart__items-details--hour">
                Selected hour:{" "}
                <span className="bold">{movie.selectedHour}</span>
              </p>
            </div>
            <div className="cart__items-details--right-wrapper">
              <FaTicketAlt className="cart__items-details--ticket-icon" />
              <p className="cart__items-details--ticket-amount">
                <span className="bold">{movie.selectedSeats.length}</span>
              </p>
            </div>
          </div>
          <ul className="cart__items-list">
            {movie.selectedSeats.map((ticket, idx) => (
              <li className="cart__ticket--outer" key={idx}>
                <div className="cart__ticket--inner">
                  <div className="cart__ticket--seat-container">
                    <p className="cart__ticket--seat-word">Admit one</p>
                    <p
                      className={
                        ticket.seatNumber.length < 3
                          ? "cart__ticket--seat-number"
                          : "cart__ticket--seat-big-number"
                      }
                    >
                      {ticket.seatNumber}
                    </p>
                  </div>
                  <div className="cart__ticket--price-container">
                    <p className="cart__ticket--price-number">
                      {ticket.seatPrice}
                      <span className="cart__ticket--price-eur">€</span>
                    </p>
                  </div>
                  <GoStar className="cart__ticket--star-right" />
                </div>
                <button
                  className="cart__ticket--delete-btn"
                  onClick={() =>
                    removeSeatFromCart(movie.movieID, ticket.seatNumber)
                  }
                >
                  <BsScissors id="scissors" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );

  const emptyCart = (
    <div className="cart__empty-container">
      <p>The cart is emtpy.</p>
    </div>
  );

  const totalPrice = cartArray
    .map((movie) => movie.selectedSeats.reduce((a, b) => a + b.seatPrice, 0))
    .reduce((a, b) => a + b, 0);

  const dataNotReady = Object.values(personalData).some(
    (value) => value === undefined || value === ""
  );

  return (
    <Modal onClose={props.onClose}>
      {cartArray.length === 0 ? emptyCart : cartItems}
      <div className="cart__amount-container">
        <p>
          Total amount:{" "}
          <span className="cart__amount-price">{totalPrice} €</span>
        </p>
      </div>
      <div className="cart__btn-container">
        <button className="btn-main" onClick={props.onClose}>
          Close
        </button>
        {cartArray.length <= 0 ? (
          ""
        ) : dataNotReady ? (
          <Link to={"/dataform"}>
            <button onClick={props.onClose} className="btn-main">
              Insert your data
            </button>
          </Link>
        ) : (
          <Link to={"/checkout"}>
            <button onClick={props.onClose} className="btn-main">
              Checkout
            </button>
          </Link>
        )}
      </div>
    </Modal>
  );
};

export default Cart;
