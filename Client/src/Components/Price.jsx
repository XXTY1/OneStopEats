import React from "react";

const Price = ({ price, locale = "en-IN", currency = "INR" }) => {
  const formatPrice = () => {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
    }).format(price);
  };
  return <span>{formatPrice()}</span>;
};

export default Price;
