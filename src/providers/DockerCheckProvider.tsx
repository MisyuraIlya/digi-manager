import React, { FC, createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { DockerService } from '../services/docker.services';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

const ipcRenderer = (window as any).ipcRenderer;

interface ModalContextType {
 
}

const ModalContext = createContext<ModalContextType | null>(null);

const useChecker = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('Can not run without "Checker Provider"');
  }
  return context;
};

interface CheckerProviderProps {
  children: ReactNode;
}
const CheckerProvider: FC<CheckerProviderProps> = ({ children }) => {
    const [checkDocker, setCheckDocker] = useState(false)
    const [ghInstalled, setGhInstalled] = useState(false)
    const [gitInstalled, setGitInstalled] = useState(false)

    const handleCheckDockerIsOpen = async () => {
        const response = await DockerService.checkIsDockerOpen()
        setCheckDocker(!response.data)
    }

    const handleCghInstalled = async () => {
        const response = await DockerService.checkIsGhInstalled()
        setGhInstalled(!response.data)
    }

    const handleCgitInstalled = async () => {
        const response = await DockerService.checkIsGitInstalled()
        setGitInstalled(!response.data)
    }
    useEffect(() => {
        handleCheckDockerIsOpen()
    },[checkDocker])   

    useEffect(() => {
      handleCghInstalled()
    },[ghInstalled]) 

    useEffect(() => {
      handleCgitInstalled()
    },[gitInstalled]) 

  const value = {
 
  };

  return (
    <ModalContext.Provider value={value}>
      {checkDocker &&
       <Dialog
        open={checkDocker}
        onClose={() => setCheckDocker(true)}
      >
        <DialogTitle>
          {"Docker service not running"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            open docker program for correct work
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCheckDocker(false)} autoFocus>
            docker service open
          </Button>
        </DialogActions>
      </Dialog>
      }
      {ghInstalled && 
        <Dialog
          open={ghInstalled}
          onClose={() => setGhInstalled(true)}
        >
          <DialogTitle>
            {"Github CLI service not running"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              install github CLI
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setGhInstalled(false)} autoFocus>
              ok
            </Button>
          </DialogActions>
        </Dialog>
      }
      {gitInstalled &&
        <Dialog
          open={gitInstalled}
          onClose={() => setGitInstalled(true)}
        >
          <DialogTitle>
            {"GIT is not installed"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Download GIT
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setGitInstalled(false)} autoFocus>
              docker service open
            </Button>
          </DialogActions>
        </Dialog>
      }
      {children}
    </ModalContext.Provider>
  );
};

export { useChecker, CheckerProvider };
