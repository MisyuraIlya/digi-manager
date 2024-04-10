import { Box, Divider, Grid, TextField, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import React from 'react';

const Configuration = () => {

    const [alignment, setAlignment] = React.useState('');

    const handleChange = (
        event: React.MouseEvent<HTMLElement>,
        newAlignment: string,
    ) => {
        setAlignment(newAlignment);
    };


    return (
        <Box>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <TextField label="Title" variant="standard"  fullWidth/>
                    <TextField label="minimum delivery" variant="standard" />
                    <ToggleButtonGroup
                        sx={{marginTop:'10px'}}
                        color="primary"
                        value={alignment}
                        exclusive
                        onChange={handleChange}
                        aria-label="Platform"
                    >
                        <ToggleButton value="api">WITH STOCK</ToggleButton>
                        <ToggleButton value="ftp">WITHOUT STOCK</ToggleButton>
                    </ToggleButtonGroup>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant='h6' sx={{margin:'10px 0'}}>
                        Color Section
                    </Typography>
                    <Divider/>
                    <Box sx={{display:'flex', gap:'20px'}}>
                        <TextField label="primary" variant="standard" />
                        <TextField label="secondary" variant="standard" />
                    </Box>
                    <Typography>
                        Color Section
                    </Typography>
                    <Divider/>
                    <Box sx={{display:'flex', gap:'20px'}}>
                        <TextField label="primary" variant="standard" />
                        <TextField label="secondary" variant="standard" />
                    </Box>
                </Grid>
            </Grid>
         
        </Box>
    );
};

export default Configuration;