export default function checkData(amount, currentCurrency, requiredCurrency, rates) {
  const ans = {};
  ans.amountIsCorrect = amount && Number.isFinite(+amount);
  ans.currentCurrencyIsCorrect = Object.keys(rates).includes(currentCurrency) ? true : false;
  ans.requiredCurrencyIsCorrect = Object.keys(rates).includes(requiredCurrency) ? true : false;
  ans.allIsCorrect = ans.amountIsCorrect && ans.currentCurrencyIsCorrect && ans.requiredCurrencyIsCorrect;
  return ans;
}