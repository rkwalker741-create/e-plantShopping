import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // TODO: Initialize items as an empty array
  },
  reducers: {
    addItem: (state, action) => {
      const { name, image, cost } = action.payload;

      // Check if the item already exists in the cart
      const existingItem = state.items.find(item => item.name === name);

      if (existingItem) {
        // If it exists, increase quantity
        existingItem.quantity++;
      } else {
        // If not, add new item with quantity 1
        state.items.push({ name, image, cost, quantity: 1 });
      }
    },

    removeItem: (state, action) => {
      // Remove item from cart by filtering out the one with matching name
      state.items = state.items.filter(item => item.name !== action.payload);
    },

    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;

      // Find the item in the cart
      const itemToUpdate = state.items.find(item => item.name === name);

      // If found, update its quantity
      if (itemToUpdate) {
        itemToUpdate.quantity = quantity;
      }
    },
  },
});

// Export the action creators so they can be used in components
export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

// Export the reducer as default to be used in store.js
export default CartSlice.reducer;
