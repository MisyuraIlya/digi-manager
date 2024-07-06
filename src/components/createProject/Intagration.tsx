import { Box, Divider, Grid, TextField, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useWork } from '../../store/work.store';

const Intagration = () => {
    const [smsCenter, setSmsCenter] = useState('');

    const handleChange = (
        event: React.MouseEvent<HTMLElement>,
        newAlignment: string,
    ) => {
        setSmsCenter(newAlignment);
    };

    const handleChangePaymeny = (
        event: React.MouseEvent<HTMLElement>,
        newAlignment: string,
    ) => {
        setPaymentSystem(newAlignment);
    };

    const {
        oneSignalApi,
        oneSignalKey,
        setSmsApi,
        setSmsToken,
        smsCenterToken,
        setSmsCenterToken,
        paymentSystem,
        setPaymentSystem,
        masof,
        setMasof,
        paymentKey,
        setPaymentKey,
        passp,
        setPassp
    } = useWork()
    
    return (
        <Box>
            <Grid container spacing={12}>
                <Grid item xs={6}>
                    <Typography variant='h6' sx={{ marginTop:'30px' }}>
                    One signal
                    </Typography>
                    <Divider/>
                    <Box sx={{marginTop:'25px'}}/>
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
                </Grid>
                <Grid item xs={6}>
                    <Box sx={{display:'flex', justifyContent:'center',alignItems:'center', marginTop:'30px'}}>
                        <ToggleButtonGroup
                            sx={{marginTop:'10px'}}
                            color="primary"
                            value={smsCenter}
                            exclusive
                            onChange={handleChange}
                            aria-label="Platform"
                            >
                            <ToggleButton value="flashy">Flashy</ToggleButton>
                            <ToggleButton value="inforu">Inforu</ToggleButton>
                        </ToggleButtonGroup>
                    </Box>
                    <TextField 
                        sx={{margin:'10px 0'}}
                        fullWidth
                        label="api endpoint" 
                        variant="standard" 
                        value={smsCenterToken} 
                        onChange={(e) => setSmsCenterToken(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12}>
                        <Typography variant='h5' fontWeight={700}>
                            Payment method
                        </Typography>
                        <ToggleButtonGroup
                            sx={{marginTop:'10px'}}
                            color="primary"
                            value={paymentSystem}
                            exclusive
                            onChange={handleChangePaymeny}
                            aria-label="Platform"
                        >
                            <ToggleButton value="yadsarig">YAD SARIG</ToggleButton>
                            <ToggleButton value="tranzilla">Tranzilla</ToggleButton>
                            <ToggleButton value="none">None</ToggleButton>
                        </ToggleButtonGroup>
                        { paymentSystem  == 'yadsarig' &&
                            <Box>
                                <TextField 
                                    sx={{margin:'10px 0'}}
                                    fullWidth
                                    label="masof" 
                                    variant="standard" 
                                    value={masof} 
                                    onChange={(e) => setMasof(e.target.value)}
                                />
                                <TextField 
                                    sx={{margin:'10px 0'}}
                                    fullWidth
                                    label="payment key" 
                                    variant="standard" 
                                    value={paymentKey} 
                                    onChange={(e) => setPaymentKey(e.target.value)}
                                />
                                <TextField 
                                    sx={{margin:'10px 0'}}
                                    fullWidth
                                    label="passp" 
                                    variant="standard" 
                                    value={passp} 
                                    onChange={(e) => setPassp(e.target.value)}
                                />
                            </Box>
                        }
                        { paymentSystem  == 'tranzilla' &&
                            <Box>
                                
                            </Box>
                        }
                </Grid>
            </Grid>
        </Box>
    );
};

export default Intagration;