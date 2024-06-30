import { Box, Divider, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { DockerService } from '../../services/docker.services';
import { useWork } from '../../store/work.store';
import { useLog } from '../../store/log.store';

const ipcRenderer = (window as any).ipcRenderer;

const Deploy = () => {
    const {log: logData, setLog:setLogData, setLogModal } = useLog()
    const [fpmIsStarted, setFrpmIsStarted] = useState(false)
    const [frontStart, setFrontStart] = useState(false)
    const {domain, setDomain} = useWork()

    const handleOnChange = async (data:string) => {
        console.log('data',data)
        try {
            if(data?.includes('fpm is running')){
                setFrpmIsStarted(true)
            }
    
            if(data?.includes('start worker processes')){
                setFrontStart(true)
            }
      
            setLogData(logData + data)
        } catch(e) {
            console.log('error',e)
        }

    }

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
    }, []);

    // useEffect(() => {
    //     if (logEndRef.current) {
    //         logEndRef.current.scrollIntoView({ behavior: 'smooth' });
    //     }
    // }, [logData]);

    useEffect(() => {
        if(fpmIsStarted && frontStart){
            DockerService.openWebSite();
            setLogModal(false)
        }
    },[fpmIsStarted,frontStart])

    return (
        <Box>
            <Typography variant='h6' sx={{padding:'10px 5px'}}>
                Domain
            </Typography>
            <Divider/>
            <TextField 
                sx={{margin:'10px 0'}}
                label="Domain"
                variant="standard"  
                fullWidth value={domain} 
                onChange={(e) => setDomain(e.target.value)} 
            />
        </Box>
    );
};

export default Deploy;
