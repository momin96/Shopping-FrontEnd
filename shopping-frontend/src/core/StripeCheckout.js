import React, { useState } from "react";
import ReactStripeCheckout from 'react-stripe-checkout'
import { BASEURL } from "../constants";

import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import { loadCart, performEmptyCart } from "./helper/CartHelper";
import { createOrder } from './helper/OrderHelper'

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


  const authToken = isAuthenticated() && isAuthenticated().token

  const getFinalAmount = () => {
    let amount = products.reduce((currentValue, product) => {
      return currentValue + product.price;
    }, 0);
    return amount;
  };

  const makePayment = (token) => {
    const body = {
      token,
      products
    }

    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    }

    return fetch(`${BASEURL}/payment`, {
      method: "POST",
      headers,
      body: JSON.stringify(body)
    }).then(response => {
      console.log("PAYMENT SUCCESS ", response);

      const { status } = response;
      console.log("STATUS ", status);
      if (status === 200) {
        // Clear cart & perform force reload
        performEmptyCart(() => {
          setReload(!reload)
        })
      }


      //TODO: Create order
      //  then clear cart
    }).catch(error => {
      console.log("PAYMENT EROOR ", error);

    })
  }
  //  REACT_APP_BACKEND;

  const showStripeButton = () => {
    return isAuthenticated() ? (
      <ReactStripeCheckout
        stripeKey={`${process.env.REACT_APP_PUBLIC_KEY}`}
        token={makePayment}
        amount={getFinalAmount() * 100}
        name="Buy Here"
      // shippingAddress
      // billingAddress
      >
        <button className="btn btn-success">Pay with Stripe </button>
      </ReactStripeCheckout>
    ) : (
        <Link to="/signin">
          <button className="btn btn-warning"> Signin </button>
        </Link>
      );
  };

  const errorMessage = () => { };

  return (
    <div>
      <h3 className="text-white"> Stripe checkout {getFinalAmount()}</h3>
      {showStripeButton()}
    </div>
  );
};

export default StripeCheckout;
