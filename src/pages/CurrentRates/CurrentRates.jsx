import "./CurrentRates.css";
import { useState, useContext, useEffect } from "react";
import CurrencyContext from "../../contexts/CurrencyContext";
import ListCurrency from "../../features/ListCurrency/ListCurrency";
import RatesListItem from "../../entities/RatesListItem/RatesListItem";

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));


/**
 * Хук useData на вход берет объект со свойством "базовая валюта" и возвращает объект "курс валют",
 * ключи - обозначения валют,
 * значения - курсы относительно базовой валюты.
 *
 */
const useData = ({ currentCurrency }) => {
  
  const { list, setAmount, setCurrentCurrency, setRequiredCurrency, ans } = useContext(CurrencyContext);
  const [currentList, setCurrentList] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [rates, setRates] = useState({});
  const [allRates, setAllRates] = useState({});

  const setParam = (ReqCurrency) => {
    setAmount("1");
    setCurrentCurrency(currentCurrency);
    setRequiredCurrency(ReqCurrency);
  }

  const step = () => {
    setParam(currentList[currentIdx]);
  }

  useEffect(() => {
    if (list?.length > 0) {
      setCurrentList(list.filter(item => item !== currentCurrency));
    }
  }, [list]);

  useEffect(() => {
    if (ans.result) {
      setRates(oldRates => ({ ...oldRates, [currentList[currentIdx]]: ans.result }));
      (async () => {
        await sleep(5);
        setCurrentIdx(currentIdx + 1);
      })();
    }
  }, [ans.result]);

  useEffect(() => {
    if (currentList?.length > 0) {
      if (currentIdx < currentList.length) {
        step();
      }
    }
  }, [currentIdx, currentList]);

  useEffect(() => {
    if (currentList?.length > 0) {
      setRates({});
      setAllRates({});
      setCurrentList(list.filter(item => item !== currentCurrency));
      setCurrentIdx(0);
    }
  }, [currentCurrency]);

  useEffect(() => {
    if (Object.keys(rates).length >= currentList.length) {
      setAllRates(rates);
    }
  }, [rates]);

  return [allRates];
}

export default function CurrentRates() {
  const { setCurrentCurrency, ans } = useContext(CurrencyContext);

  const [data, setData] = useState({
    currentCurrency: "RUB",
  });

  const [baseCurrency, setBaseCurrency] = useState(data);
  const [currentRates, setCurrentRates] = useState({});


  useEffect(() => {
    setCurrentCurrency(data.currentCurrency);
  }, [data.currentCurrency]);

  useEffect(() => {
    if (ans.currentCurrency && ans.currentCurrencyIsCorrect) {
      setBaseCurrency(ans);
    }
  }, [ans.currentCurrency]);

  const [rates] = useData(baseCurrency);

  useEffect(() => {
    if (Object.keys(rates).length > 0) {
      // console.log(rates);
      setCurrentRates(rates);
    }
  }, [rates]);

  useEffect(() => {
    if (Object.keys(currentRates).length > 0) {
      console.log(currentRates);
      setCurrentRates(rates);
    }
  }, [currentRates]);
  
  const onChange = (event) => {
    const { target } = event;
    let { value, name } = target;
    value = value.toUpperCase();
    if (value.length > 12) {
      return;
    }
    setData(oldData => ({
      ...oldData,
      [name]: value
    }));
  }

  return (
    <section>
      <div className="current-rates__fields">
        <label className="current-rates__label">Базовая валюта
          <div className="input-wrapper">
            <input type="text" name="currentCurrency" className={"current-rates__field" + (ans.currentCurrencyIsCorrect ? "" : " incorrect")} value={data.currentCurrency} onChange={onChange} />
            <ListCurrency callback={(currency) => setData(oldData => ({ ...oldData, currentCurrency: currency }))} />
          </div>
        </label>
        <div className="current-rates__list_wrapper">
          <h3 className="current-rates__label">Курс валют{ans.currentCurrencyIsCorrect}</h3>
          <ul className="current-rates__list">{Object.keys(currentRates).map( 
          (item, idx) => <RatesListItem
            key={idx}
            currency={item}
            rate={currentRates.item}
            base={ans.currentCurrencyIsCorrect ? data.currentCurrency : ""}
          />
        )}
        </ul>
        </div>
      </div>
    </section>
  );
}