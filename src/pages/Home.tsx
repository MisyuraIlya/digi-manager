import React from 'react';
import { Box, Button, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';



const Home = () => {
    const navigate = useNavigate()
    return (
        <Box sx={{display:'flex', justifyContent:'center', alignItems:'center', height:'90vh'}}>
            <Grid container spacing={1}>
                <Grid item xs={7}>
                    <Box sx={{margin:'0 50px'}}>
                        <Typography variant='h3' color={'primary'} fontWeight={700} letterSpacing={'2px'}> 
                        Digitrade B2B Manager
                        </Typography>
                        <Typography variant='h5' color={'primary'} fontWeight={600} sx={{marginTop:'10px'}}> 
                        B2B SaaS Solutions. All-in-one Platform
                        </Typography>
                        <Box sx={{display:'flex', gap:'20px', marginTop:'30px'}}>
                            <Button variant='contained' sx={{borderRadius:'50px', fontSize:'20px', fontWeight:400, lineHeight:'24px', padding:'15px 30px'}} onClick={() => navigate('createProject')}> 
                                CREATE PROJECT
                            </Button>
                            <Button variant='outlined' sx={{borderRadius:'50px', fontSize:'20px', fontWeight:400, lineHeight:'24px', padding:'15px 30px'}}>
                                CREATE DEMO
                            </Button>
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={5} sx={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                    <Box sx={{width:'90%'}}>
                        <img src={process.env.PUBLIC_URL + '/hero.png'} alt="Icon" style={{width:'100%'}}/>
                    </Box>
                </Grid>

            </Grid>
        </Box>
    );
};

export default Home;