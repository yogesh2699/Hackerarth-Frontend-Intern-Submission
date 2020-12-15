import { GET_TOTALS, REMOVE, RESTORE, TOGGLE_AMOUNT } from "./actions";
import Swal from "sweetalert2";

import cartItems from "./cart-items";

const initialStore = {
  cart: cartItems,
  total: 0,
  amount: 0,
  discount: 0,
  typedDiscount: 0,
};

//reducer
function reducer(state = initialStore, action) {
  if (action.type === REMOVE) {
    Swal.fire({
      position: "top",
      icon: "success",
      title: `${action.payload.name} is removed!`,
      showConfirmButton: false,
      timer: 1000,
    });
    return {
      ...state,
      cart: state.cart.filter((cartItem) => cartItem.id !== action.payload.id),
    };
  }

  if (action.type === GET_TOTALS) {
    let { total, amount, discount, typedDiscount } = state.cart.reduce(
      (cartTotal, cartItem) => {
        const { price, amount, discount, type } = cartItem;
        const itemTotal = price * amount;
        if (type === "fiction") {
          const tDiscount = Math.round((itemTotal * 15) / 100);
          cartTotal.typedDiscount += tDiscount;
        }
        const itemDiscount = discount * amount;
        cartTotal.total += itemTotal;
        cartTotal.amount += amount;
        cartTotal.discount += itemDiscount;
        return cartTotal;
      },
      {
        total: 0,
        amount: 0,
        discount: 0,
        typedDiscount: 0,
      }
    );
    total = parseFloat(total.toFixed(2));
    return { ...state, total, amount, discount, typedDiscount };
  }

  if (action.type === TOGGLE_AMOUNT) {
    return {
      ...state,
      cart: state.cart.map((cartItem) => {
        if (cartItem.id === action.payload.id) {
          if (action.payload.toggle === "inc") {
            return (cartItem = { ...cartItem, amount: cartItem.amount + 1 });
          }
          if (action.payload.toggle === "dec") {
            return (cartItem = { ...cartItem, amount: cartItem.amount - 1 });
          }
        }

        return cartItem;
      }),
    };
  }

  if (action.type === RESTORE) {
    return {
      cart: cartItems,
      amount: 0,
      total: 0,
    };
  }

  return state;
}

export default reducer;
