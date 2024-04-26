import { Box, Button, IconButton, TextField, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { FtpService } from '../../services/ftpService';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

const ImagesConfig = () => {
    const [alignment, setAlignment] = React.useState('');
    const [host, setHost] = useState('');
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleChange = (
        event: React.MouseEvent<HTMLElement>,
        newAlignment: string,
    ) => {
        setAlignment(newAlignment);
    };

    const handleCheck = async () => {
        const response = await FtpService.checkFtp('192.168.1.30','ftpuser','123456')
    }







    const [path, setPath]= useState('')
    const [files, setFiles] = useState<IFile[]>([])

 

    const contents = async () => {
        const res = await FtpService.getDirectoryContents('192.168.1.30','ftpuser','123456',path)
        console.log('contents',res)
        // setFiles(res)
     
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
                        value={alignment}
                        exclusive
                        onChange={handleChange}
                        aria-label="Platform"
                        >
                        <ToggleButton value="api">In Api</ToggleButton>
                        <ToggleButton value="ftp">FTP Folder</ToggleButton>
                    </ToggleButtonGroup>
                </Box>
                {alignment == 'ftp' && 
                    <Box sx={{display:'flex', gap:'20px', alignItems:'center', justifyContent:'center', padding:'10px'}}>
                        <TextField value={host} onChange={(e) => setHost(e.target.value)} id="standard-basic" label="host" variant="standard" />
                        <TextField value={username} onChange={(e) => setUsername(e.target.value)} id="standard-basic" label="username" variant="standard" />
                        <TextField value={password} onChange={(e) => setPassword(e.target.value)} id="standard-basic" label="password" variant="standard" />
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
                <Box>

                </Box>
            </Box>
        </Box>
    );
};

export default ImagesConfig;