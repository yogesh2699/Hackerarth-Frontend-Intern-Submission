import React from "react";
import { connect } from "react-redux";
import CloseIcon from "@material-ui/icons/Close";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import { DECREASE, INCREASE, REMOVE, TOGGLE_AMOUNT } from "../actions";

function CheckoutProduct({ name, price, img_url, amount, remove, toggle }) {
  return (
    <div className="checkout__product">
      <div className="checkout__productInfo">
        <div className="checkout__productInfoVal">
          <img src={img_url} alt={name} />
          <h4>{name}</h4>
        </div>
        <CloseIcon onClick={() => remove()} />
      </div>

      <div className="qtn">
        <RemoveIcon
          onClick={() => {
            if (amount === 1) {
              return remove();
            } else {
              toggle("dec");
            }
          }}
        />
        <div className="qtn__val">
          <p>{amount}</p>
        </div>
        <AddIcon onClick={() => toggle("inc")} />
      </div>

      <div className="price">
        <strong>${price}</strong>
      </div>
    </div>
  );
}
const mapDispatchToProps = (dispatch, ownProps) => {
  const { name, id, amount } = ownProps;
  return {
    remove: () => dispatch({ type: REMOVE, payload: { id, name } }),
    increase: () => dispatch({ type: INCREASE, payload: { id } }),
    decrease: () => dispatch({ type: DECREASE, payload: { id, amount } }),
    toggle: (toggle) =>
      dispatch({ type: TOGGLE_AMOUNT, payload: { id, toggle } }),
  };
};

export default connect(null, mapDispatchToProps)(CheckoutProduct);
