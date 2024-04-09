import { AppBar, Box, Drawer, Grid, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { themeColors } from '../../styles/mui';
import SettingsRemoteIcon from '@mui/icons-material/SettingsRemote';
import PestControlIcon from '@mui/icons-material/PestControl';
import PhishingIcon from '@mui/icons-material/Phishing';
import DnsIcon from '@mui/icons-material/Dns';
import DoorBackIcon from '@mui/icons-material/DoorBack';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ModalWrapper from '../../utils/modal/ModalWrapper';
import { NativeServices } from '../../services/native.services';
import { useNavigate } from 'react-router-dom';
import ApiIcon from '@mui/icons-material/Api';

const Header = () => {
    const [open, setOpen] = useState(false);
    const [openModal, setModalOpen] = useState(false)
    const [localIp, setLocalUp] = useState<ILocalIps>({localIp:'',publicIp:'',connectedDevices:[]})
    const navigate = useNavigate()
    const toggleDrawer = (newOpen: boolean) => () => {
      setOpen(newOpen);
    };

    const handleLocalIp = async () => {
        const response = await NativeServices.getIps()
        setLocalUp(response)
    }

    const DrawerList = (
        <Box sx={{ width: 250, bgcolor:themeColors.primary, minHeight:'100vh'}} role="presentation" onClick={toggleDrawer(false)}>
          <List>
            <ListItem>
                <ListItemButton onClick={() => navigate('/remoter')}>
                    <ListItemIcon >
                        <SettingsRemoteIcon sx={{color:themeColors.secondary}}/> 
                    </ListItemIcon>
                    <ListItemText primary={'Remoter'} sx={{color:'white'}}/>
                </ListItemButton>
            </ListItem>
            <ListItem>
                <ListItemButton>
                    <ListItemIcon>
                        <PestControlIcon sx={{color:themeColors.secondary}}/> 
                    </ListItemIcon>
                    <ListItemText primary={'Exploits'} sx={{color:'white'}}/>
                </ListItemButton>
            </ListItem>
            <ListItem>
                <ListItemButton>
                    <ListItemIcon>
                        <PhishingIcon sx={{color:themeColors.secondary}}/> 
                    </ListItemIcon>
                    <ListItemText primary={'Fishing'} sx={{color:'white'}}/>
                </ListItemButton>
            </ListItem>
            <ListItem>
                <ListItemButton>
                    <ListItemIcon>
                        <DnsIcon sx={{color:themeColors.secondary}}/> 
                    </ListItemIcon>
                    <ListItemText primary={'Servers'} sx={{color:'white'}}/>
                </ListItemButton>
            </ListItem>
            <ListItem>
                <ListItemButton>
                    <ListItemIcon>
                        <DoorBackIcon sx={{color:themeColors.secondary}}/> 
                    </ListItemIcon>
                    <ListItemText primary={'Backdoors'} sx={{color:'white'}}/>
                </ListItemButton>
            </ListItem>
            <ListItem>
                <ListItemButton onClick={() => navigate('/apiChecker')}>
                    <ListItemIcon>
                        <ApiIcon sx={{color:themeColors.secondary}}/> 
                    </ListItemIcon>
                    <ListItemText primary={'API checker'} sx={{color:'white'}}/>
                </ListItemButton>
            </ListItem>
          </List>
        </Box>
    );

    useEffect(() => {
        handleLocalIp()
    },[])
    
    return (
        <>
        <AppBar position="sticky" sx={{bgcolor:themeColors.primary}}>
            <Toolbar>
                <IconButton
                    onClick={() => setOpen(!open)}
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2, color:'white' }}
                >
                    <MenuIcon sx={{fontSize:'32px'}}/>
                </IconButton>
                <Box sx={{ flexGrow: 1, textAlign: 'center', padding:'10px' }}>
                    <img src={process.env.PUBLIC_URL + '/icon.png'} alt="Icon" style={{ height: 50, width: 'auto' }} />
                </Box>
                <IconButton onClick={() => setModalOpen(true)}>  
                    <AccountBoxIcon sx={{color:'white', fontSize:'32px'}}/>
                </IconButton>
            </Toolbar>
        </AppBar>
        <Drawer open={open} onClose={toggleDrawer(false)}>
            {DrawerList}
        </Drawer>
        <ModalWrapper active={openModal} setActive={setModalOpen} height={70} width={60}>
            <Box>
                <Grid container spacing={4}>
                    <Grid item xs={4}>
                        <Typography variant='body1'>Local IP</Typography>
                    </Grid>
                    <Grid item xs={8}>
                        <Typography variant='body1'> {localIp.localIp}</Typography>
                    </Grid>
                </Grid>
                <Grid container spacing={4}>
                    <Grid item xs={4}>
                        <Typography variant='body1'>Public IP</Typography>
                    </Grid>
                    <Grid item xs={8}>
                        <Typography variant='body1'>{localIp.publicIp}</Typography>
                    </Grid>
                </Grid>
                <Typography sx={{marginTop:'20px'}} variant='body1'>Connected Devices</Typography>
                <List>
                    {localIp?.connectedDevices?.map((item,index) =>
                        <ListItem key={index}>
                            <ListItemText primary={`${index + 1} - ${item} ${localIp?.localIp === item ? ' - MY IP' : ''}`}/>
                        </ListItem>
                    )}
                </List>
            </Box>
        </ModalWrapper>

        </>

    );
};

export default Header;