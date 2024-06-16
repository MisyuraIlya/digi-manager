import { Box, Button, Divider, Grid, TextField, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useWork } from '../../store/work.store';
import ImageUploader from '../../utils/ImageUploader';
import { themeColors } from '../../styles/mui';

const Configuration = () => {

    const {
        imageState,
        setImageState,
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
        deployConfig,
        description,
        setDescription,
        isWithStock,
        setIsWithStock,
        isWithMigvan,
        setIsWithMigvan,
        email,
        setEmail,
        footerDescription1,
        setDescription1,
        footerDescription2,
        setDescription2,
        footerDescription3,
        setDescription3,
        oneSignalApi,
        setOneSignalApi,
        oneSignalKey,
        setOneSignalKey,
        smsApi,
        setSmsApi,
        smsToken,
        setSmsToken,
    } = useWork()

    const [file, setFile] = useState<File | null>(null)
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
                        fullWidth value={title} 
                        onChange={(e) => setTitle(e.target.value)} 
                    />
                    <TextField 
                        sx={{margin:'10px 0'}}
                        label="phone support"
                        variant="standard"  
                        fullWidth value={title} 
                        onChange={(e) => setTitle(e.target.value)} 
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
                    <ImageUploader image={file} onChange={(e) => setFile(e)}/>
                    <Typography variant='h6' sx={{padding:'10px 5px', marginTop:'84px'}}>
                       One signal
                    </Typography>
                    <Divider/>
                    <TextField 
                        sx={{margin:'10px 0'}}
                        fullWidth
                        label="one signal api key" 
                        variant="standard" 
                        value={oneSignalApi} 
                        onChange={(e) => setSmsApi(e.target.value)}
                    />

                    <TextField 
                        sx={{margin:'10px 0'}}
                        fullWidth
                        label="one signal chrome key" 
                        variant="standard" 
                        value={oneSignalKey} 
                        onChange={(e) => setSmsToken(e.target.value)}
                    />
                    <Typography variant='h6' sx={{padding:'10px 5px', marginTop:'5px'}}>
                       SMS center
                    </Typography>
                    <Divider/>
                    <TextField 
                        sx={{margin:'10px 0'}}
                        fullWidth
                        label="api endpoint" 
                        variant="standard" 
                        value={smsApi} 
                        onChange={(e) => setSmsApi(e.target.value)}
                    />
                    <TextField 
                        sx={{margin:'10px 0'}}
                        fullWidth
                        label="token" 
                        variant="standard" 
                        value={smsToken} 
                        onChange={(e) => setSmsToken(e.target.value)}
                    />
                    <Button variant='contained' onClick={() => deployConfig(file)} sx={{position:'absolute', bottom:'5px', right:'25%', minWidth:'200px'}}>
                        save options
                    </Button>
                </Grid>
            </Grid>
      

        </Box>
    );
};

export default Configuration;