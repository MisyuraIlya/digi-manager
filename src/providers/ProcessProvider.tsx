import React, { FC, createContext, useState, useContext, ReactNode } from 'react';
import Loader from '../components/Loader';
import { useConfig } from '../store/config.store';

const ipcRenderer = (window as any).ipcRenderer;

const steps = ['validation API', 'Images' ,'Configuration', 'Integration' ,'Deploy Process' ];

interface ModalContextType {
    steps: string[]
    setLoading: (value: boolean) => void
    activeStep: number
    setActiveStep: (value: number) => void 
    checkIsDisabled: () => boolean
    handleNext: () => void
    setLvl1: (value:boolean) => void
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
  const {imageState, categoryState} = useConfig()
  const [loading, setLoading] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [lvl1, setLvl1] = useState(true)
  
  const checkIsDisabled = () => {
    if(activeStep === 0) {
      // return lvl1
      return false
    }
    if(activeStep === 1){
      if(!imageState || !categoryState){
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
      // handleExecute()
    } else {
      // let newSkipped = skipped;
      // if (isStepSkipped(activeStep)) {
      //   newSkipped = new Set(newSkipped.values());
      //   newSkipped.delete(activeStep);
      // }
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      // setSkipped(newSkipped);
    }
  };

  const value = {
    setLoading,
    steps,
    activeStep,
    setActiveStep,
    checkIsDisabled,
    handleNext,
    setLvl1
  };

  return (
    <ModalContext.Provider value={value}>
      <Loader open={loading} setOpen={setLoading}/>
      {children}
    </ModalContext.Provider>
  );
};

export { useProcess, ProcessProvider };
