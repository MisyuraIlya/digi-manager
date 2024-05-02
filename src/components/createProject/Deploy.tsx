import { Backdrop, Box, Button, CircularProgress, LinearProgress, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { DockerService } from '../../services/docker.services';
import { title } from 'process';
const ipcRenderer = (window as any).ipcRenderer;

const Deploy = () => {
    const [output, setOutput] = useState<IDockerResponse>({title:'deploy project',progress:0, isDone:false});
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    }
    useEffect(() => {
        const handleOutput = (event:any, response:IDockerResponse) => {
            console.log('response',response)
            if(response.isDone){
                setOpen(false)
            }
            setOutput(response);
        };
        ipcRenderer.on('DockerService:deploy:output', handleOutput);

        return () => {
            ipcRenderer.removeListener('DockerService:deploy:output', handleOutput);
        };
    }, []); 

    return (
        <Box>
            <Button variant='contained' onClick={() => handleOpen()}>
                deploy
            </Button>
            <Backdrop open={open} style={{ zIndex: 9999 }}>
                <Box sx={{ position: 'relative', width: '70%', margin: 'auto' }}>
                    <Box sx={{display:'flex', justifyContent:'center', alignItems:'center', paddingBottom:'50px'}}>
                        <Typography sx={{color:'white',fontWeight:900}} variant='h5'>
                            {output.title} - %{output.progress}
                        </Typography>
                    </Box>
                    <LinearProgress variant="determinate" value={output.progress} style={{ position: 'absolute', top: '50%', left: '0', width: '100%', transform: 'translateY(-50%)' }} />
                </Box>
            </Backdrop>
        </Box>
    );
};

export default Deploy;