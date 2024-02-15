import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
  //totalPrice: 0;
  //numItems: 0
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      //payload = new item
      state.cart.push(action.payload);
    },
    deleteItem(state, action) {
      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
    },
    increaseItemQty(state, action) {
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      item.quantity++;
      item.totalPrice = item.quantity * item.unitPrice;
    },
    decreaseItemQty(state, action) {
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      item.quantity--;
      item.totalPrice = item.quantity * item.unitPrice;
      if (item.quantity === 0) cartSlice.caseReducers.deleteItem(state, action);
    },
    clearCart(state) {
      state.cart = [];
    },
  },
});

export const {
  addItem,
  deleteItem,
  increaseItemQty,
  decreaseItemQty,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

export const getCart = (state) => state.cart.cart;

export const getTotalQty = (state) =>
  state.cart.cart.reduce((sum, cur) => sum + cur.quantity, 0);

export const getTotalPrice = (state) =>
  state.cart.cart.reduce((sum, cur) => sum + cur.totalPrice, 0);

export const getCurrentQtyById = (id) => (state) =>
  state.cart.cart.find((item) => item.pizzaId == id)?.quantity ?? 0;
