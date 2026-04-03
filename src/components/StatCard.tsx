import React, { type ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  isPositive?: boolean;
  statusText?: string;
  icon?: ReactNode;
  iconBg?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  isPositive = true,
  statusText,
  icon,
  iconBg = "bg-green-100",
}) => {
  return (
    <div className="bg-white md:px-4 px-2 md:py-2 py-2  rounded-[14px] border-[0.8px] border-[#0000001A] transition-shadow max-w-md min-w-fit">
      <div className="flex items-center">
        <div>
          <p className="text-sm text-(--dark-font-color) font-normal mb-1">
            {title}
          </p>
          <h3 className="md:text-3xl text-xl font-normal text-(--dark-font-color)">
            {value}
          </h3>
        </div>
        {icon && (
          <div
            className={`rounded-[10px] ml-auto ${iconBg} h-10 w-10 flex items-center justify-center`}
          >
            {typeof icon === "string" ? <img src={icon} alt="icon" /> : icon}
          </div>
        )}
      </div>
      <div className="flex items-center flex-wrap mt-1">
        <span
          className={`text-xs font-normal ${isPositive ? "text-(--dark-green)" : "text-(--dark-red)"}`}
        >
          {change}
        </span>
        {statusText && (
          <span className="text-xs text-gray-400 ml-2">{statusText}</span>
        )}
      </div>
    </div>
  );
};

export default StatCard;
