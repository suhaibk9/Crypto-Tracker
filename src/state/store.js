import { create } from "zustand";

const store = create((set) => ({
  currency: "usd",
  setCurrency(newCurrency) {
    set({ currency: newCurrency });
  },
}));

export default store;
