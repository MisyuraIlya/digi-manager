import React, { useState } from 'react';
import { AppBar, Box, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import AccountTreeIcon from '@mui/icons-material/AccountTree';

const Header = () => {
    const navigate = useNavigate()
    const [open, setOpen] = useState(false)
    return (
        <>
        <AppBar position="sticky" elevation={0}>
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                    onClick={() => setOpen(true)}
                >
                    <MenuIcon />
                </IconButton>
                <Box sx={{ flexGrow: 1, textAlign: 'center', padding:'10px' }}>
                    <img src={process.env.PUBLIC_URL + '/icon.png'} alt="Icon" style={{ height: 50, width: 'auto' }} onClick={() => navigate('/')}/>
                </Box>
            </Toolbar>
        </AppBar>
        <Drawer
            anchor={'left'}
            open={open}
            onClose={() => setOpen(false)}
            >
            <Box sx={{width:'260px', padding:'20px 0'}}>
                <Typography variant='h5' textAlign={'center'}>
                    Digi Manager
                </Typography>
                <List>
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => navigate('/projects')}>
                        <ListItemIcon>
                            <AccountTreeIcon />
                        </ListItemIcon>
                        <ListItemText primary="Projects" />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Box>
        </Drawer>
        </>
    );
};

export default Header;