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
const useData = () => {

  const { list, setAmount, setCurrentCurrency, setRequiredCurrency, ans } = useContext(CurrencyContext);
  const [base, setBase] = useState({ currentCurrency: "RUB" });
  const [currentList, setCurrentList] = useState(list);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [rates, setRates] = useState(null);
  const [allRates, setAllRates] = useState(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const step = () => {
    setParam(currentList[currentIdx]);
  }

  const setParam = (ReqCurrency) => {
    setAmount("1");
    setCurrentCurrency(ans.currentCurrency);
    setRequiredCurrency(ReqCurrency);
  }

  useEffect(() => {
    if (ans.currentCurrency && ans.currentCurrencyIsCorrect) {
      setBase(ans);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps  
  }, [ans.currentCurrency, ]);

  useEffect(() => {
    if (list?.length > 0) {
      setCurrentList(list.filter(item => item !== ans.currentCurrency));
      setRates(null);
      setCurrentIdx(0);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps  
  }, [list, base]);

  useEffect(() => {
    if (currentList?.length > 0) {
      if (currentIdx < currentList.length) {
        step();
      } else {
        setAmount(null);
      }
    }
  }, [currentIdx, currentList, setAmount, step]);

  useEffect(() => {
    if (ans.result) {
      setRates(oldRates => ({ ...oldRates, [currentList[currentIdx]]: ans.result }));
      (async () => {
        await sleep(2);
        setCurrentIdx(currentIdx + 1);
      })();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ans.result]);

  useEffect(() => {
    if (rates && Object.keys(rates).length >= currentList.length) {
      setAllRates(rates);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rates]);

  return [allRates];
}
/***************************************************************/

export default function CurrentRates() {
  const { setCurrentCurrency, ans } = useContext(CurrencyContext);

  const [data, setData] = useState({
    currentCurrency: "RUB",
  });

  useEffect(() => {
    setCurrentCurrency(data.currentCurrency);
  }, [data.currentCurrency, setCurrentCurrency]);

  const [rat] = useData();

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
          <h3 className="current-rates__label">Курсы валют{ans.currentCurrencyIsCorrect}</h3>
          {rat &&
            <ul className="current-rates__list">
              {Object.keys(rat).map(
                (item, idx) =>
                  <RatesListItem
                    key={idx}
                    currency={item}
                    rate={rat[item]}
                  />
              )}
            </ul>}
        </div>
      </div>
    </section>
  );
}