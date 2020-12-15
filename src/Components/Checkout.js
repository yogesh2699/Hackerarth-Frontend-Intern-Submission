import React from "react";
import { connect } from "react-redux";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import CheckoutProduct from "./CheckoutProduct";
import Subtotal from "./Subtotal";
import { GET_TOTALS, RESTORE } from "../actions";
function Checkout({ cart = [], dispatch }) {
  React.useEffect(() => {
    dispatch({ type: GET_TOTALS }, [cart, dispatch]);
  });
  if (cart.length === 0) {
    return (
      <div>
        <h1>Cart is Empty</h1>
        <button onClick={() => dispatch({ type: RESTORE })}>Restore</button>
      </div>
    );
  }
  return (
    <>
      <div className="checkout__title">
        <ArrowBackIosIcon />
        <h1>Order Summary</h1>
      </div>
      <div className="checkout">
        <div className="checkout__left">
          <hr />
          <div className="items__info">
            <p className="items__infoItemCount">Items({cart.length})</p>
            <p className="items__infoQty">Qty</p>
            <p className="items__infoPrice">Price</p>
          </div>
          <hr style={{ marginBottom: "20px" }} />
          {cart.map((item) => {
            return <CheckoutProduct key={item.id} {...item} />;
          })}
        </div>

        <div className="checkout__right">
          <Subtotal />
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (store) => {
  const { cart } = store;
  return { cart };
};

export default connect(mapStateToProps)(Checkout);
