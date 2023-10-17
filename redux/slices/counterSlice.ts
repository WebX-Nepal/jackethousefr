import { createSlice } from "@reduxjs/toolkit";

export interface Item {
  _id: string;
  category: string;
  colors: string[];
  createdAt: string;
  createdBy: string;
  image: string[];
  name: string;
  sellingPrice: number;
  stock: number;
  discount: number;
  totalItems: number;
  updatedAt: string;
  __v: number;
}
export interface RootState {
  cartItem: Item[];
}
const initialState: RootState = {
  cartItem: [],
};
export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    addItems: (state, action) => {
      state.cartItem.push(action.payload);
    },
    removeItems: (state, action) => {
      const itemIndex = state.cartItem.findIndex(
        (item) => item._id === action.payload._id
      );
      if (itemIndex !== -1) {
        state.cartItem.splice(itemIndex, 1);
      }
    },
    emptyCartItems: (state) => {
      state.cartItem = [];
    },
  },
});

export const { addItems, removeItems, emptyCartItems } = counterSlice.actions;
export default counterSlice.reducer;
