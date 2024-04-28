import { Box, Divider, Grid, TextField, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import React from 'react';
import { useWork } from '../../store/work.store';

const Configuration = () => {
    const {imageState,setImageState,primaryColor,secondaryColor, setPrimaryColor, setSecondaryColor, title, minimumDelivery, setTitle, setMinimumDelivery} = useWork()

    return (
        <Box>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <TextField label="Title" variant="standard"  fullWidth value={title} onChange={(e) => setTitle(e.target.value)} />
                    <TextField label="minimum delivery" variant="standard" type='number' value={minimumDelivery} onChange={(e) => setMinimumDelivery(+e.target.value)}/>
                    <ToggleButtonGroup
                        sx={{marginTop:'10px'}}
                        color="primary"
                        value={imageState}
                        exclusive
                        onChange={(e,value) => setImageState(value)}
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
                        <TextField label="primary" variant="standard" value={primaryColor} onChange={(e) => setPrimaryColor(e.target.value)}/>
                        <TextField label="secondary" variant="standard" value={secondaryColor} onChange={(e) => setSecondaryColor(e.target.value)}/>
                    </Box>
                </Grid>
            </Grid>
         
        </Box>
    );
};

export default Configuration;