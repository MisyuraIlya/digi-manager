import { Backdrop, Box, Button, LinearProgress, Modal, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { DockerService } from '../../services/docker.services';
import { useWork } from '../../store/work.store';

const ipcRenderer = (window as any).ipcRenderer;

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    height: '75%',
    overflow: 'auto',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const Deploy = () => {
    const [output, setOutput] = useState<IDockerResponse>({ title: 'deploy project', progress: 0, isDone: false });
    const [log, setLog] = useState(false);
    const [open, setOpen] = useState(false);
    const [logData, setLogData] = useState('');
    const [fpmIsStarted, setFrpmIsStarted] = useState(false)
    const [frontStart, setFrontStart] = useState(false)
    const { folderPath, title , setCurrentProject} = useWork();
    const logEndRef = useRef<HTMLDivElement | null>(null);

    const handleOnChange = async (data:string) => {
        try {
            if(data?.includes('fpm is running')){
                setFrpmIsStarted(true)
            }
    
            if(data?.includes('start worker processes')){
                setFrontStart(true)
            }
      
            setLogData(prevLogData => prevLogData + data)
        } catch(e) {
            console.log('error',e)
        }

    }

    const handleOpen = () => {
        setLog(true);
        DockerService.deploy(`${folderPath}/${title}`);
        setCurrentProject(title)
    };

    useEffect(() => {
        const handleOutput = (event: any, response: IDockerResponse) => {
            if (response.isDone) {
                setOpen(false);
            }
            setOutput(response);
        };
        ipcRenderer?.on('DockerService:deploy:output', handleOutput);

        return () => {
            ipcRenderer?.removeListener('DockerService:deploy:output', handleOutput);
        };
    }, []);

    useEffect(() => {
        const handleDeployOutput = (event: any, data: any) => {
            if (data.type === 'stdout' || data.type === 'stderr') {
                handleOnChange(data.data);
            }
        };

        const handleDeployComplete = (event: any, data: any) => {
            handleOnChange(data.code);
        };

        ipcRenderer?.on('DockerService:deploy:output', handleDeployOutput);
        ipcRenderer?.on('DockerService:deploy:complete', handleDeployComplete);

        return () => {
            ipcRenderer?.removeListener('DockerService:deploy:output', handleDeployOutput);
            ipcRenderer?.removeListener('DockerService:deploy:complete', handleDeployComplete);
        };
    }, []);

    useEffect(() => {
        if (logEndRef.current) {
            logEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [logData]);

    useEffect(() => {
        if(fpmIsStarted && frontStart){
            DockerService.openWebSite();
        }
    },[fpmIsStarted,frontStart])

    return (
        <Box>
            <Button variant='contained' onClick={() => handleOpen()}>
                deploy
            </Button>
            <Button variant='contained' onClick={() => setLog(true)}>
                log
            </Button>
            <Button variant='contained' onClick={() => DockerService.openWebSite()}>
                open website
            </Button>
            <Backdrop open={open} style={{ zIndex: 9999 }}>
                <Box sx={{ position: 'relative', width: '70%', margin: 'auto' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingBottom: '50px' }}>
                        <Typography sx={{ color: 'white', fontWeight: 900 }} variant='h5'>
                            {output.title} - %{output.progress}
                        </Typography>
                    </Box>
                    <LinearProgress variant="determinate" value={output.progress} style={{ position: 'absolute', top: '50%', left: '0', width: '100%', transform: 'translateY(-50%)' }} />
                </Box>
            </Backdrop>
            <Button onClick={handleOpen}>Open modal</Button>
            <Modal
                open={log}
                onClose={() => setLog(false)}
            >
                <Box sx={style}>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        {logData}
                        <div ref={logEndRef}></div>
                    </Typography>
                </Box>
            </Modal>
        </Box>
    );
};

export default Deploy;
