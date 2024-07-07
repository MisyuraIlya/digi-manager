import { Box, Divider, TextField, Typography } from '@mui/material';
import React from 'react';
import { useConfig } from '../../store/config.store';

const Deploy = () => {
    const {domain, setDomain} = useConfig()
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