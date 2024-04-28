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

    //CONFIG
    imageState: string
    setImageState:(imageState: string) => void
    title: string
    setTitle: (value: string) => void
    minimumDelivery: number
    setMinimumDelivery: (value: number) => void
    primaryColor: string
    setPrimaryColor:(value:string) => void
    secondaryColor: string
    setSecondaryColor:(value:string) => void

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
      //CONFIG
      imageState:'',
      setImageState:(imageState) => set({imageState}),
      title:'',
      setTitle:(title) => set({title}),
      minimumDelivery:0,
      setMinimumDelivery: (minimumDelivery) => set({minimumDelivery}),
      primaryColor:'',
      setPrimaryColor: (primaryColor) => set({primaryColor}),
      secondaryColor:'',
      setSecondaryColor:(secondaryColor) => set({secondaryColor}),

      isDisabledLvl1:true,
      setIsDisabledLvl1:(isDisabledLvl1) => set({isDisabledLvl1})
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => localStorage),
    } as PersistOptions<useCartState, useCartState>
  )
)
