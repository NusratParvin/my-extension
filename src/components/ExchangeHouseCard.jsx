import React from "react";
import { FaCheck } from "react-icons/fa";

const ExchangeHouseCard = ({
  houseInfo,
  convertedAmount,
  isOptimal,
  difference,
  color,
}) => {
  return (
    <div
      className={`card card-compact light:bg-base-100  dark:bg-gray-500/90 shadow-md mb-2 border ${
        isOptimal
          ? "border-green-300 dark:border-green-800"
          : "border-base-300 dark:border-gray-700"
      }`}
    >
      <div className="card-body p-3.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className={`avatar placeholder ${color}`}>
              <div className="bg-neutral text-neutral-content rounded-full w-7 h-7">
                <span className="text-sm">
                  {houseInfo?.houseName?.charAt(0)}
                </span>
              </div>
            </div>
            <div className="ml-3">
              <h3 className="font-bold">{houseInfo?.houseName}</h3>
              <p className="text-xs text-gray-500">
                {houseInfo?.rate === null
                  ? ` `
                  : `1 AED = ${houseInfo?.rate} ${
                      houseInfo?.currencyCode
                    } (${houseInfo?.rateType?.toUpperCase()})`}
              </p>
            </div>
          </div>

          {houseInfo?.rate === null ? (
            <span className="text-red-500 font-semibold text-xs">
              Rate Unavailable
            </span>
          ) : (
            <div className="text-right">
              {isOptimal && (
                <div className="badge badge-sm  text-white font-semibold  badge-success gap-1 mb-1">
                  <FaCheck /> Optimal
                </div>
              )}
              <div className="font-bold text-base">
                {houseInfo?.currencyCode} {convertedAmount.toLocaleString()}
              </div>
              {!isOptimal && difference && (
                <div className="text-xs text-red-500">
                  Difference: {houseInfo?.currencyCode} {difference}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExchangeHouseCard;
