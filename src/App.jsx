import "./App.css";
import { useState, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./app/Layout";
import Converter from "./pages/Converter/Converter";
import CurrentRates from "./pages/CurrentRates/CurrentRates";
import ErrorComponent from "./widgets/ErrorComponent/ErrorComponent";
import PageContext from "./contexts/PageContext";
import CurrencyContext from "./contexts/CurrencyContext";
import checkData from "./service/checkData";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      {
        path: "/",
        Component: Converter,
      },
      {
        path: "/rates.html",
        Component: CurrentRates,
      },
      {
        path: "*",
        Component: ErrorComponent,
      }
    ],
  },
]);

export default function App() {
  const [ page, setPage ] = useState("first");
  const [ list, setList ] = useState([]);
  const [ amount, setAmount ] = useState(0);
  const [ currentCurrency, setCurrentCurrency ] = useState("RUB");
  const [ requiredCurrency, setRequiredCurrency ] = useState("USD");
  const [ ans, setAns ] = useState({
    amountIsCorrect: true,
    currentCurrencyIsCorrect: true,
    requiredCurrencyIsCorrect: true,
    result: null,
  });

  useEffect(() => {
    fetch("https://www.cbr-xml-daily.ru/latest.js").then(resolve => {
      resolve.json().then(resolve => {
        fx.base = "RUB";
        fx.rates = { ...resolve.rates, RUB: 1 };
        setList(Object.keys(fx.rates));
      });
    });
  }, []);

  useEffect(() => {
    if (Object.keys(fx.rates).length > 0 && fx.base && fx.base?.length > 0) {
      const report = checkData(amount, currentCurrency, requiredCurrency, fx.rates);
      let result;
      if (report.allIsCorrect) {
        result = convert(amount, currentCurrency, requiredCurrency);
        if (result === "0.00") {
          result = "";
        }
      } else {
        result = null;
      }
      setAns(oldAns => ({
        ...oldAns,
        amount,
        amountIsCorrect: report.amountIsCorrect,
        currentCurrency,
        currentCurrencyIsCorrect: report.currentCurrencyIsCorrect,
        requiredCurrency,
        requiredCurrencyIsCorrect: report.requiredCurrencyIsCorrect,
        result,
      }));
    }
  }, [amount, currentCurrency, requiredCurrency]);

  function convert(a, b, c) {
    return fx(a).from(b).to(c);
  }

  return (
    <>
      <CurrencyContext.Provider value = {{
        list, setAmount, setCurrentCurrency, setRequiredCurrency, ans
      }}>
        <PageContext.Provider value={{ page, setPage }}>
          <RouterProvider router={router} />
        </PageContext.Provider>
      </CurrencyContext.Provider>
    </>
  );
}
