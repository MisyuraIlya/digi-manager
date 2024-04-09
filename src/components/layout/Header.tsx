import React from 'react';
import { AppBar, Box, Toolbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
const Header = () => {
    const navigate = useNavigate()
    return (
        <>
        <AppBar position="sticky" elevation={0}>
            <Toolbar>
                <Box sx={{ flexGrow: 1, textAlign: 'center', padding:'10px' }}>
                    <img src={process.env.PUBLIC_URL + '/icon.png'} alt="Icon" style={{ height: 50, width: 'auto' }} onClick={() => navigate('/')}/>
                </Box>
            </Toolbar>
        </AppBar>
        </>
    );
};

export default Header;