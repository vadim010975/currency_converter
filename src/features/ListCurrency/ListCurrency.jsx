import "./ListCurrency.css";
import { useContext, useState } from "react";
import CurrencyContext from "../../contexts/CurrencyContext";
import InputListItem from "../../entities/InputListItem/InputListItem";

export default function ListCurrency(props) {
  const { list } = useContext(CurrencyContext);
  const [ listActivity, setListActiviti ] = useState(false);

  function onClick() {
    if (listActivity) {
      setListActiviti(false);
    } else {
      setListActiviti(true);
    }
  }

  function itemOnClick(item) {
    setListActiviti(false);
    props.callback(item);
  }

  return (
    <>
      <button onClick={onClick} className="converter__field_button"></button>
      <ul className={"converter__list" + (listActivity ? " active" : "")}>{list.map(
        (item, idx) => <InputListItem
          key={idx}
          item={item}
          onClick={itemOnClick}
        />
      )}
      </ul>
    </>
  );
}