import React, { FC, createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { DockerService } from '../services/docker.services';
import { Backdrop, Box, CircularProgress, DialogContent, Typography } from '@mui/material';
import { ConfigService } from '../services/config.service';
import { useProject } from '../store/projects.stroe';
import { base64 } from '../helpers/base64';
import { useConfig } from '../store/config.store';

const ipcRenderer = (window as any).ipcRenderer;

interface ModalContextType {
  loading: boolean
  dataLog: string[]
  setDataLog: (data: []) => void 
  setLogModal: (value: boolean) => void
  setLogTitle: (value: string) => void
  deployConfig: () => void
  executeCron: () => void
  setLogCronModal: (value: boolean) => void
}

const ModalContext = createContext<ModalContextType | null>(null);

const useDeploying = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('Can not run without "Deploying Provider"');
  }
  return context;
};

interface DeployingProviderProps {
  children: ReactNode;
}
const DeployingProvider: FC<DeployingProviderProps> = ({ children }) => {
  const [fpmIsStarted, setFrpmIsStarted] = useState(false)
  const [frontStart, setFrontStart] = useState(false)
  const [logTitle, setLogTitle] = useState('')
  const [dataLog, setDataLog] = useState<string[]>([])
  const [logModal, setLogModal] = useState(false)
  const [logCron, setLogCron] = useState<string[]>([])
  const [logCronModal, setLogCronModal] = useState(false)
  const { setFolderPath } = useProject()
  const [loading, setLoading] = useState(false)

  const {
    erp,
    api,
    username,
    password,
    db,

    imageState,
    ftpHost,
    ftpUsername,
    ftpPassword,
    testUser,
    categoryState,
    categoryLvl1,
    categoryLvl2,
    categoryLvl3,

    title,
    description,
    minimumPrice,
    deliveryPrice,
    isWithStock,
    isWithMigvan,
    isOpenWorld,
    email,
    location,
    phoneSupport,
    fax,
    footerDescription1,
    footerDescription2,
    footerDescription3,
    primaryColor,
    secondaryColor,
    logoFile,
 

 

    oneSignalApi,
    oneSignalKey,
    smsCenter,
    smsApi,
    smsToken,
    smsCenterToken,
    paymentSystem,
    masof,
    paymentKey,
    passp,
    yadKey,
    successLink,
    errorLink,
    domain
  } = useConfig()


  const handler = async (data:string) => {
    const stringData = String(data);

    if (stringData.includes('fpm is running')) {
      setFrpmIsStarted(true);
    }
  
    if (stringData.includes('start worker processes')) {
      setFrontStart(true);
    }
  
    setDataLog(prev => [...prev, stringData]);
  }

  const deployConfig = async () => {
    const res = await ConfigService.createFolder(title)
    setFolderPath(res.folderPath)
    const logoBase64 = await base64(logoFile)
    const splited = logoFile?.type?.split('/')[1]
    const logo = await ConfigService.createMedia({
      folderPath: res.folderPath,
      base64: logoBase64,
      fileName:`logo.${splited}`
    })
    const files = await ConfigService.createFiles({
      folderPath: res.folderPath,
      //ERP API
      erp,
      api,
      username,
      password,
      db,

      // config api
      imageState,
      ftpHost,
      ftpUsername,
      ftpPassword,
      categoryState,
      categoryLvl1,
      categoryLvl2,
      categoryLvl3,
      testUser,

      //CONFIGURATION
      title,
      description,
      minimumPrice,
      deliveryPrice,
      isWithStock,
      isWithMigvan,
      isOpenWorld,
      email,
      location,
      phoneSupport,
      fax,
      footerDescription1,
      footerDescription2,
      footerDescription3,
      primaryColor,
      secondaryColor,

      //INTEGRATION
      oneSignalApi,
      oneSignalKey,
      smsCenter,
      smsApi,
      smsToken,
      smsCenterToken,
      paymentSystem,
      masof,
      paymentKey,
      passp,
      yadKey,
      
      successLink,
      errorLink,
      domain,
      
    })
    console.log('files',files)
  }

  useEffect(() => {
    const handleDeployOutput = (event: any, data: any) => {
          if (data.type === 'stdout' || data.type === 'stderr') {
            handler(data.data);
          }
      };
      const handleDeployComplete = (event: any, data: any) => {
        handler(data.code);
      };
      ipcRenderer?.on('DockerService:deploy:output', handleDeployOutput);
      ipcRenderer?.on('DockerService:deploy:complete', handleDeployComplete);
  }, []);

  useEffect(() => {
    if(fpmIsStarted && frontStart) {
        DockerService.openWebSite();
        setLogModal(false)
    }
  },[fpmIsStarted,frontStart])

  
  const executeCron = async () => {
    await DockerService.executeCron();
  };

  useEffect(() => {
    const handleOutput = (event: any, data: any) => {
      setLoading(true)
      if (data.type === 'stdout' || data.type === 'stderr') {
        const stringData = String(data.data);
        setLogCron(prev => [...prev, stringData]); 
      } else if (data.type === 'process_end') {
        setLoading(false); 
      }
    };
    ipcRenderer?.on('DockerService:executeCron:output', handleOutput);
  }, []);

  const value = {
    loading,
    dataLog,
    setDataLog,
    setLogModal,
    setLogTitle,
    deployConfig,
    executeCron,
    setLogCronModal
  };

  return (
    <ModalContext.Provider value={value}>
      <Backdrop open={logModal} onClick={() => setLogModal(false)} sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingBottom: '50px' }}>
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingBottom: '50px' }}>
              <CircularProgress color="inherit"/>
            </Box>
            <Typography sx={{ color: 'white', fontWeight: 900, textAlign:'center'}} variant='h5'>
                {logTitle}
            </Typography>
            <Box sx={{width:'100%', margin:'0 auto'}}>
              <Box sx={{backgroundColor:'white', borderRadius:'5px', color:"black", height:'200px', overflow:'auto', width:'700px'}}>
                <DialogContent>
                  {dataLog && dataLog?.map((item) => 
                    <Typography gutterBottom>
                      {item}
                    </Typography>
                  )}
                </DialogContent>
              </Box>
            </Box>
          </Box>
        </Box>
      </Backdrop>
      <Backdrop open={logCronModal} onClick={() => setLogCronModal(false)} sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingBottom: '50px' }}>
          <Typography sx={{ color: 'white', fontWeight: 900, textAlign:'center'}} variant='h5'>
              {logTitle}
          </Typography>
          <Box sx={{width:'100%', margin:'0 auto'}}>
            <Box sx={{backgroundColor:'white', borderRadius:'5px', color:"black", height:'200px', overflow:'auto', width:'700px'}}>
              <DialogContent>
                {logCron && logCron?.map((item) => 
                  <Typography gutterBottom>
                    {item}
                  </Typography>
                )}
              </DialogContent>
            </Box>
          </Box>
        </Box>
      </Backdrop>
      {children}
    </ModalContext.Provider>
  );
};

export { useDeploying, DeployingProvider };
