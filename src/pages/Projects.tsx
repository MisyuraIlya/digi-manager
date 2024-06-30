import { Box, Button, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { DockerService } from '../services/docker.services';
import { useWork } from '../store/work.store';
import { ConfigService } from '../services/config.service';
import Cron from '../components/projects/Cron';
import Loader from '../components/Loader';

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

const Projects = () => {
    const [projects, setProjects] = useState<IProject[]>([])
    const { currentProject, setCurrentProject } = useWork()
    const [fpmIsStarted, setFpmIsStarted] = useState(false)
    const [frontStart, setFrontStart] = useState(false)
    const [logData, setLogData] = useState('');
    const [log, setLog] = useState(false);
    const logEndRef = useRef<HTMLDivElement | null>(null);
    const [loading, setLoading] = useState(false)
    const handlerResponse = async () => {
        const response = await DockerService.getProjects()
        const res = [] as IProject[]
        response?.data?.map((item: IProject) => {
            let obj = {
                title: item.title,
                server: '123,123',
                docker: '123',
                path: item.path,
                isActive: true
            }
            res.push(obj)
        })
        setProjects(res)
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
    
            setLogData(prevLogData => prevLogData + data)
        } catch(e){
            console.log('error',e)
        }

    }

    const openFolder = async (project: IProject) => {
        ConfigService.openFolder(project.path)
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
        handlerResponse()
    }, [])

    useEffect(() => {
        if (fpmIsStarted && frontStart) {
            DockerService.openWebSite();
            setLoading(false)
        }
    }, [fpmIsStarted, frontStart])

    return (
        <>
            <Loader open={loading} setOpen={setLoading}/>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Project</TableCell>
                            <TableCell align="left">SERVER</TableCell>
                            <TableCell align="left">Docker</TableCell>
                            <TableCell align="left">Active</TableCell>
                            <TableCell align="left">Folder</TableCell>
                            <TableCell align="left">Cron</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {projects.map((row, index) => (
                            <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell component="th" scope="row">
                                    {row.title}
                                </TableCell>
                                <TableCell align="left">{row.server}</TableCell>
                                <TableCell align="left">{row.docker}</TableCell>
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
                                    <Cron project={row}/>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Modal open={log} onClose={() => setLog(false)}>
                <Box sx={style}>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        {logData}
                        <div ref={logEndRef}></div>
                    </Typography>
                </Box>
            </Modal>
        </>
    );
};

export default Projects;
