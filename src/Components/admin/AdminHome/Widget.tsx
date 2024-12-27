import React from "react";
import {
  AccountBalanceWalletOutlined,
  KeyboardArrowUp,
  MonetizationOnOutlined,
  PersonOutlined,
  ShoppingCartOutlined,
} from "@mui/icons-material";

// Define the types for the props
interface WidgetProps {
  type: "user" | "order" | "earning" | "balance"; // Possible types
}

const Widget: React.FC<WidgetProps> = ({ type }) => {
  let data;

  // Temporary values
  const amount = 100;
  const diff = 20;

  // Switch case based on the 'type' prop to handle the data and icons
  switch (type) {
    case "user":
      data = {
        title: "USERS",
        isMoney: false,
        link: "See all users",
        icon: (
          <PersonOutlined className="text-crimson bg-red-200 p-2 rounded-md text-lg" />
        ),
      };
      break;

    case "order":
      data = {
        title: "ORDERS",
        isMoney: false,
        link: "View All Orders",
        icon: (
          <ShoppingCartOutlined className="text-goldenrod bg-yellow-100 p-2 rounded-md text-lg" />
        ),
      };
      break;

    case "earning":
      data = {
        title: "EARNINGS",
        isMoney: true,
        link: "View net earnings",
        icon: (
          <MonetizationOnOutlined className="text-green-600 bg-green-200 p-2 rounded-md text-lg" />
        ),
      };
      break;

    case "balance":
      data = {
        title: "BALANCE",
        isMoney: true,
        link: "See details",
        icon: (
          <AccountBalanceWalletOutlined className="text-purple-600 bg-purple-200 p-2 rounded-md text-lg" />
        ),
      };
      break;

    default:
      break;
  }

  return (
    <div className="flex justify-between p-4 shadow-md rounded-lg bg-white h-24">
      <div className="flex flex-col justify-between">
        <span className="text-gray-500 font-semibold text-sm">{data?.title}</span>
        <span className="text-2xl font-light">
          {data?.isMoney && "₹"} {amount}
        </span>
        <span className="text-xs text-blue-500 underline cursor-pointer">
          {data?.link}
        </span>
      </div>
      <div className="flex flex-col items-end justify-between">
        <div
          className={`flex items-center text-sm ${
            diff > 0 ? "text-green-500" : "text-red-500"
          }`}
        >
          <KeyboardArrowUp />
          {diff}%
        </div>
        {data?.icon}
      </div>
    </div>
  );
};

export default Widget;
