import "./InputListItem.css";
import { useContext } from "react";
import CurrencyContext from "../../contexts/CurrencyContext";

export default function InputListItem(props) {

  function onClick() {
    props.onClick(props.item);
  }

  return (
    <li onClick={onClick} className="converter__list_item">
      {props.item}
    </li>
  );
}