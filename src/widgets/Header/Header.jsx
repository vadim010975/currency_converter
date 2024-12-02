import "./Header.css";
import HeaderNavbar from "../../features/HeaderNavbar/HeaderNavbar";

export default function Header() {
  return (
    <header className="header">
      <h2 className="header__title">Конвертер валют</h2>
      <HeaderNavbar />
    </header>
  );
}