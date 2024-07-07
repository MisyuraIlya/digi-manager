import { Box,Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { DockerService } from '../services/docker.services';
import Card from '../components/projects/Card';
import Loader from '../components/Loader';
import { useDeploying } from '../providers/DeployingProvider';


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
    const [logModal, setLogModal] = useState(false);
    const logEndRef = useRef<HTMLDivElement | null>(null);
    const [loading, setLoading] = useState(false)
    const { dataLog } = useDeploying()
    
    const fetchProjects = async () => {
        const response = await DockerService.getProjects()
        const res = [] as IProject[]
        response?.data?.map((item: IProject) => {
            let obj = {
                title: item.title,
                path: item.path,
                isActive: true,
                version: item.version
            }
            res.push(obj)
        })
        setProjects(res)
    }

    useEffect(() => {
        fetchProjects()
    }, [])

    return (
        <>
            <Loader open={loading} setOpen={setLoading}/>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Project</TableCell>
                            <TableCell align="left">Active</TableCell>
                            <TableCell align="left">Folder</TableCell>
                            <TableCell align="left">Version</TableCell>
                            <TableCell align="left">Cron</TableCell>
                            <TableCell align="left">Options</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {projects.map((row, index) => (
                            <Card row={row} index={index} fetchProjects={fetchProjects}/>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Modal open={logModal} onClose={() => setLogModal(false)}>
                <Box sx={style}>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        {dataLog && dataLog?.map((item) => 
                            <Typography gutterBottom>
                            {item}
                            </Typography>
                        )}
                        <div ref={logEndRef}></div>
                    </Typography>
                </Box>
            </Modal>
        </>
    );
};

export default Projects;
