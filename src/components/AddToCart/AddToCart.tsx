import { useContext } from "react";
import { Link } from "react-router-dom";
import CartContext from "../../store/cart-context";

import "./AddToCart.scss";

const AddToCart: React.FC = () => {
  const { selectedMovie, addMovieToCart, cartArray } = useContext(CartContext);

  let existingMovie = cartArray.find(
    (movie) => movie.movieID === selectedMovie.movieID
  );

  return (
    <div className="add-to-cart__main-container">
      <button
        disabled={
          selectedMovie.selectedSeats.length === 0 &&
          (existingMovie?.selectedSeats.length === 0 ||
          existingMovie === undefined
            ? true
            : false)
        }
        onClick={() => addMovieToCart(selectedMovie)}
        className="btn-main"
      >
        {!existingMovie ? "Add to cart" : "Update cart"}
      </button>
      <Link to={"/dataform"}>
        <button disabled={cartArray.length === 0} className="btn-main">
          Checkout
        </button>
      </Link>
    </div>
  );
};

export default AddToCart;
