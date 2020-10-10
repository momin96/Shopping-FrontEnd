import React, { useEffect, useState } from "react";
import "../styles.css";
import Base from "./Base";
import Card from "./Card";
import { loadCart } from "./helper/CartHelper";
import StripeCheckout from "./StripeCheckout";

const Cart = () => {
  const [products, setProducts] = useState([]);

  // Forcing reloading of View
  const [reload, setReload] = useState(false);

  useEffect(() => {
    setProducts(loadCart());
  }, [reload]);

  const loadAllProduct = () => {
    return (
      <div>
        <h2> For loading products</h2>
        {products.map((product, index) => {
          return (
            <div key={index}>
              <Card
                product={product}
                addToCart={false}
                removeFromCart={true}
                setReload={setReload}
                reload={reload}
              />
            </div>
          );
        })}
      </div>
    );
  };

  const loadCheckout = () => {
    return (
      <StripeCheckout
        products={products}
        setReload={setReload}
        reload={reload}
      />
    );
  };

  return (
    <Base title="Cart" description="Procced For Checkout">
      <div className="row text-center">
        <div className="row text-center">
          <div className="col-8">{loadAllProduct()}</div>
          <div className="col-4">{loadCheckout()}</div>
        </div>
      </div>
    </Base>
  );
};

export default Cart;
