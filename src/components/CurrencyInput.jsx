import React from "react";

const CurrencyInput = ({
  label,
  amount,
  onAmountChange,
  currency,
  onCurrencyChange,
  currencies,
  disabled = false,
}) => {
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
        <input
          type="number"
          className="join-item input input-bordered input-sm w-full font-semibold text-sm border-gray-200"
          placeholder="0.00"
          value={amount}
          onChange={(e) => onAmountChange(e.target.value)}
          disabled={disabled}
        />
      </div>
    </div>
  );
};

export default CurrencyInput;
