import React from "react";

export interface NavbarProps {
  onShowCart: () => void;
}

export interface HeaderProps {
  children: React.ReactNode;
}

export interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

export interface SelectedMovieInterface {
  movieID: string;
  movieTitle: string;
  selectedHour: string;
  selectedSeats: { seatNumber: string; seatPrice: number }[];
}

export interface CartProps {
  onClose: () => void;
}

export interface CartInterface {
  setSelectedMovie: React.Dispatch<
    React.SetStateAction<SelectedMovieInterface>
  >;
  selectedMovie: {
    movieID: string;
    movieTitle: string;
    selectedHour: string;
    selectedSeats: { seatNumber: string; seatPrice: number }[];
  };
  personalData: {
    name: string | undefined;
    surname: string | undefined;
    email: string | undefined;
    emailRep: string | undefined;
    tel: string | undefined;
  };
  setPersonalData: React.Dispatch<React.SetStateAction<PersonalDataInterface>>;
  cartArray: SelectedMovieInterface[];
  handleMovieSelection: (movieTitle: string, movieHour: string) => void;
  handleSeatSelection: (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => void;
  addMovieToCart: (selectedMovie: SelectedMovieInterface) => void;
  removeSeatFromCart: (movieID: string, seatID: string) => void;
  updateSeatPrice: (movieID: string, seatID: string, price: number) => void;
}

export interface CartProviderProps {
  children: React.ReactNode;
}

export interface PersonalDataInterface {
  name: string | undefined;
  surname: string | undefined;
  email: string | undefined;
  emailRep: string | undefined;
  tel: string | undefined;
}
