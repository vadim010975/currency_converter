import "./Converter.css";
import { useContext, useEffect, useState } from "react";
import CurrencyContext from "../../contexts/CurrencyContext";
import ListCurrency from "../../features/ListCurrency/ListCurrency";

export default function Converter() {
  const { setAmount, setCurrentCurrency, setRequiredCurrency, ans } = useContext(CurrencyContext);

  const [data, setData] = useState({
    amount: "0",
    currentCurrency: "RUB",
    requiredCurrency: "USD"
  });

  useEffect(() => {
    setAmount(data.amount);
  }, [data.amount, setAmount]);

  useEffect(() => {
    setCurrentCurrency(data.currentCurrency);
  }, [data.currentCurrency, setCurrentCurrency]);

  useEffect(() => {
    setRequiredCurrency(data.requiredCurrency);
  }, [data.requiredCurrency, setRequiredCurrency]);

  const onChange = (event) => {
    const { target } = event;
    let { value, name } = target;
    if (name === "amount") {
      if (value.length > 1 && value[0] === "0") {
        value = value.slice(1);
      }
      if (value === "") {
        value = "0";
      }
      if ((+value).toFixed(0).length > 10) {
        return;
      }
      if (isFinite(value) && +value % 1 !== 0) {
        const fractionalPartLength = value.length - (+value).toFixed(0).length;
        if (fractionalPartLength > 3) {
          value = value.slice(0, 3 - fractionalPartLength)
        }
      }
    }
    if (name === "currentCurrency" || name === "requiredCurrency") {
      value = value.toUpperCase();
      if (value.length > 12) {
        return;
      }
    }
    setData(oldData => ({
      ...oldData,
      [name]: value
    }));
  }


  return (
    <section>
      <div className="converter__fields">
        <input type="text" name="amount" className={"converter__field" + (ans.amountIsCorrect ? "" : " incorrect")} value={data.amount} onChange={onChange} />
        <div className="input-wrapper">
          <input type="text" name="currentCurrency" className={"converter__field" + (ans.currentCurrencyIsCorrect ? "" : " incorrect")} value={data.currentCurrency} onChange={onChange} />
          <ListCurrency callback={(currency) => setData(oldData => ({ ...oldData, currentCurrency: currency }))} />
        </div>
        <div className="converter__field_in">IN</div>
        <div className="input-wrapper">
          <input type="text" name="requiredCurrency" className={"converter__field" + (ans.requiredCurrencyIsCorrect ? "" : " incorrect")} value={data.requiredCurrency} onChange={onChange} />
          <ListCurrency callback={(currency) => setData(oldData => ({ ...oldData, requiredCurrency: currency }))}/>
        </div>
        <div className="converter__field converter__result">{ans.result ? ans.result.toFixed(2) : ""}</div>
      </div>
    </section>
  );
}