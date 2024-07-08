import { Box, Button, IconButton, Snackbar, TextField, ToggleButton, ToggleButtonGroup, Tooltip, Typography } from '@mui/material';
import React, { useState } from 'react';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import InfoIcon from '@mui/icons-material/Info';
import { useConfig } from '../../store/config.store';
import { FtpService } from '../../services/ftpService';
import CloseIcon from '@mui/icons-material/Close';
import { useProcess } from '../../providers/ProcessProvider';

const Images = () => {
    const {imageState, setImageState,ftpHost,ftpUsername,ftpPassword, setFtpHost,setFtpUsername,setFtpPassword,categoryState,setCategoryState,categoryLvl1,categoryLvl2,categoryLvl3, setCategoryLvl1,setCategoryLvl2,setCategoryLvl3, testUser, setTestUser} = useConfig()
    const [alert,setAlert] = useState(false)
    const [alertMessage,setAlertMessage] = useState('')
    const {setLoading} = useProcess()
    
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
        try {
            setLoading(true)
            const response = await FtpService.checkFtp('192.168.1.30','ftpuser','123456')
            if(response?.result === 'success') {
                setAlert(true)
                setAlertMessage('ftp connestion success: '+ response.message)
            } else {
                setAlert(true)
                setAlertMessage('error ftp connection: '+ response.message)
            }
        } catch(e) {
            console.log('[ERROR]',e)
        } finally {
            setLoading(false)
        }
     
    }

    const action = (
        <React.Fragment>
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={() => setAlert(false)}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </React.Fragment>
      );

    return (
    <Box sx={{display:'flex', justifyContent:'center', marginTop:'40px'}}>
        <Snackbar
            open={alert}
            autoHideDuration={6000}
            onClose={() => setAlert(false)}
            message={alertMessage}
            action={action}
        />
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
                    <TextField value={ftpHost} onChange={(e) => setFtpHost(e.target.value)} id="standard-basic" label="host" variant="standard" />
                    <TextField value={ftpUsername} onChange={(e) => setFtpUsername(e.target.value)} id="standard-basic" label="username" variant="standard" />
                    <TextField value={ftpPassword} onChange={(e) => setFtpPassword(e.target.value)} id="standard-basic" label="password" variant="standard" />
                    <Button variant='contained' sx={{mt:'12px'}} onClick={() => handleCheck()}>
                        Check
                    </Button>
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
            <Box>
                <Typography sx={{textAlign:'center', padding:'10px'}}>
                    user configuration
                </Typography>
                <Box sx={{display:'flex', justifyContent:'center', alignItems:'center', padding:'10px'}}>
                    <TextField value={testUser} onChange={(e) => setTestUser(e.target.value)} variant="standard" label="test user external id" />
                </Box>
            </Box>
        </Box>
    </Box>
    );
};

export default Images;