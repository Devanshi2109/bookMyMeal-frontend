import { create } from "zustand";

// Create a store to manage the user's data
const useUserStore = create((set) => ({
  userName: "Harsh",
  setUserName: (name) => set({ userName: name }),
}));

export default useUserStore;
