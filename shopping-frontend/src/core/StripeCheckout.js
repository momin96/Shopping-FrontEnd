import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import { loadCart, performEmptyCart } from "./helper/CartHelper";

const StripeCheckout = ({
  products,
  setReload = (f) => f,
  reload = undefined,
}) => {
  const [data, setData] = useState({
    loading: false,
    success: false,
    error: "",
    address: "",
  });

  const { token, user } = isAuthenticated();

  const getFinalAmount = () => {
    let amount = products.reduce((currentValue, product) => {
      return currentValue + product.price;
    }, 0);

    // products.map((p) => {
    //   amount += p.price;
    // });
    return amount;
  };

  const showStripeButton = () => {
    return isAuthenticated() ? (
      <button className="btn btn-success">Pay with Stripe </button>
    ) : (
      <Link to="/signin">
        <button className="btn btn-warning"> Signin </button>
      </Link>
    );
  };

  const errorMessage = () => {};

  return (
    <div>
      <h3 className="text-white"> Stripe checkout {getFinalAmount()}</h3>
      {showStripeButton()}
    </div>
  );
};

export default StripeCheckout;
