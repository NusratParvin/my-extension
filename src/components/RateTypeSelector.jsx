import React from "react";

const RateTypeSelector = ({ rateType, setRateType }) => {
  return (
    <div className="my-4 flex flex-row justify-between gap-2 items-center">
      <label className="text-sm font-medium text-primary">Rate Type :</label>
      <div className="join">
        {["buy", "sell", "transfer"].map((type) => (
          <button
            key={type}
            className={`join-item btn btn-md text-xs ${
              rateType === type ? "btn-active" : ""
            } capitalize`}
            onClick={() => setRateType(type)}
          >
            {type} Rates
          </button>
        ))}
      </div>
    </div>
  );
};

export default RateTypeSelector;
