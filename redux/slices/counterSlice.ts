import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

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
      const newItem = action.payload;
      const existingItem = state.cartItem.find(
        (item) => item._id === newItem._id
      );

      if (!existingItem) {
        state.cartItem.push(newItem);
      } else {
        toast.error("Item already exists");
      }
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
