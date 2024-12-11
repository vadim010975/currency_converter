import "./Main.css";
import PropTypes from 'prop-types';
import { useContext } from "react";
import PageContext from "../../contexts/PageContext";

export default function Main({children}) {

  const {page} = useContext(PageContext);

  return (
    <main className={"main " + page + "-page"}>
      {children}
    </main>
  );
}

Main.propTypes = {
  children: PropTypes.element,
};