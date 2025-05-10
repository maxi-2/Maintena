// store.ts
import { create } from 'zustand'

type Store = {
  selected: string | null,
  setSelected: (selected:string) => void,
}

export const useSelectedStore = create<Store>((set) => ({
  selected: "machines",
  setSelected: (newSelected) => set(() => ({selected: newSelected}))
}))