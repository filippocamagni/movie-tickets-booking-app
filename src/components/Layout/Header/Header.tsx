import { HeaderProps } from "../../../interfaces/interfaces";
import "./Header.scss";

const Header: React.FC<HeaderProps> = ({ children }) => {
  return <header>{children}</header>;
};

export default Header;
