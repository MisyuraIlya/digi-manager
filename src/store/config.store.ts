import { create } from 'zustand'
import { persist, createJSONStorage, PersistOptions } from 'zustand/middleware'

interface useLogState {
  //VALIDATION
    erp: string,
    setErp: (erp: string) => void
    api:string
    username:string
    password:string
    db:string
    setApi:(api:string,username:string,password:string,db:string) => void
    imageState:string
    //===
    //IMAGE
    setImageState: (value:string) => void
    ftpHost:string,
    setFtpHost: (ftpHost:string) => void
    ftpUsername:string,
    setFtpUsername: (ftpUsername:string) => void
    ftpPassword:string,
    setFtpPassword: (ftpPassword:string) => void
    categoryState:string,
    setCategoryState:(categoryState:string) => void
    categoryLvl1:string,
    setCategoryLvl1:(categoryLvl1: string) => void
    categoryLvl2:string,
    setCategoryLvl2:(categoryLvl2: string) => void
    categoryLvl3:string,
    setCategoryLvl3:(categoryLvl3: string) => void
}

export const useConfig = create<useLogState>()(
  persist(
    (set, get) => ({
      //VALIDATION
      erp: '',
      setErp: (erp) => set({erp}),
      api:'',
      username:'',
      password:'',
      db:'',
      setApi:(api:string,username:string,password:string,db:string) => set({api,username,password,db}),
      //===
      //IMAGE
      imageState:'',
      setImageState: (imageState) => set({imageState}),
      ftpHost:'',
      setFtpHost: (ftpHost) => set({ftpHost}),
      ftpUsername:'',
      setFtpUsername: (ftpUsername) => set({ftpUsername}),
      ftpPassword:'',
      setFtpPassword: (ftpPassword) => set({ftpPassword}),
      categoryState:'',
      setCategoryState:(categoryState) => set({categoryState}),
      categoryLvl1:'',
      setCategoryLvl1:(categoryLvl1) => set({categoryLvl1}),
      categoryLvl2:'',
      setCategoryLvl2:(categoryLvl2) => set({categoryLvl2}),
      categoryLvl3:'',
      setCategoryLvl3:(categoryLvl3) => set({categoryLvl3}),

    }),
    {
      name: 'config-storage',
      storage: createJSONStorage(() => localStorage),
    } as PersistOptions<useLogState, useLogState>
  )
)
