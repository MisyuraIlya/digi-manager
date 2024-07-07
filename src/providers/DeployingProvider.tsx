import React, { FC, createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { DockerService } from '../services/docker.services';
import { Backdrop, Box, CircularProgress, DialogContent, Typography } from '@mui/material';

const ipcRenderer = (window as any).ipcRenderer;

interface ModalContextType {
  setDataLog: (data: []) => void 
  setLogModal: (value: boolean) => void
  setLogTitle: (value: string) => void
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
  const [loading, setLoading] = useState(false)
  const [fpmIsStarted, setFrpmIsStarted] = useState(false)
  const [frontStart, setFrontStart] = useState(false)
  const [logModal, setLogModal] = useState(false)
  const [logTitle, setLogTitle] = useState('')
  const [dataLog, setDataLog] = useState<string[]>([])

  const handler = async (data:string) => {
      if(data?.includes('fpm is running')){
          setFrpmIsStarted(true)
      }

      if(data?.includes('start worker processes')){
          setFrontStart(true)
      }
      setDataLog(prev => [...prev, data])
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
  if(fpmIsStarted && frontStart){
      DockerService.openWebSite();
      setLogModal(false)
  }
},[fpmIsStarted,frontStart])


  const value = {
    setDataLog,
    setLogModal,
    setLogTitle
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
      {children}
    </ModalContext.Provider>
  );
};

export { useDeploying, DeployingProvider };
