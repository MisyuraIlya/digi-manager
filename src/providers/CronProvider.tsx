import React, { FC, createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { DockerService } from '../services/docker.services';

const ipcRenderer = (window as any).electron?.ipcRenderer;

interface ModalContextType {
  loading: boolean;
  setLoading: (value: boolean) => void;
  executeCron: () => void;
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
  const [log, setLog] = useState<string[]>([]); // Use an array to store lines of logs

  const executeCron = async () => {
    await DockerService.executeCron();
  };

  const handleOnChange = (data: string) => {
    setLog(prevLog => [...prevLog, data.trim()]); // Append new log line to state
  };

  useEffect(() => {
    const handleOutput = (event: any, data: any) => {
      console.log('data',data)
      if (data.type === 'stdout' || data.type === 'stderr') {
        handleOnChange(data.data); 
      } else if (data.type === 'process_end') {
        setLoading(false); 
      }
    };

    ipcRenderer?.on('DockerService:executeCron:output', handleOutput);

    return () => {
      ipcRenderer?.removeListener('DockerService:executeCron:output', handleOutput); // Clean up event listener
    };
  }, []);

  const value = {
    loading,
    setLoading,
    executeCron
  };

  return (
    <ModalContext.Provider value={value}>
      <div>
        {log.map((line, index) => (
          <div key={index}>{line}</div>
        ))}
      </div>
      {children}
    </ModalContext.Provider>
  );
};

export { useCron, CronProvider };
