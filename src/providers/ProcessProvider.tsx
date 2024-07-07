import React, { FC, createContext, useState, useContext, ReactNode } from 'react';
import Loader from '../components/Loader';
import { useConfig } from '../store/config.store';
import { useDeploying } from './DeployingProvider';
import { DockerService } from '../services/docker.services';
import { useProject } from '../store/projects.stroe';
import { ConfigService } from '../services/config.service';

const steps = ['validation API', 'Images' ,'Configuration', 'Integration' ,'Deploy Process' ];

interface ModalContextType {
    steps: string[]
    setLoading: (value: boolean) => void
    activeStep: number
    setActiveStep: (value: number) => void 
    checkIsDisabled: () => boolean
    handleNext: () => void
    setLvl1: (value:boolean) => void
    handleWhatNeed: () => string
}

const ModalContext = createContext<ModalContextType | null>(null);

const useProcess = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('Can not run without "Process Provider"');
  }
  return context;
};

interface ProcessProviderProps {
  children: ReactNode;
}
const ProcessProvider: FC<ProcessProviderProps> = ({ children }) => {
  const {
    imageState, 
    categoryState,
    title,
    logoFile,
    primaryColor,
    secondaryColor,
    email,
    location,
    phoneSupport,
    footerDescription1,
    oneSignalApi,
    oneSignalKey,
    smsCenter,
    smsCenterToken,
    smsToken,
    domain
  } = useConfig()
  const [loading, setLoading] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [lvl1, setLvl1] = useState(true)
  const {setDataLog,setLogModal,setLogTitle,deployConfig} = useDeploying()
  const {setCurrentProject,folderPath} = useProject()

  const checkIsDisabled = () => {
    if(activeStep === 0) {
      return false //delete afteher done

      return lvl1
    }
    if(activeStep === 1){
      if(!imageState || !categoryState){
        return true
      } else {
        return false
      }
    }

    if(activeStep === 2){
      return false //delete afteher done
      if(
        !title ||
        !logoFile ||
        !primaryColor ||
        !secondaryColor ||
        !email ||
        !location ||
        !phoneSupport ||
        !footerDescription1
      ) {
        return true 
      } else {
        return false
      }
    }

    if(activeStep === 3){
      if(!oneSignalApi || !smsCenter || !smsCenterToken || !oneSignalKey ){
        return true
      } else {
        return false
      }
    }

    if(activeStep === 4){
      if(!domain){
        return true
      } else {
        return false
      }
    }
    return false
  }

  const handleNext = async () => {
    if(activeStep === steps.length - 1){
      setActiveStep(steps.length)
      handleProjectExecute()
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleWhatNeed = () => {
    if(activeStep === 0) {
      if (lvl1){
        return 'all endpoints must be accesiable'
      }
    }
    if(activeStep === 1){
      if(!imageState || !categoryState){
        return 'need to choose image and category'
      } 
    }

    if(activeStep === 2){
      if(
        !title ||
        !logoFile ||
        !primaryColor ||
        !secondaryColor ||
        !email ||
        !location ||
        !phoneSupport ||
        !footerDescription1
      ) {
        return 'REQUIRED FIELDS: title,logo, primary color, secondary color, email, location , phone support, foolter description 1' 
      } 
    }

    if(activeStep === 3){
      if(!oneSignalApi || !smsCenter || !smsCenterToken || !oneSignalKey || !smsToken){
        return 'REQUIRED FIELDS: one signal api, sms center, sms center token, one signal key, sms token' 
      } 
    }

    if(activeStep === 4){
      if(!domain){
        return 'REQUIRED FIELDS: domain' 
      } 
    }

    return ''
  }

  const handleProjectExecute = async () => {
      try {
          setDataLog([])
          setLogModal(true)
          setLogTitle('stop exist dockers..')
          const response0 = await DockerService.stopDocker()
          setCurrentProject('')
          setLogTitle('deploy config')
          const response1 = await deployConfig()
          setLogTitle('create github repository')
          const response2 =await ConfigService.executeBash(folderPath,title)
          setLogTitle('create project docker containers')
          DockerService.deploy(`${folderPath}/${title}`);
          setCurrentProject(title)
      } catch(e) {
          console.log('e',e)
      }
  };

  const value = {
    setLoading,
    steps,
    activeStep,
    setActiveStep,
    checkIsDisabled,
    handleNext,
    setLvl1,
    handleWhatNeed
  };

  return (
    <ModalContext.Provider value={value}>
      <Loader open={loading} setOpen={setLoading}/>
      {children}
    </ModalContext.Provider>
  );
};

export { useProcess, ProcessProvider };
