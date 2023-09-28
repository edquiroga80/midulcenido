export const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

export const updateCart = (state) => {
  // Calcular el precio de cada item
  state.itemsPrice = addDecimals(
    state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );

  // Calcular el precio de envio
  state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10);

  // Calcular el precio del impuesto (21%)
  state.taxPrice = addDecimals(Number((0.21 * state.itemsPrice).toFixed(2)));

  // Calcular el precio del total
  state.totalPrice = (
    Number(state.itemsPrice) +
    Number(state.shippingPrice) +
    Number(state.taxPrice)
  ).toFixed(2);

  localStorage.setItem("cart", JSON.stringify(state));

  return state;
};
