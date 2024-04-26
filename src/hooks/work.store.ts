import { create } from 'zustand'
import { persist, createJSONStorage, PersistOptions } from 'zustand/middleware'

interface useCartState {
    erp: string
    setErp: (erp:string) => void
    endpoints: IEndPoint[]
    setEndpoints: (endpoints: IEndPoint[]) => void
    api: string
    setApi: (erp:string) => void
    username: string
    setUsername: (erp:string) => void
    password: string
    setPassword: (erp:string) => void
    db: string
    setDb: (erp:string) => void
    isDisabledLvl1: boolean
    setIsDisabledLvl1: (value: boolean) => void
}




export const useWork = create(
  persist(
    (set, get) => ({
      erp:'',
      setErp:(erp) => set({erp}),
      endpoints:[],
      setEndpoints: (endpoints: IEndPoint[]) => set({endpoints}),
      api:'',
      setApi: (api) => set({api}),
      username:'',
      setUsername:(username) => set({username}),
      password:'',
      setPassword: (password) => set({password}),
      db:'',
      setDb: (db) => set({db}),

      isDisabledLvl1:true,
      setIsDisabledLvl1:(isDisabledLvl1) => set({isDisabledLvl1})
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => localStorage),
    } as PersistOptions<useCartState, useCartState>
  )
)
