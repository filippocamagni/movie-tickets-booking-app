import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  CartProviderProps,
  PersonalDataInterface,
  SelectedMovieInterface,
} from "../interfaces/interfaces";
import CartContext from "./cart-context";

const CartProvider: React.FC<CartProviderProps> = (props) => {
  const navigate = useNavigate();

  let defaultTicketPrice: number = 8;

  const [cartArray, setCartArray] = useState<SelectedMovieInterface[]>(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      const defaultState = JSON.parse(savedCart);
      return defaultState;
    } else {
      return [] as SelectedMovieInterface[];
    }
  });

  const [selectedMovie, setSelectedMovie] = useState<SelectedMovieInterface>(
    {} as SelectedMovieInterface
  );

  const [personalData, setPersonalData] = useState<PersonalDataInterface>({
    name: undefined,
    surname: undefined,
    email: undefined,
    emailRep: undefined,
    tel: undefined,
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartArray));
  }, [cartArray]);

  const handleMovieSelection = (movieTitle: string, movieHour: string) => {
    let movieID =
      movieTitle.trim().replace(/\s+/g, "-").toLowerCase() +
      movieHour.slice(0, 2);
    setSelectedMovie(() => {
      return {
        movieID: movieID,
        movieTitle: movieTitle,
        selectedHour: movieHour,
        selectedSeats: [],
      };
    });
    navigate("/booking");
  };

  const handleSeatSelection = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    let selectedSeatID = (event.target as HTMLDivElement).id;
    let movieIsAdded = cartArray.some(
      (movie) => movie.movieID === selectedMovie.movieID
    );
    if (movieIsAdded) {
      setSelectedMovie((prev) => {
        let seatsArray = prev.selectedSeats.map((seat) => seat.seatNumber);
        if (seatsArray.includes(selectedSeatID)) {
          const filteredSeatsID = seatsArray.filter(
            (seatID) => seatID !== selectedSeatID
          );
          const filteredSeatsObj = filteredSeatsID.map((seat) => {
            return { seatNumber: seat, seatPrice: defaultTicketPrice };
          });
          return { ...prev, selectedSeats: [...filteredSeatsObj] };
        } else {
          return {
            ...prev,
            selectedSeats: [
              ...prev!.selectedSeats,
              { seatNumber: selectedSeatID, seatPrice: defaultTicketPrice },
            ],
          };
        }
      });
    } else {
      setSelectedMovie((prev) => {
        let seatsArray = prev.selectedSeats.map((seat) => seat.seatNumber);
        if (seatsArray.includes(selectedSeatID)) {
          const filteredSeatsID = seatsArray.filter(
            (seatID) => seatID !== selectedSeatID
          );
          const filteredSeatsObj = filteredSeatsID.map((seat) => {
            return { seatNumber: seat, seatPrice: defaultTicketPrice };
          });
          return {
            ...prev,
            selectedSeats: [...filteredSeatsObj],
          };
        } else {
          return {
            ...prev,
            selectedSeats: [
              ...prev!.selectedSeats,
              { seatNumber: selectedSeatID, seatPrice: defaultTicketPrice },
            ],
          };
        }
      });
    }
  };

  const addMovieToCart = (addedMovie: SelectedMovieInterface) => {
    setCartArray((prev) => {
      if (!prev) {
        return [addedMovie];
      } else if (addedMovie.selectedSeats.length === 0) {
        let filteredMovieArray = prev.filter(
          (movie) => movie.movieID !== addedMovie.movieID
        );
        return filteredMovieArray;
      } else if (
        cartArray.some((movie) => movie.movieID === selectedMovie.movieID)
      ) {
        let newArray = prev.map((movie) => {
          if (movie.movieID === addedMovie.movieID) {
            return { ...movie, selectedSeats: addedMovie.selectedSeats };
          } else {
            return movie;
          }
        });
        return newArray;
      } else {
        return [...prev, addedMovie];
      }
    });
  };

  const removeSeatFromCart = (movieID: string, seatID: string) => {
    const newState = cartArray.map((movie) => {
      if (movie.movieID === movieID) {
        let filteredSeats = movie.selectedSeats.filter(
          (seat) => seat.seatNumber !== seatID
        );
        return { ...movie, selectedSeats: filteredSeats };
      }
      return movie;
    });
    setCartArray(() => {
      const filteredMovies = newState.filter(
        (movie) => movie.selectedSeats.length > 0
      );
      return filteredMovies;
    });
  };

  const updateSeatPrice = (movieID: string, seatID: string, price: number) => {
    const newState = cartArray.map((movie) => {
      if (movie.movieID === movieID) {
        let updatedSeats = movie.selectedSeats.map((seat) => {
          if (seat.seatNumber === seatID) {
            return { seatNumber: seat.seatNumber, seatPrice: price };
          } else {
            return seat;
          }
        });
        return { ...movie, selectedSeats: updatedSeats };
      } else {
        return movie;
      }
    });
    setCartArray(() => {
      const filteredMovies = newState.filter(
        (movie) => movie.selectedSeats.length > 0
      );
      return filteredMovies;
    });
  };

  const cartContext = {
    selectedMovie,
    setSelectedMovie,
    cartArray,
    handleMovieSelection,
    handleSeatSelection,
    addMovieToCart,
    removeSeatFromCart,
    updateSeatPrice,
    personalData,
    setPersonalData,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
