import { useState, useEffect, useCallback } from "react";
import { getMoedas } from "../service/moedaService";

interface ExchangeRate {
  [key: string]: number;
}

export default function CurrencyExchange() {
  const [amount1, setAmount1] = useState<string>("1");
  const [currency1, setCurrency1] = useState<string>("USD");
  const [amount2, setAmount2] = useState<string>("0");
  const [currency2, setCurrency2] = useState<string>("BRL");
  const [exchangeRates, setExchangeRates] = useState<ExchangeRate>({
    USD: 1,
    EUR: 0.92,
    GBP: 0.79,
    JPY: 151.77,
    CAD: 1.36,
    AUD: 1.52,
    CNY: 7.23,
    INR: 83.1,
    BRL: 6.04,
    MXN: 16.73,
  });

  const convertCurrency = useCallback(() => {
    if (!amount1 || isNaN(Number(amount1))) {
      setAmount2("0");
      return;
    }
    const rate1 = exchangeRates[currency1] || 1;
    const rate2 = exchangeRates[currency2] || 1;
    const result = (Number(amount1) * rate2) / rate1;
    setAmount2(result.toFixed(2));
    getMoedas()
        .then(data => console.log(data));
  }, [amount1, currency1, currency2, exchangeRates]);

  const reverseConvertCurrency = () => {
    if (!amount2 || isNaN(Number(amount2))) {
      setAmount1("0");
      return;
    }
    const rate1 = exchangeRates[currency1] || 1;
    const rate2 = exchangeRates[currency2] || 1;
    const result = (Number(amount2) * rate1) / rate2;
    setAmount1(result.toFixed(2));
  };

  useEffect(() => {
    convertCurrency();
  }, [convertCurrency]);

  const getExchangeRateText = () => {
    const rate1 = exchangeRates[currency1] || 1;
    const rate2 = exchangeRates[currency2] || 1;
    const rate = rate2 / rate1;
    return `1 ${currency1} = ${rate.toFixed(2)} ${currency2}`;
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white shadow-md rounded-lg p-6">
      <div className="text-center text-xl font-semibold">Currency Exchange</div>

      <div className="space-y-6 mt-4">
        {/* Primeiro valor */}
        <div>
          <label htmlFor="amount1" className="block text-sm font-medium text-gray-700">
            Amount
          </label>
          <input
            id="amount1"
            type="number"
            value={amount1}
            onChange={(e) => setAmount1(e.target.value)}
            onBlur={convertCurrency}
            className="w-full mt-1 p-2 border rounded-md"
          />
        </div>

        {/* Seleção de moeda 1 */}
        <div>
          <label htmlFor="currency1" className="block text-sm font-medium text-gray-700">
            From Currency
          </label>
          <select
            id="currency1"
            value={currency1}
            onChange={(e) => setCurrency1(e.target.value)}
            className="w-full mt-1 p-2 border rounded-md"
          >
            {Object.keys(exchangeRates).map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </div>

        {/* Segundo valor */}
        <div>
          <label htmlFor="amount2" className="block text-sm font-medium text-gray-700">
            Converted Amount
          </label>
          <input
            id="amount2"
            type="number"
            value={amount2}
            onChange={(e) => setAmount2(e.target.value)}
            onBlur={reverseConvertCurrency}
            className="w-full mt-1 p-2 border rounded-md"
          />
        </div>

        {/* Seleção de moeda 2 */}
        <div>
          <label htmlFor="currency2" className="block text-sm font-medium text-gray-700">
            To Currency
          </label>
          <select
            id="currency2"
            value={currency2}
            onChange={(e) => setCurrency2(e.target.value)}
            className="w-full mt-1 p-2 border rounded-md"
          >
            {Object.keys(exchangeRates).map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Taxa de conversão */}
      <div className="text-center text-sm text-gray-500 mt-4">{getExchangeRateText()}</div>
    </div>
  );
}
