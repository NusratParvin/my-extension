import { useEffect, useState } from "react";
// import reactLogo from "./assets/react.svg";
// import "./styles.css";
import CurrencyInput from "./components/CurrencyInput";
import ExchangeHouseCard from "./components/ExchangeHouseCard";
import SummaryCard from "./components/SummaryCard";
import RateTypeSelector from "./components/RateTypeSelector";
import ThemeToggle from "./components/ThemeToggle";

// function App() {
//   const [count, setCount] = useState(0);

//   return (
//     <>
//       <div>
//         <h1 class="text-3xl font-bold underline">Hello world!</h1>
//         <button className="btn btn-success">Success</button>

//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   );
// }

function App() {
  // Currencies data
  const currencies = [
    { code: "AED", name: "UAE Dirham" },
    { code: "USD", name: "US Dollar" },
    { code: "EUR", name: "Euro" },
    { code: "GBP", name: "British Pound" },
    { code: "INR", name: "Indian Rupee" },
    { code: "CAD", name: "Canadian Dollar" },
    { code: "AUD", name: "Australian Dollar" },
    { code: "JPY", name: "Japanese Yen" },
  ];

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
              currencies={currencies}
              disabled={false}
            />

            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text text-primary font-medium">
                  Amount
                </span>
              </label>
              <input
                type="number"
                className="input input-bordered w-full"
                required
                placeholder="Enter amount"
                title="Enter amount"
                min="0"
              />
            </div>

            <div className="mt-6">
              <h2 className="text-lg font-semibold mb-3">
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

            <div className="flex justify-between items-center text-sm mt-4">
              <div className="text-gray-500">
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
