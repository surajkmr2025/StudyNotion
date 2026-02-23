import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

// ✅ FIX: Wrapped every localStorage read in a safe helper.
// If the stored JSON is corrupted (e.g. user manually edited it),
// JSON.parse throws and the app crashes on startup.
// safeParseJSON returns the fallback value instead.
const safeParseJSON = (key, fallback) => {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : fallback;
  } catch {
    return fallback;
  }
};

const initialState = {
  cart: safeParseJSON("cart", []),
  total: safeParseJSON("total", 0),
  totalItems: safeParseJSON("totalItems", 0),
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const course = action.payload;
      const index = state.cart.findIndex((item) => item._id === course._id);

      if (index >= 0) {
        // Course is already in the cart — don't add a duplicate
        toast.error("Course is already in the cart");
        return;
      }

      // Add the course and update totals
      state.cart.push(course);
      state.totalItems++;
      state.total += course.price;

      // Persist the updated cart to localStorage
      localStorage.setItem("cart", JSON.stringify(state.cart));
      localStorage.setItem("total", JSON.stringify(state.total));
      localStorage.setItem("totalItems", JSON.stringify(state.totalItems));

      toast.success("Course added to cart");
    },

    removeFromCart: (state, action) => {
      const courseId = action.payload;
      const index = state.cart.findIndex((item) => item._id === courseId);

      if (index >= 0) {
        // Subtract the price before splicing so we reference the correct item
        state.totalItems--;
        state.total -= state.cart[index].price;
        state.cart.splice(index, 1);

        // Persist changes
        localStorage.setItem("cart", JSON.stringify(state.cart));
        localStorage.setItem("total", JSON.stringify(state.total));
        localStorage.setItem("totalItems", JSON.stringify(state.totalItems));

        toast.success("Course removed from cart");
      }
    },

    resetCart: (state) => {
      state.cart = [];
      state.total = 0;
      state.totalItems = 0;

      // Clear all cart-related keys from localStorage
      localStorage.removeItem("cart");
      localStorage.removeItem("total");
      localStorage.removeItem("totalItems");
    },
  },
});

export const { addToCart, removeFromCart, resetCart } = cartSlice.actions;
export default cartSlice.reducer;
