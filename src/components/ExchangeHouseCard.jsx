import React from "react";
import { FaCheck } from "react-icons/fa";

const ExchangeHouseCard = ({
  name,
  rate,
  convertedAmount,
  isOptimal,
  difference,
  color,
}) => {
  return (
    <div
      className={`card card-compact bg-base-100 shadow-md mb-3 border ${
        isOptimal ? "border-green-500" : "border-base-300"
      }`}
    >
      <div className="card-body">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className={`avatar placeholder ${color}`}>
              <div className="bg-neutral text-neutral-content rounded-full w-10 h-10">
                <span className="text-sm">{name.charAt(0)}</span>
              </div>
            </div>
            <div className="ml-3">
              <h3 className="font-bold">{name}</h3>
              <p className="text-sm text-gray-500">1 AED = {rate} INR (Buy)</p>
            </div>
          </div>
          <div className="text-right">
            {isOptimal && (
              <div className="badge badge-success gap-2 mb-1">
                <FaCheck /> Optimal
              </div>
            )}
            <div className="font-bold text-lg">
              INR {convertedAmount.toLocaleString()}
            </div>
            {!isOptimal && difference && (
              <div className="text-xs text-red-500">-INR {difference}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExchangeHouseCard;
