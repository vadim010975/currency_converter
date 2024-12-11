import "./App.css";
import { useState, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./app/Layout";
import Converter from "./pages/Converter/Converter";
import CurrentRates from "./pages/CurrentRates/CurrentRates";
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
        Component: Converter,
      }
    ],
  },
],
  {
    future: {
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_relativeSplatPath: true,
      v7_skipActionErrorRevalidation: true,
      v7_startTransition: true,
    }
  }
);

export default function App() {
  const [page, setPage] = useState(location.pathname === "/rates.html" ? "last" : "first");
  const [list, setList] = useState([]);
  const [amount, setAmount] = useState(0);
  const [currentCurrency, setCurrentCurrency] = useState("RUB");
  const [requiredCurrency, setRequiredCurrency] = useState("USD");
  const [ans, setAns] = useState({
    amount: 0,
    amountIsCorrect: true,
    currentCurrency: "RUB",
    currentCurrencyIsCorrect: true,
    requiredCurrency: "USD",
    requiredCurrencyIsCorrect: true,
    result: null,
  });

  useEffect(() => {
    fetch("https://www.cbr-xml-daily.ru/latest.js").then(resolve => {
      resolve.json().then(resolve => {
        /*global fx*/
        /*eslint no-undef: "error"*/
        fx.base = "RUB";
        fx.rates = { RUB: 1, ...resolve.rates };
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
        if (String(result).length > 14) {
          result = +String(result).slice(0, 14);
        }
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
      <CurrencyContext.Provider value={{
        list, setAmount, setCurrentCurrency, setRequiredCurrency, ans
      }}>
        <PageContext.Provider value={{ page, setPage }}>
          <RouterProvider
            future={{ v7_startTransition: true, }}
            router={router} />
        </PageContext.Provider>
      </CurrencyContext.Provider>
    </>
  );
}
