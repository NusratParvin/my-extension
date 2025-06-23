import React from "react";
import { FaCheckCircle } from "react-icons/fa";

const SummaryCard = ({
  optimalHouse,
  amount,
  convertedAmount,
  fromCurrency,
  toCurrency,
}) => {
  return (
    <div className="card bg-base-200 border border-base-300 mb-4">
      <div className="card-body p-4">
        <div className="flex items-start">
          <FaCheckCircle className="text-green-500 text-xl mr-2 mt-1" />
          <div>
            <p className="font-medium">
              Optimal conversion:{" "}
              <span className="font-bold">{optimalHouse}</span> offers the best
              rate
            </p>
            <p className="mt-1">
              <span className="font-semibold">
                {fromCurrency} {amount.toLocaleString()}
              </span>{" "}
              =
              <span className="font-bold text-green-600">
                {" "}
                {toCurrency} {convertedAmount.toLocaleString()}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryCard;
