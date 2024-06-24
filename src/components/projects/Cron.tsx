import { Box, Button, Tooltip } from '@mui/material';
import React, { FC } from 'react';
import BlockIcon from '@mui/icons-material/Block';
import { useWork } from '../../store/work.store';
import { useCron } from '../../providers/CronProvider';

interface ICron {
    project: IProject
}
const Cron:FC<ICron> = ({project}) => {
    const { currentProject } = useWork()
    const {loading,setLoading, executeCron} = useCron()

    
    return (
        <Box>
            {project.title === currentProject ?
                <Button variant='outlined' onClick={() => executeCron()}>
                    RUN CRONJOB
                </Button>
            :
                <Tooltip title="first run project">
                    <BlockIcon/>
                </Tooltip>
            }
        </Box>
    );
};

export default Cron;