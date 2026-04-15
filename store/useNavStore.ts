import { create } from "zustand"

interface NavStore {
  isTransitioning: boolean
  targetLabel: string
  setTransitioning: (val: boolean) => void   // legacy compat
  startTransition: (label: string) => void
  endTransition: () => void
}

export const useNavStore = create<NavStore>((set) => ({
  isTransitioning: false,
  targetLabel: "",
  setTransitioning: (val) => set({ isTransitioning: val }),
  startTransition: (label) => set({ isTransitioning: true, targetLabel: label }),
  endTransition: () => set({ isTransitioning: false }),
}))
