import { Box, Button, IconButton, TextField, ToggleButton, ToggleButtonGroup, Tooltip, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { FtpService } from '../../services/ftpService';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { useWork } from '../../store/work.store';
import InfoIcon from '@mui/icons-material/Info';

const ImagesConfig = () => {
    const {
        categoryState,
        setCategoryState,
        imageState,
        setImageState,
        host,
        setHost,
        usernameFtp,
        setUserNameFtp,
        passwordFtp,
        setPasswordFtp, 
        categoryLvl1, 
        categoryLvl2,
        categoryLvl3, 
        setCategoryLvl1, 
        setCategoryLvl2, 
        setCategoryLvl3
    } = useWork()

    const handleChangeLocation = (
        event: React.MouseEvent<HTMLElement>,
        newAlignment: string,
    ) => {
        setImageState(newAlignment);
    };

    const handleChangeCategory = (
        event: React.MouseEvent<HTMLElement>,
        newAlignment: string,
    ) => {
        setCategoryState(newAlignment);
    };

    const handleCheck = async () => {
        const response = await FtpService.checkFtp('192.168.1.30','ftpuser','123456')
    }

    const [path, setPath]= useState('')
    const [files, setFiles] = useState<IFile[]>([])

    const contents = async () => {
        const res = await FtpService.getDirectoryContents('192.168.1.30','ftpuser','123456',path)
     
    }

    useEffect(() => {
        contents()
    },[path])

    return (
        <Box sx={{display:'flex', justifyContent:'center', marginTop:'40px'}}>
            <Box>
                <Typography sx={{textAlign:'center', padding:'10px'}}>
                    Where images located ?
                </Typography>
                <Box sx={{display:'flex', justifyContent:'center', alignItems:'center', padding:'10px'}}>
                    <ToggleButtonGroup
                        sx={{marginTop:'10px'}}
                        color="primary"
                        value={imageState}
                        exclusive
                        onChange={handleChangeLocation}
                        aria-label="Platform"
                        >
                        <ToggleButton value="api">In Api</ToggleButton>
                        <ToggleButton value="ftp">FTP Folder</ToggleButton>
                    </ToggleButtonGroup>
                </Box>
                { imageState == 'ftp' && 
                    <Box sx={{display:'flex', gap:'20px', alignItems:'center', justifyContent:'center', padding:'10px'}}>
                        <TextField value={host} onChange={(e) => setHost(e.target.value)} id="standard-basic" label="host" variant="standard" />
                        <TextField value={usernameFtp} onChange={(e) => setUserNameFtp(e.target.value)} id="standard-basic" label="username" variant="standard" />
                        <TextField value={passwordFtp} onChange={(e) => setPasswordFtp(e.target.value)} id="standard-basic" label="password" variant="standard" />
                        <Button variant='contained' sx={{mt:'12px'}} onClick={() => handleCheck()}>
                            Check
                        </Button>
                        <Box sx={{paddingTop:'13px'}}>
                            <IconButton>
                                <RemoveRedEyeIcon/>
                            </IconButton>
                        </Box>
                    </Box>
                }
                <Typography sx={{textAlign:'center', padding:'10px'}}>
                   Categories 
                </Typography>
                <Box sx={{display:'flex', justifyContent:'center', alignItems:'center', padding:'10px'}}>
                    <ToggleButtonGroup
                        sx={{marginTop:'10px'}}
                        color="primary"
                        value={categoryState}
                        exclusive
                        onChange={handleChangeCategory}
                        aria-label="Platform"
                        >
                        <ToggleButton value="family">Family table</ToggleButton>
                        <ToggleButton value="card">Product card</ToggleButton>
                    </ToggleButtonGroup>
                </Box>
                { categoryState == 'card' && 
                    <Box sx={{display:'flex', gap:'20px', alignItems:'center', justifyContent:'center', padding:'10px'}}>
                        <TextField value={categoryLvl1} onChange={(e) => setCategoryLvl1(e.target.value)} variant="standard" label="level 1" />
                        <TextField value={categoryLvl2} onChange={(e) => setCategoryLvl2(e.target.value)} variant="standard" label="level 2"/>
                        <TextField value={categoryLvl3} onChange={(e) => setCategoryLvl3(e.target.value)} variant="standard" label="level 3"/>
                        <Tooltip title="SPEC1 ~ SPEC20, additional parameters in priority">
                            <IconButton>
                                <InfoIcon color='info'/>
                            </IconButton>
                        </Tooltip>
                    </Box>
                }
            </Box>
        </Box>
    );
};

export default ImagesConfig;