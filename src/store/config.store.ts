import { create } from 'zustand'
import { persist, createJSONStorage, PersistOptions } from 'zustand/middleware'

interface useConfigState {
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
    host: string
    setHost: (host:string) => void
    usernameFtp: string
    setUserNameFtp: (username:string) => void
    passwordFtp: string
    setPasswordFtp: (password:string) => void
    //===
    //CONFIG
    title: string
    setTitle: (value: string) => void
    description: string,
    setDescription: (value: string) => void
    minimumPrice: number
    setMinimumPrice: (value: number) => void
    deliveryPrice: number
    setDeliveryPrice: (value: number) => void
    primaryColor: string
    setPrimaryColor:(value:string) => void
    secondaryColor: string
    setSecondaryColor:(value:string) => void
    isWithStock: boolean,
    setIsWithStock:(isWithStock: boolean) => void
    isWithMigvan: boolean,
    setIsWithMigvan:(isWithMigvan: boolean) => void
    email: string
    setEmail:(value: string) => void
    location: string,
    setLocation: (value: string) => void,
    phoneSupport: string,
    setPhoneSupport: (phoneSupport: string) => void
    fax:string,
    setFax:(fax:string) => void
    footerDescription1:string,
    setDescription1:(value: string) => void
    footerDescription2:string,
    setDescription2:(value: string) => void
    footerDescription3:string,
    setDescription3:(value: string) => void
    logoFile: null | File,
    setLogoFile:(file: File) => void
    //===
    //INCTAGRATIN
    oneSignalApi:string,
    setOneSignalApi:(oneSignalApi: string) => void,
    oneSignalKey:string,
    setOneSignalKey:(oneSignalKey: string) => void,
    smsCenter:string,
    setSmsCenter: (smsCenter:string) => void,
    smsApi:string,
    setSmsApi:(smsApi: string) => void,
    smsToken:string,
    setSmsToken: (smsToken: string) => void,
    smsCenterToken: string,
    setSmsCenterToken: (smsCenterToken:string) => void
    paymentSystem:string,
    setPaymentSystem:(paymentSystem: string) => void
    masof:string,
    setMasof: (masof:string) =>void
    paymentKey:string,
    setPaymentKey:(paymentKey:string) => void
    passp:string,
    setPassp: (passp:string) => void
    //===
    //deploy
    domain:string,
    setDomain:(domain:string) => void
}

export const useConfig = create<useConfigState>()(
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
      host:'',
      setHost: (host) => set({host}),
      usernameFtp: '',
      setUserNameFtp: (username) =>set({username}),
      passwordFtp: '',
      setPasswordFtp: (password) => set({password}),
      //===
      //CONFIGURATION
      title:'',
      setTitle:(title) => set({title}),
      description:'',
      setDescription: (description) => set({description}),
      minimumPrice:0,
      setMinimumPrice: (minimumPrice) => set({minimumPrice}),
      deliveryPrice:0,
      setDeliveryPrice: (deliveryPrice) => set({deliveryPrice}),
      primaryColor:'',
      setPrimaryColor: (primaryColor) => set({primaryColor}),
      secondaryColor:'',
      setSecondaryColor:(secondaryColor) => set({secondaryColor}),
      isWithStock:false,
      setIsWithStock:(isWithStock: boolean) => set({isWithStock}),
      isWithMigvan:false,
      setIsWithMigvan:(isWithMigvan: boolean) => set({isWithMigvan}),
      email:"",
      setEmail:(email: string) => set({email}),
      location:'',
      setLocation: (location) => set({location}),
      phoneSupport:'',
      setPhoneSupport: (phoneSupport) => set({phoneSupport}),
      fax:'',
      setFax:(fax) => set({fax}),
      footerDescription1:'',
      setDescription1:(footerDescription1) => set({footerDescription1}),
      footerDescription2:'',
      setDescription2:(footerDescription2) => set({footerDescription2}),
      footerDescription3:'',
      setDescription3:(footerDescription3) => set({footerDescription3}),
      logoFile: null,
      setLogoFile:(logoFile: File) => {
        console.log('logoFile',logoFile)
        set({logoFile})
      },
      //===
      //INTAGRATION
      oneSignalApi:'',
      setOneSignalApi:(oneSignalApi) => set({oneSignalApi}),

      oneSignalKey:'',
      setOneSignalKey:(oneSignalKey) => set({oneSignalKey}),

      smsCenter:'',
      setSmsCenter: (smsCenter) => set({smsCenter}),

      smsApi:'',
      setSmsApi:(smsApi) => set({smsApi}),

      smsToken:'',
      setSmsToken: (smsToken) => set({smsToken}),

      smsCenterToken: '',
      setSmsCenterToken: (smsCenterToken) => set({smsCenterToken}),
      
      paymentSystem:'',
      setPaymentSystem:(paymentSystem) => set({paymentSystem}),
     
      masof:'',
      setMasof: (masof:string) => set({masof}),
     
      paymentKey:'',
      setPaymentKey:(paymentKey) => set({paymentKey}),
      
      passp:'',
      setPassp: (passp) => set({passp}),
      
      //===
      //Deploy
      domain:'',
      setDomain:(domain) => set({domain}),
    }),
    {
      name: 'config-storage',
      storage: createJSONStorage(() => localStorage),
    } as PersistOptions<useConfigState, useConfigState>
  )
)
