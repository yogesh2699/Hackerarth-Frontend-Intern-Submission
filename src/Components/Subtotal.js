import React from "react";
import { connect } from "react-redux";
import CurrencyFormat from "react-currency-format";
function Subtotal({ amount, total, discount, typedDiscount }) {
  return (
    <div className="subtotal">
      <CurrencyFormat
        renderText={(value) => (
          <>
            <div className="order__info">
              <h3 style={{ marginTop: "10px" }}>Total</h3>
              <p style={{ marginTop: "10px" }}>
                Items ({amount}): ${total}
              </p>
              <p style={{ marginTop: "10px" }}>Discount: -${discount}</p>
              <p>Type Discount: -${typedDiscount}</p>
            </div>

            <div className="order__total">
              <p>Order total </p>
              <strong>{value}</strong>
            </div>
          </>
        )}
        decimalScale={2}
        value={total - discount - typedDiscount}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
      />
    </div>
  );
}

const mapStateToProps = (store) => {
  const { amount, total, discount, typedDiscount } = store;
  return { amount, total, discount, typedDiscount };
};

export default connect(mapStateToProps)(Subtotal);
