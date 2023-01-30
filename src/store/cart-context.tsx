import React from "react";
import { CartInterface } from "../interfaces/interfaces";

const CartContext = React.createContext<CartInterface>({
  setSelectedMovie: () => {},
  selectedMovie: {
    movieID: "",
    movieTitle: "",
    selectedHour: "",
    selectedSeats: [{ seatNumber: "", seatPrice: 0 }],
  },
  personalData: {
    name: undefined,
    surname: undefined,
    email: undefined,
    emailRep: undefined,
    tel: undefined,
  },
  setPersonalData: () => {},
  handleMovieSelection: () => {},
  handleSeatSelection: () => {},
  addMovieToCart: () => {},
  removeSeatFromCart: () => {},
  updateSeatPrice: () => {},
  cartArray: [],
});

export default CartContext;
