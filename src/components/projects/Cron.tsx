import { Box, Button, CircularProgress, IconButton, Modal, Tooltip, Typography } from '@mui/material';
import React, { FC, useState } from 'react';
import BlockIcon from '@mui/icons-material/Block';
import { useWork } from '../../store/work.store';
import { useCron } from '../../providers/CronProvider';
import InfoIcon from '@mui/icons-material/Info';

interface ICron {
    project: IProject
}

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

const Cron:FC<ICron> = ({project}) => {
    const { currentProject } = useWork()
    const {loading, log, executeCron} = useCron()
    const [open, setOpen] = useState(false)
    
    return (
        <>
          <Box>
            {project.title === currentProject ?
            <Box sx={{display:'flex'}}>
                { !loading ?
                    <Button variant='outlined' onClick={() => executeCron()}>
                        RUN CRONJOB
                    </Button>
                    :
                    <Box>
                        <CircularProgress/>
                    </Box>
                }
                    <IconButton onClick={() => setOpen(true)}>
                        <InfoIcon/>
                    </IconButton>
            </Box>
               
            :
                <Tooltip title="first run project">
                    <BlockIcon/>
                </Tooltip>
            }
            </Box> 
        <Modal
            open={open}
            onClose={() => setOpen(false)}
        >
            <Box sx={style}>
                {log?.map((item) => 
                     <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        {item}
                    </Typography>
                )}
            </Box>
        </Modal>
        </>
     
    );
};

export default Cron;