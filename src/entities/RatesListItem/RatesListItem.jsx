import { useContext, useState, useEffect } from "react";
import CurrencyContext from "../../contexts/CurrencyContext";

export default function RatesListItem(props) {
  const { amount, setAmount, currentCurrency, setCurrentCurrency, requiredCurrency, setRequiredCurrency, ans } = useContext(CurrencyContext);

  const [ rate, setRate ] = useState(0);

  useEffect(() => {
    setAmount("1");
    setCurrentCurrency(props.base);
    setRequiredCurrency(props.item);
    
  }, [props.base]);


  useEffect(() => {
    if (ans.result) {
    }
  }, [ans]);


  return (
    <li className="rates__list_item">
      <span className="rates__list_item_currency">{props.item}</span>
      <span> : </span>
      <span className="rates__list_item_rate">{rate}</span>
    </li>
  );
}