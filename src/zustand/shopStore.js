import {create} from 'zustand';

const useShopStore = create((set) => ({
  shops: [],
  setShops: (shops) => set({ shops }),
}));

export default useShopStore;