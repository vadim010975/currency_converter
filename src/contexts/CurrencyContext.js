import { createContext } from "react";

const CurrencyContext = createContext({
  list: [],
  ans: {
    amount: 0,
    amountIsCorrect: true,
    currentCurrency: "RUB",
    currentCurrencyIsCorrect: true,
    requiredCurrency: "USD",
    requiredCurrencyIsCorrect: true,
    result: null,
  }
});
export default CurrencyContext;