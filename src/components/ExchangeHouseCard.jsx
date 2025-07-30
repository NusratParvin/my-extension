import React from "react";
import { FaCheck } from "react-icons/fa";

import alfardanLogo from "../assets/logos/alfardan.png";
import luluLogo from "../assets/logos/lulu.png";
// import alansariLogo from "../assets/logos/alansari.png";

const logoMap = {
  "Al Fardan Exchange": alfardanLogo,
  "Lulu Exchange": luluLogo,
  // "Al Ansari Exchange": alansariLogo,
};

const ExchangeHouseCard = ({
  houseInfo,
  convertedAmount,
  isOptimal,
  difference,
  // color,
}) => {
  const logo = logoMap[houseInfo?.houseName] || null;

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
            <div className="flex items-center">
              {logo ? (
                <div className="w-8 h-8 rounded-full overflow-hidden bg-base-100">
                  <img
                    src={logo}
                    alt={houseInfo?.houseName}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="w-7 h-7 bg-gray-300 rounded-full" />
              )}
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
