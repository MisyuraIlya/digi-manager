import { create } from 'zustand'
import { persist, createJSONStorage, PersistOptions } from 'zustand/middleware'
import { ConfigService } from '../services/config.service'
import { DockerService } from '../services/docker.services'
import { base64 } from '../helpers/base64'

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
    host: string
    setHost: (host:string) => void
    usernameFtp: string
    setUserNameFtp: (username:string) => void
    passwordFtp: string
    setPasswordFtp: (password:string) => void
    db: string
    setDb: (erp:string) => void

    //CONFIG
    imageState: string
    setImageState:(imageState: string) => void
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
    footerDescription1:string,
    setDescription1:(value: string) => void
    footerDescription2:string,
    setDescription2:(value: string) => void
    footerDescription3:string,
    setDescription3:(value: string) => void
    oneSignalApi:string,
    setOneSignalApi:(oneSignalApi: string) => void,
    oneSignalKey:string,
    setOneSignalKey:(oneSignalKey: string) => void,
    smsApi:string,
    setSmsApi:(smsApi: string) => void,
    smsToken:string,
    setSmsToken: (smsToken: string) => void,
    
    isDisabledLvl1: boolean
    setIsDisabledLvl1: (value: boolean) => void
    isDisabledLvl3: boolean
    setIsDisabledLvl3: (value: boolean) => void
    folderPath: string
    
    deployConfig: (file: File | null) => void

    currentProject: string
    setCurrentProject: (value: string) => void
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
      host:'',
      setHost: (host) => set({host}),
      usernameFtp: '',
      setUserNameFtp: (username) =>set({username}),
      passwordFtp: '',
      setPasswordFtp: (password) => set({password}),
      db:'',
      setDb: (db) => set({db}),

      currentProject:'',
      setCurrentProject:(currentProject) => set({currentProject}),
      
      //CONFIG
      imageState:'',
      setImageState:(imageState) => set({imageState}),
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
      footerDescription1:'',
      setDescription1:(footerDescription1) => set({footerDescription1}),
      footerDescription2:'',
      setDescription2:(footerDescription2) => set({footerDescription2}),
      footerDescription3:'',
      setDescription3:(footerDescription3) => set({footerDescription3}),
      oneSignalApi:'',
      setOneSignalApi:(oneSignalApi) => set({oneSignalApi}),
      oneSignalKey:'',
      setOneSignalKey:(oneSignalKey) => set({oneSignalKey}),
      smsApi:'',
      setSmsApi:(smsApi) => set({smsApi}),
      smsToken:'',
      setSmsToken: (smsToken) => set({smsToken}),

      //AC
      isDisabledLvl1:true,
      setIsDisabledLvl1:(isDisabledLvl1) => set({isDisabledLvl1}),
      isDisabledLvl3:true,
      setIsDisabledLvl3:(isDisabledLvl3) => set({isDisabledLvl3}),
      folderPath:'',
      
      //METHODS
      deployConfig: async (file: File | null) => {
        const res = await ConfigService.createFolder({
          erp: get().erp,
          api: get().api,
          username: get().username,
          password: get().password,
          host: get().host,
          usernameFtp: get().usernameFtp,
          passwordFtp: get().passwordFtp,
          db: get().db,
          imageState: get().imageState,
          title:get().title,
          description: get().description,
          minimumPrice: get().minimumPrice,
          deliveryPrice: get().deliveryPrice,
          primaryColor:  get().primaryColor,
          secondaryColor: get().secondaryColor,
          isWithStock: get().isWithStock,
          isWithMigvan: get().isWithMigvan,
          email: get().email,
          location: get().location,
          footerDescription1: get().footerDescription1,
          footerDescription2: get().footerDescription2,
          footerDescription3: get().footerDescription3,
          oneSignalApi: get().oneSignalApi,
          oneSignalKey: get().oneSignalKey,
          smsApi: get().smsApi,
          smsToken: get().smsToken,
        })
        if(res.result === "success"){
            set({folderPath:res.folderPath})
            const logoBase64 = await base64(file)
            const splited = file?.type?.split('/')[1]
            const logo = await ConfigService.createMedia({
              folderPath: res.folderPath,
              base64: logoBase64,
              fileName:`logo.${splited}`
            })
            const files = await ConfigService.createFiles({
                folderPath: res.folderPath,
                erp: get().erp,
                api: get().api,
                username: get().username,
                password: get().password,
                host: get().host,
                usernameFtp: get().usernameFtp,
                passwordFtp: get().passwordFtp,
                db: get().db,
                imageState: get().imageState,
                title:get().title,
                description: get().description,
                minimumPrice: get().minimumPrice,
                deliveryPrice: get().deliveryPrice,
                primaryColor:  get().primaryColor,
                secondaryColor: get().secondaryColor,
                isWithStock: get().isWithStock,
                isWithMigvan: get().isWithMigvan,
                email: get().email,
                location: get().location,
                footerDescription1: get().footerDescription1,
                footerDescription2: get().footerDescription2,
                footerDescription3: get().footerDescription3,
                oneSignalApi: get().oneSignalApi,
                oneSignalKey: get().oneSignalKey,
                smsApi: get().smsApi,
                smsToken: get().smsToken,
            })
            console.log('files',files)
        } else {
          set({isDisabledLvl3:true})
        }
      },

    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => localStorage),
    } as PersistOptions<useCartState, useCartState>
  )
)
