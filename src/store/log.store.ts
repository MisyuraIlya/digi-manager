import { create } from 'zustand'
import { persist, createJSONStorage, PersistOptions } from 'zustand/middleware'

interface useLogState {
  logModal: boolean,
  setLogModal: (logModal:boolean) => void
  log: string[]
  setLog: (log: string) => void
  clear: () => void
}

export const useLog = create<useLogState>()(
  persist(
    (set, get) => ({
      logModal: false,
      setLogModal: (logModal:boolean) => set({logModal}),
      log: [],
      setLog: (newLog) => {
        const currentLog = get().log
        set({ log: [...currentLog, newLog] })
      },
      clear: () => set({log:[]})
    }),
    {
      name: 'log-storage',
      storage: createJSONStorage(() => localStorage),
    } as PersistOptions<useLogState, useLogState>
  )
)
