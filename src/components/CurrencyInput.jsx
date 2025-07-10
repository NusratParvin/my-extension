import React from "react";

const CurrencyInput = ({
  label,
  amount,
  onAmountChange,
  currency,
  onCurrencyChange,
  currencies,
  disabled = true,
}) => {
  console.log(amount);

  return (
    <div className="mb-1 -mt-3">
      <label className="block text-sm font-medium mb-1 text-primary">
        {label}
      </label>
      <div className="join w-full ">
        {onCurrencyChange ? (
          <select
            className="join-item select select-bordered select-sm border-gray-200 bg-gray-50 min-w-[150px] py-0 text-blue-500 font-semibold"
            value={currency}
            onChange={(e) => onCurrencyChange(e.target.value)}
            disabled={disabled}
          >
            {currencies.map((curr) => (
              // <option key={curr.code} value={`${curr.code}-${curr.name}`}>
              <option key={curr.code} value={curr.code}>
                {curr.code} - {curr.name}
              </option>
            ))}
          </select>
        ) : (
          <div className="join-item bg-base-200 px-4 py-2 flex items-center   ">
            <span className="font-medium">{currency}</span>
          </div>
        )}
        <div className="flex items-center gap-2 border border-gray-200 rounded-e-md border-s-0 px-2 py-1">
          <input
            className="w-full font-semibold text-sm focus:outline-none focus:ring-0 focus:border-none"
            placeholder="0.00"
            value={amount}
            onChange={(e) => onAmountChange(e.target.value)}
            disabled={disabled}
          />
          <span className="text-sm font-medium text-gray-400">AED</span>
        </div>
      </div>
    </div>
  );
};

export default CurrencyInput;
