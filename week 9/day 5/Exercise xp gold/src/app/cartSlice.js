import { createSlice, createSelector } from "@reduxjs/toolkit";

const initialState = {
  products: [
    { id: 1, name: "Ceramic Pour-Over", category: "Kitchen", price: 28, color: "sage" },
    { id: 2, name: "Linen Market Tote", category: "Everyday", price: 24, color: "sand" },
    { id: 3, name: "Hand-poured Candle", category: "Home", price: 18, color: "clay" },
    { id: 4, name: "Stoneware Mug", category: "Kitchen", price: 22, color: "blue" },
    { id: 5, name: "Botanical Notebook", category: "Stationery", price: 16, color: "rose" },
    { id: 6, name: "Woven Desk Basket", category: "Home", price: 32, color: "ochre" },
  ],
  cart: [],
};

const cartSlice = createSlice({
  name: "shoppingCart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const product = state.products.find((item) => item.id === action.payload);
      if (!product) return;

      const cartItem = state.cart.find((item) => item.productId === product.id);
      if (cartItem) {
        cartItem.quantity += 1;
      } else {
        state.cart.push({ productId: product.id, quantity: 1 });
      }
    },
    decreaseQuantity(state, action) {
      const cartItem = state.cart.find((item) => item.productId === action.payload);
      if (!cartItem) return;

      if (cartItem.quantity === 1) {
        state.cart = state.cart.filter((item) => item.productId !== action.payload);
      } else {
        cartItem.quantity -= 1;
      }
    },
    removeFromCart(state, action) {
      state.cart = state.cart.filter((item) => item.productId !== action.payload);
    },
  },
});

export const { addToCart, decreaseQuantity, removeFromCart } = cartSlice.actions;

export const selectProducts = (state) => state.shoppingCart.products;
const selectCartEntries = (state) => state.shoppingCart.cart;

export const selectCartItems = createSelector(
  [selectProducts, selectCartEntries],
  (products, cart) =>
    cart.flatMap((entry) => {
      const product = products.find((item) => item.id === entry.productId);
      return product ? [{ ...product, quantity: entry.quantity }] : [];
    }),
);

export const calculateTotalPrice = createSelector(
  [selectCartItems],
  (items) => items.reduce((total, item) => total + item.price * item.quantity, 0),
);

export default cartSlice.reducer;
