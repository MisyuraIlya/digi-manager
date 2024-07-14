import React from 'react';

import { Box, Divider, Grid, TextField, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { useConfig } from '../../store/config.store';
import { themeColors } from '../../styles/mui';
import ImageUploader from '../../utils/ImageUploader';

const Configuration = () => {
    const {
        primaryColor,
        secondaryColor, 
        setPrimaryColor, 
        setSecondaryColor, 
        title, 
        setTitle, 
        minimumPrice, 
        setMinimumPrice, 
        deliveryPrice,
        setDeliveryPrice,
        description,
        setDescription,
        isWithStock,
        setIsWithStock,
        isWithMigvan,
        setIsWithMigvan,
        isOpenWorld,
        setIsOpenWorld,
        email,
        setEmail,
        location,
        setLocation,
        phoneSupport,
        setPhoneSupport,
        fax,
        setFax,
        footerDescription1,
        setDescription1,
        footerDescription2,
        setDescription2,
        footerDescription3,
        setDescription3,
        logoFile,
        setLogoFile,
    } = useConfig()

    return (
    <Box>
        <Grid container spacing={12}>
            <Grid item xs={6} >
                <Typography variant='h6' sx={{padding:'10px 5px'}}>
                Main Information
                </Typography>
                <Divider/>
                <TextField 
                    sx={{margin:'10px 0'}}
                    label="Title"
                    variant="standard"  
                    fullWidth value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                />
                <TextField
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    sx={{margin:'10px 0'}}
                    label="description"
                    fullWidth
                    placeholder="description in the video section"
                    multiline
                    rows={2}
                    maxRows={4}
                />
                <TextField 
                    sx={{margin:'10px 0'}}
                    fullWidth
                    label="minimum price order" 
                    variant="standard" 
                    type='number' 
                    value={minimumPrice} 
                    onChange={(e) => setMinimumPrice(+e.target.value)}
                />
                <TextField 
                    sx={{margin:'10px 0'}}
                    fullWidth
                    label="delivery price" 
                    variant="standard" 
                    type='number' 
                    value={deliveryPrice} 
                    onChange={(e) => setDeliveryPrice(+e.target.value)}
                />
                <Box sx={{marginTop:'70px'}}>
                    <ToggleButtonGroup
                        sx={{marginTop:'20px', display:'flex', justifyContent:'center', alignItems:'center'}}
                        color="primary"
                        value={isWithStock}
                        exclusive
                        onChange={(e,value) => setIsWithStock(value)}
                        aria-label="Platform"
                    >
                        <ToggleButton value="api" sx={{ '&.Mui-selected': { backgroundColor: themeColors.primary, color:'white' } }}>
                            WITH STOCK
                        </ToggleButton>
                        <ToggleButton value="ftp" sx={{ '&.Mui-selected': { backgroundColor: themeColors.primary, color:'white' } }}>
                            WITHOUT STOCK
                        </ToggleButton>
                    </ToggleButtonGroup>
                    <ToggleButtonGroup
                        sx={{marginTop:'20px', marginBottom:'20px' , display:'flex', justifyContent:'center', alignItems:'center'}}
                        color="primary"
                        value={isWithMigvan}
                        exclusive
                        onChange={(e,value) => setIsWithMigvan(value)}
                        aria-label="Platform"
                    >
                        <ToggleButton value="api" sx={{ '&.Mui-selected': { backgroundColor: themeColors.primary, color:'white' } }}>
                            WITH MIGVAN
                        </ToggleButton>
                        <ToggleButton value="ftp" sx={{ '&.Mui-selected': { backgroundColor: themeColors.primary, color:'white' } }}>
                            WITHOUT MIGVAN
                        </ToggleButton>
                    </ToggleButtonGroup>
                    <ToggleButtonGroup
                        sx={{marginTop:'20px', display:'flex', justifyContent:'center', alignItems:'center'}}
                        color="primary"
                        value={isOpenWorld}
                        exclusive
                        onChange={(e,value) => setIsOpenWorld(value)}
                        aria-label="Platform"
                    >
                        <ToggleButton value="api" sx={{ '&.Mui-selected': { backgroundColor: themeColors.primary, color:'white' } }}>
                            OPEN TO WORLD
                        </ToggleButton>
                        <ToggleButton value="ftp" sx={{ '&.Mui-selected': { backgroundColor: themeColors.primary, color:'white' } }}>
                            CLOSED TO WORLD
                        </ToggleButton>
                    </ToggleButtonGroup>
                </Box>
                <Typography variant='h6' sx={{padding:'10px 5px', marginTop:'75px'}}>
                Footer description
                </Typography>
                <Divider/>
                <TextField 
                    sx={{margin:'10px 0'}}
                    label="email support" 
                    variant="standard"  
                    fullWidth value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                />
                <TextField 
                    sx={{margin:'10px 0'}}
                    label="location"
                    variant="standard"  
                    fullWidth value={location} 
                    onChange={(e) => setLocation(e.target.value)} 
                />
                <TextField 
                    sx={{margin:'10px 0'}}
                    label="phone support"
                    variant="standard"  
                    fullWidth value={phoneSupport} 
                    onChange={(e) => setPhoneSupport(e.target.value)} 
                />
                <TextField 
                    sx={{margin:'10px 0'}}
                    label="fax"
                    variant="standard"  
                    fullWidth value={fax} 
                    onChange={(e) => setFax(e.target.value)} 
                />
                <TextField
                    value={footerDescription1}
                    onChange={(e) => setDescription1(e.target.value)}
                    sx={{margin:'10px 0'}}
                    label="footer description 1"
                    fullWidth
                    placeholder="footer description 1"
                    multiline
                    rows={2}
                    maxRows={4}
                />
                <TextField
                    value={footerDescription2}
                    onChange={(e) => setDescription2(e.target.value)}
                    sx={{margin:'10px 0'}}
                    label="footer description 2"
                    fullWidth
                    placeholder="footer description 2"
                    multiline
                    rows={2}
                    maxRows={4}
                />
                <TextField
                    value={footerDescription3}
                    onChange={(e) => setDescription3(e.target.value)}
                    sx={{margin:'10px 0'}}
                    label="footer description 3"
                    fullWidth
                    placeholder="footer description 3"
                    multiline
                    rows={2}
                    maxRows={4}
                />
            </Grid>
            <Grid item xs={6} sx={{position:'relative'}}>
                <Typography variant='h6' sx={{padding:'10px 5px'}}>
                    Color Section
                </Typography>
                <Divider/>
                <Box sx={{display:'flex', gap:'20px', margin:'10px 0' }}>
                    <TextField label="primary" variant="standard" value={primaryColor} onChange={(e) => setPrimaryColor(e.target.value)}/>
                    <TextField label="secondary" variant="standard" value={secondaryColor} onChange={(e) => setSecondaryColor(e.target.value)}/>
                </Box>
                <Typography variant='h6' sx={{padding:'10px 5px'}}>
                    Logo
                </Typography>
                <Divider/>
                <Box sx={{margin:'20px 0'}}>
                </Box>
                <ImageUploader image={logoFile} onChange={(e) => setLogoFile(e)}/>
            </Grid>
        </Grid>
    </Box>
    );
};

export default Configuration;