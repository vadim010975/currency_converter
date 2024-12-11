import "./HeaderNavbar.css";
import { NavLink } from 'react-router-dom';
import { useContext } from "react";
import PageContext from "../../contexts/PageContext";

export default function HeaderNavbar() {
  const { page, setPage } = useContext(PageContext);

  const handleClick = (e) => {
    if (e.target.parentNode === document.querySelector("header>.navbar-nav").firstChild) {
      setPage("first");
      return;
    }
    if (e.target.parentNode === document.querySelector("header>.navbar-nav").lastChild) {
      setPage("last");
    }
  }

  return (
    <>
      <ul className="navbar-nav">
        <li className={page === "first" ? "nav-item active" : "nav-item"}>
          <NavLink to="/" onClick={handleClick} className={page === "first" ? "nav-link active" : "nav-link"}>Конвертер</NavLink>
        </li>
        <li className={page === "last" ? "nav-item active" : "nav-item"}>
          <NavLink to="/rates.html" onClick={handleClick} className={page === "last" ? "nav-link active" : "nav-link"}>Текущие курсы валют</NavLink>
        </li>
      </ul>
      <div className="nav-bottom-wrapper">
        <div className={page === "first" ? "nav-bottom-item active" : "nav-bottom-item"}></div>
        <div className={page === "last" ? "nav-bottom-item active" : "nav-bottom-item"}></div>
      </div>
    </>
  );
}