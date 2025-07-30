import { useEffect, useState } from "react";
// import reactLogo from "./assets/react.svg";
// import "./styles.css";
import CurrencyInput from "./components/CurrencyInput";
import ExchangeHouseCard from "./components/ExchangeHouseCard";
import SummaryCard from "./components/SummaryCard";
import RateTypeSelector from "./components/RateTypeSelector";
import ThemeToggle from "./components/ThemeToggle";
import currencyData from "./js/currencyList";
import SkeletonCard from "./components/SkeletonCard";

function App() {
  const [amount, setAmount] = useState(100);
  const [isLoading, setIsLoading] = useState(false);
  const [fromCurrency] = useState("AED");
  const [toCurrency, setToCurrency] = useState("INR");
  const [rateType, setRateType] = useState("buy");
  const [result, setResult] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [optimalHouse, setOptimalHouse] = useState(null);

  const handleClear = () => {
    setResult([]);
    setOptimalHouse(null);
    setAmount(100);
    setToCurrency("INR");
    setLastUpdated(new Date());
  };

  useEffect(() => {
    if (!result || result.length === 0) return;

    // Filter out houses with no valid rate
    const validHouses = result.filter(
      (house) => house.rate !== null && house.rate !== undefined
    );

    if (validHouses.length === 0) {
      setOptimalHouse(null);
      return;
    }

    let optimal = null;

    if (rateType === "buy") {
      // Max rate for buying
      optimal = validHouses.reduce((prev, curr) =>
        curr.rate > prev.rate ? curr : prev
      );
    } else if (rateType === "sell") {
      // Min rate for selling
      optimal = validHouses.reduce((prev, curr) =>
        curr.rate < prev.rate ? curr : prev
      );
    } else if (rateType === "transfer") {
      // For transfers (assuming you have a fee field)
      optimal = validHouses.reduce((prev, curr) => {
        const prevEffective = prev.rate + (prev.fee || 0);
        const currEffective = curr.rate + (curr.fee || 0);
        return currEffective < prevEffective ? curr : prev;
      });
    }

    setOptimalHouse(optimal);
  }, [result]);

  // Toggle dark mode
  // const toggleDarkMode = () => {
  //   setDarkMode(!darkMode);
  //   document.documentElement.setAttribute(
  //     "data-theme",
  //     darkMode ? "light" : "dark"
  //   );
  // };

  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      const newMode = !prev;
      document.documentElement.classList.toggle("dark", newMode);
      return newMode;
    });
  };

  // Format time
  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const handleRefreshRates = () => {
    // fetch fresh rates
    setOptimalHouse(null);

    handleCheckRates();
    setLastUpdated(new Date());
  };

  const handleCheckRates = async () => {
    setIsLoading(true);
    setResult([]);
    setOptimalHouse(null);

    try {
      const res = await fetch(
        `http://localhost:5000/api/rates?currency=${toCurrency}&type=${rateType}`
      );

      const data = await res.json();
      setResult(data);
      setIsLoading(false);
    } catch (e) {
      console.error("Error fetching rates:", e);
    }
  };

  return (
    <div
      className="p-2 min-h-screen w-[500px]  "
      data-theme={darkMode ? "dark" : "light"}
    >
      {/* <div className="max-w-md mx-auto border"> */}
      {/* <div className=" mx-auto"> */}
      <div className="card bg-base-100  shadow-xl overflow-hidden">
        <div className="absolute top-4 right-4">
          <ThemeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        </div>

        <div className="card-body   -space-y-2 ">
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
            amount={Number(
              (amount * (optimalHouse ? optimalHouse.rate : 0)).toFixed(2)
            )}
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
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
              />
            </div>
            <button
              className={`btn btn-sm text-sm btn-primary px-6 ${
                isLoading ? "btn-disabled" : ""
              }`}
              onClick={handleCheckRates}
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Find Rates"}
            </button>
          </div>

          <div className="mt-6">
            {isLoading && (
              <h2 className="text-base text-primary font-semibold mb-3 ">
                Rates Comparison
              </h2>
            )}
            <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
              {isLoading
                ? [1, 2, 3].map((_, i) => <SkeletonCard key={i} />)
                : result.map((house) => {
                    const rate = house.rate;
                    const convertedAmount = amount * rate;
                    const isOptimal =
                      optimalHouse && optimalHouse.id === house.id;
                    const difference =
                      isOptimal || !optimalHouse
                        ? 0
                        : amount * (optimalHouse.rate - rate);

                    return (
                      <ExchangeHouseCard
                        key={house.id}
                        houseInfo={house}
                        convertedAmount={convertedAmount}
                        isOptimal={isOptimal}
                        difference={difference.toFixed(2)}
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
              convertedAmount={amount * optimalHouse.rate}
              fromCurrency={fromCurrency}
              toCurrency={toCurrency}
            />
          )}

          <div className="flex justify-between items-center text-sm mt-3  px-2">
            <div className="text-gray-500 text-xs">
              {result.length > 0 && `Last updated: ${formatTime(lastUpdated)}`}
            </div>

            <div>
              <button
                className="btn btn-xs btn-outline btn-primary"
                onClick={handleRefreshRates}
              >
                Refresh Rates
              </button>{" "}
              <button
                className="btn btn-xs btn-outline btn-error hover:text-white"
                onClick={handleClear}
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}
    </div>
  );
}

export default App;
