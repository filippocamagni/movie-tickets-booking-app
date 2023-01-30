import { Link } from "react-router-dom";
import { useContext } from "react";

import CartContext from "../../store/cart-context";
import {
  NavbarProps,
  SelectedMovieInterface,
} from "../../interfaces/interfaces";

import { FaHome, FaShoppingCart, FaMoneyBillWave } from "react-icons/fa";

import "./Navbar.scss";

const Navbar: React.FC<NavbarProps> = (props) => {
  const cartCtx = useContext(CartContext);

  const totalPrice = cartCtx.cartArray
    .map((movie) => movie.selectedSeats.reduce((a, b) => a + b.seatPrice, 0))
    .reduce((a, b) => a + b, 0);

  const handleTotalAmountOfSeats = (cartArray: SelectedMovieInterface[]) => {
    let seatsArray = [];
    if (cartArray) {
      cartArray.forEach((movie) => {
        seatsArray.push(...movie.selectedSeats);
      });
      return seatsArray.length;
    }
  };

  return (
    <nav className="nav">
      <h1 className="logo">
        <span className="str-bold">A</span> Movie{" "}
        <span className="str-bold">Theater</span>
      </h1>
      <ul className="nav__list">
        <li>
          <Link to="/" className="nav__list--button">
            <FaHome />
          </Link>
        </li>
        <li className="nav__list--cart">
          <button className="nav__list--button" onClick={props.onShowCart}>
            <FaShoppingCart />
          </button>
          <span
            className={
              handleTotalAmountOfSeats(cartCtx.cartArray)! < 100
                ? "nav__list--cart-badge"
                : "nav__list--cart-badge badge-sm"
            }
          >
            {handleTotalAmountOfSeats(cartCtx.cartArray)}
          </span>
        </li>
        <li className="nav__list--price">
          <button style={{ cursor: "default" }} className="nav__list--button">
            <FaMoneyBillWave />
          </button>
          <span className="nav__list--price-badge">{totalPrice} €</span>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
