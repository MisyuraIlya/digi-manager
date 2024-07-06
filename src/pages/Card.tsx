import { Button, IconButton, Menu, MenuItem, TableCell, TableRow, Typography } from '@mui/material';
import React, {FC, useEffect, useState} from 'react';
import Cron from '../components/projects/Cron';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { ConfigService } from '../services/config.service';
import { useWork } from '../store/work.store';
import { DockerService } from '../services/docker.services';
import Loader from '../components/Loader';

interface ICardProps {
    row: IProject,
    index: number,
    fetchProjects: () => void
}

const ipcRenderer = (window as any).ipcRenderer;

const Card:FC<ICardProps> = ({row, index, fetchProjects}) => {
    const [loading, setLoading] = useState(false)
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const { currentProject, setCurrentProject } = useWork()
    const [fpmIsStarted, setFpmIsStarted] = useState(false)
    const [frontStart, setFrontStart] = useState(false)
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleUpdate = async () => {
        try {
            const response = await DockerService.updateVersion(`${row.path}/${row.title}`)
            console.log('response',response)
            fetchProjects()
            handleClose()
        } catch(e) {
            console.log('[ERROR] error',e)
        }
    }

    const openFolder = async (project: IProject) => {
        ConfigService.openFolder(project.path)
    }

    const stopDocker = async (project: IProject) => {
        try {
            setLoading(true)
            if (currentProject === project.title) {
                const data = await DockerService.stopDocker()
                setCurrentProject('')
                setLoading(false)
            } else {
                DockerService.deploy(`${project?.path}/${project.title}`);
                setCurrentProject(project.title)
            }
        } catch(e) {
            console.log('[ERROR]',e)
        } 
      
    }

    const handleOnChange = async (data: string) => {
        try {
            if (data?.includes('fpm is running')) {
                setFpmIsStarted(true)
            }
    
            if (data?.includes('start worker processes')) {
                setFrontStart(true)
            }
    
            // setLogData(prevLogData => prevLogData + data)
        } catch(e){
            console.log('error',e)
        }

    }

    useEffect(() => {
        const handleOutput = (event: any, data: any) => {
            if (data.type === 'stdout' || data.type === 'stderr') {
                handleOnChange(data.data);
            }
        };

        const handleComplete = (event: any, data: any) => {
            handleOnChange(data.code);
        };

        if (ipcRenderer) {
            ipcRenderer?.on('DockerService:deploy:output', handleOutput);
            ipcRenderer?.on('DockerService:deploy:complete', handleComplete);
        }

    }, []);



    useEffect(() => {
        if (fpmIsStarted && frontStart) {
            DockerService.openWebSite();
            setLoading(false)
        }
    }, [fpmIsStarted, frontStart])


    return (
        <>
        <Loader open={loading} setOpen={setLoading}/>
        <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            <TableCell component="th" scope="row">
                {row.title}
            </TableCell>
            <TableCell align="left">
                <Button variant='outlined' onClick={() => stopDocker(row)}>
                    {row.title === currentProject ? <>STOP</> : <>RUN</>}
                </Button>
            </TableCell>
            <TableCell align="left">
                <Button variant='outlined' onClick={() => openFolder(row)}>
                    OPEN
                </Button>
            </TableCell>
            <TableCell align="left">
                <Typography>
                {row?.version}
                </Typography>
            </TableCell>
            <TableCell align="left">
                <Cron project={row}/>
            </TableCell>
            <TableCell align="left">
                <IconButton onClick={handleClick}>
                    <MoreVertIcon/>
                </IconButton>
            </TableCell>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={handleUpdate} disabled={row.title !== currentProject}>Update</MenuItem>
            </Menu>
        </TableRow>
        </>
     
    );
};

export default Card;