import React, { FC, createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { DockerService } from '../services/docker.services';

const ipcRenderer = (window as any).ipcRenderer;

interface ModalContextType {
  loading: boolean;
  setLoading: (value: boolean) => void;
  executeCron: () => void;
  log: string[]
}

const ModalContext = createContext<ModalContextType | null>(null);

const useCron = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('Can not run without "Cron Provider"');
  }
  return context;
};

interface CronProviderProps {
  children: ReactNode;
}
const CronProvider: FC<CronProviderProps> = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [log, setLog] = useState<string[]>([]);

  const executeCron = async () => {
    setLoading(true)
    await DockerService.executeCron();
  };

  const handleOnChange = (data: string) => {
    setLog(prevLog => [...prevLog, data.trim()]); 
  };

  useEffect(() => {
    const handleOutput = (event: any, data: any) => {
      if (data.type === 'stdout' || data.type === 'stderr') {
        handleOnChange(data.data); 
      } else if (data.type === 'process_end') {
        setLoading(false); 
      }
    };

    ipcRenderer?.on('DockerService:executeCron:output', handleOutput);

  }, []);

  const value = {
    loading,
    setLoading,
    executeCron,
    log,
  };

  return (
    <ModalContext.Provider value={value}>
      {children}
    </ModalContext.Provider>
  );
};

export { useCron, CronProvider };
