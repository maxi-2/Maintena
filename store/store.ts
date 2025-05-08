// store.ts
import { create } from 'zustand'
import { profile } from '@/new-types'

type Store = {
  profile: profile | null,
  setProfile: (profile:profile) => void,
}

export const useProfileStore = create<Store>((set) => ({
  profile: null,
  setProfile: (newProfile) => set(() => ({profile: newProfile}))
}))