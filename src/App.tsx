import { useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import BookingSystem from "./components/BookingSystem/BookingSystem";
import Navbar from "./components/Navbar/Navbar";
import Breadcrumb from "./components/Breadcrumb/Breadcrumb";
import MovieCard from "./components/UI/MovieCard/MovieCard";
import Header from "./components/Layout/Header/Header";
import Main from "./components/Layout/Main/Main";
import Cart from "./components/Cart/Cart";
import PersonalDataForm from "./components/PersonalDataForm/PersonalDataForm";
import Checkout from "./components/Checkout/Checkout";
import NotFound from "./components/UI/NotFound/NotFound";

import "./App.scss";
import "./styles/global.scss";
import "./styles/helpers.scss";
import "./components/UI/Buttons/Buttons.scss";

const App = () => {
  const location = useLocation();
  const [cartIsShown, setCartIsShown] = useState(false);
  const showCartHandler = () => {
    setCartIsShown(true);
  };
  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  return (
    <div className="main__container">
      {cartIsShown && <Cart onClose={hideCartHandler} />}
      <Header>
        <Navbar onShowCart={showCartHandler} />
        <Breadcrumb />
      </Header>
      <Main>
        <AnimatePresence>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<MovieCard />} />
            <Route path="/booking" element={<BookingSystem />} />
            <Route path="/dataform" element={<PersonalDataForm />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </Main>
    </div>
  );
};

export default App;
