import { Box, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import React from 'react';

const ImagesConfig = () => {
    const [alignment, setAlignment] = React.useState('');

    const handleChange = (
        event: React.MouseEvent<HTMLElement>,
        newAlignment: string,
    ) => {
        setAlignment(newAlignment);
    };


    return (
        <Box sx={{display:'flex', justifyContent:'center', marginTop:'40px'}}>
            <Box>
                <Typography>
                    Where images located ?
                </Typography>
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
                {alignment == 'ftp' && 
                    <Box>
                        FTP
                    </Box>
                }
            </Box>
        </Box>
    );
};

export default ImagesConfig;