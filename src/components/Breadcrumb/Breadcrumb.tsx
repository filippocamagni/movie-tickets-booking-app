import { useLocation } from "react-router-dom";
import "./Breadcrumb.scss";

const Breadcrumb: React.FC = () => {
  const location = useLocation();

  return (
    <nav className="breadcrumb__container">
      <ul className="breadcrumb__list">
        <li className="breadcrumb__list--item">
          <p
            className={
              location.pathname === "/" ? "active-bc" : "not-active-bc"
            }
          >
            <span className="breadcrumb__list--item-n">1</span>Movie selection
          </p>
        </li>
        <li className="breadcrumb__list--item">
          <p
            className={
              location.pathname === "/booking" ? "active-bc" : "not-active-bc"
            }
          >
            <span className="breadcrumb__list--item-n">2</span>Seat selection
          </p>
        </li>
        <li className="breadcrumb__list--item">
          <p
            className={
              location.pathname === "/dataform" ? "active-bc" : "not-active-bc"
            }
          >
            <span className="breadcrumb__list--item-n">3</span>Insert your data
          </p>
        </li>
        <li className="breadcrumb__list--item">
          <p
            className={
              location.pathname === "/checkout" ? "active-bc" : "not-active-bc"
            }
          >
            <span className="breadcrumb__list--item-n">4</span>Checkout
          </p>
        </li>
      </ul>
    </nav>
  );
};

export default Breadcrumb;
