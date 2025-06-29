import { useEffect, useState } from "react";
// import reactLogo from "./assets/react.svg";
// import "./styles.css";
import CurrencyInput from "./components/CurrencyInput";
import ExchangeHouseCard from "./components/ExchangeHouseCard";
import SummaryCard from "./components/SummaryCard";
import RateTypeSelector from "./components/RateTypeSelector";
import ThemeToggle from "./components/ThemeToggle";
import currencyData from "./js/currencyList";

function App() {
  // Exchange houses data
  const exchangeHouses = [
    {
      id: 1,
      name: "Al Ansari Exchange",
      rates: { buy: 22.61, sell: 22.5, transfer: 22.55 },
      color: "bg-gradient-to-r from-green-400 to-teal-500",
    },
    {
      id: 2,
      name: "UAE Exchange",
      rates: { buy: 22.57, sell: 22.46, transfer: 22.51 },
      color: "bg-gradient-to-r from-blue-500 to-indigo-600",
    },
    {
      id: 3,
      name: "Emirates NBD",
      rates: { buy: 22.52, sell: 22.41, transfer: 22.46 },
      color: "bg-gradient-to-r from-amber-500 to-orange-500",
    },
  ];

  // State
  const [amount, setAmount] = useState(1000);
  const [fromCurrency] = useState("AED");
  const [toCurrency, setToCurrency] = useState("INR");
  const [rateType, setRateType] = useState("buy");
  const [darkMode, setDarkMode] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [optimalHouse, setOptimalHouse] = useState(null);

  // Calculate optimal house
  useEffect(() => {
    let maxRate = 0;
    let optimal = null;

    exchangeHouses.forEach((house) => {
      const rate = house.rates[rateType];
      if (rate > maxRate) {
        maxRate = rate;
        optimal = house;
      }
    });

    setOptimalHouse(optimal);
  }, [rateType]);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.setAttribute(
      "data-theme",
      darkMode ? "light" : "dark"
    );
  };

  // Format time
  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  // Refresh rates
  const refreshRates = () => {
    // In a real app, this would fetch new rates
    setLastUpdated(new Date());
  };

  const handleCheckRates = async () => {
    console.log(toCurrency, rateType);
    try {
      const res = await fetch(
        `http://localhost:5000/api/rates?currency=${toCurrency}&type=${rateType}`
      );
      const data = await res.json();
      console.log("All Rates →", data.rates);
    } catch (e) {
      console.error("Error fetching rates:", e);
    }
  };

  return (
    <div
      className="p-2 min-h-screen w-[500px]"
      data-theme={darkMode ? "dark" : "light"}
    >
      {/* <div className="max-w-md mx-auto border"> */}
      <div className=" mx-auto ">
        <div className="card bg-base-100 shadow-xl overflow-hidden">
          <div className="absolute top-4 right-4">
            <ThemeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
          </div>

          <div className="card-body -space-y-2">
            <h1 className="card-title text-xl font-semibold text-cyan-500  ">
              Currency Converter
            </h1>
            <p className="text-gray-500 p-0 text-sm">
              Compare exchange rates instantly
            </p>

            <RateTypeSelector rateType={rateType} setRateType={setRateType} />

            {/* <CurrencyInput
              label="From Currency"
              amount={amount}
              onAmountChange={setAmount}
              currency={fromCurrency}
              currencies={currencies}
              disabled={true}
            /> */}

            <CurrencyInput
              label="Select Currency :"
              amount={
                amount * (optimalHouse ? optimalHouse.rates[rateType] : 22.61)
              }
              currency={toCurrency}
              onCurrencyChange={setToCurrency}
              currencies={currencyData}
              disabled={false}
            />

            <div className="flex flex-row gap-4 justify-between items-end">
              <div className="flex-1">
                <label className="block text-sm font-medium mb-1 text-primary">
                  Amount :
                </label>
                <input
                  type="number"
                  className="input validator input-sm border-gray-200 w-full py-0 text-sm"
                  required
                  placeholder="Enter amount"
                  title="Enter amount"
                  defaultValue={1}
                />
              </div>
              <button className="btn btn-primary" onClick={handleCheckRates}>
                Find Rates
              </button>
            </div>

            <div className="mt-6">
              <h2 className="text-lg text-primary font-semibold mb-3 ">
                Exchange Houses Comparison
              </h2>
              <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
                {exchangeHouses.map((house) => {
                  const rate = house.rates[rateType];
                  const convertedAmount = amount * rate;
                  const isOptimal =
                    optimalHouse && optimalHouse.id === house.id;
                  const difference =
                    isOptimal || !optimalHouse
                      ? 0
                      : amount * (optimalHouse.rates[rateType] - rate);

                  return (
                    <ExchangeHouseCard
                      key={house.id}
                      name={house.name}
                      rate={rate}
                      convertedAmount={convertedAmount}
                      isOptimal={isOptimal}
                      difference={difference.toFixed(0)}
                      color={house.color}
                    />
                  );
                })}
              </div>
            </div>

            {optimalHouse && (
              <SummaryCard
                optimalHouse={optimalHouse.name}
                amount={amount}
                convertedAmount={amount * optimalHouse.rates[rateType]}
                fromCurrency={fromCurrency}
                toCurrency={toCurrency}
              />
            )}

            <div className="flex justify-between items-center text-sm mt-3  px-2">
              <div className="text-gray-500 text-xs">
                Last updated: {formatTime(lastUpdated)}
              </div>
              <button
                className="btn btn-sm btn-outline btn-primary"
                onClick={refreshRates}
              >
                Refresh Rates
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
