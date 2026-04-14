import { create } from "zustand"

interface NavStore {
  isTransitioning: boolean
  setTransitioning: (val: boolean) => void
}

export const useNavStore = create<NavStore>((set) => ({
  isTransitioning: false,
  setTransitioning: (val) => set({ isTransitioning: val }),
}))
