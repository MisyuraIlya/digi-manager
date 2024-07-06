import { Box, Button, FormControl, InputLabel, MenuItem, Modal, Select, SelectChangeEvent, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

interface IEndPoint {
    path: string
    title: string
}
const ApiChecker = () => {
    const [open, setOpen] = useState(false)
    const [erp, setErp] = useState('');
    const [apiUrl, setApiUrl] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [companyDB, setCompanyDB] = useState('');
    const [endpoints, setEndpoints] = useState<IEndPoint[]>()
    
    const erps = [
        {
            name:'Priority',
            endpoints:[
                {
                    'path':'/CUSTOMERS',
                    'title':'לקוחות'
                },
                {
                    'path':'/LOGPART',
                    'title':'פריטים'
                },
                {
                    'path':'/FAMILY_LOG',
                    'title':'משפחות מוצר'
                },
                {
                    'path':'/ORDERS',
                    'title':'הזמנות'
                },
                {
                    'path':'/AINVOICES',
                    'title':'חשבוניות מס קבלה'
                },
                {
                    'path':'/CINVOICES',
                    'title':'חשבוניות מרכזות'
                },
                {
                    'path':'/DOCUMENTS_N',
                    'title':'החזרות'
                },
                {
                    'path':'/DOCUMENTS_D',
                    'title':'?'
                },
                {
                    'path':'/CPROF',
                    'title':'הצעות מחיר'
                },
                {
                    'path':'/PRICELIST',
                    'title': 'מחירונים'
                },
                {
                    'path':'/OBLIGO',
                    'title': 'כספים'
                },
                {
                    'path':'/AGENTS',
                    'title':'סוכנים'
                },
                {
                    'path':'/ACCOUNTS_RECEIVABLE',
                    'title':'גיול חובות'
                }
            ]
        },
        {

        }
    ]

    const handleCheckAllEndpoints = async () => {
        // setOpen(true)
        if (!apiUrl || !username || !password) {
            console.error('Please fill in all required fields.');
            return;
        }

        try {
            const endpoints = erps.find(item => item.name === erp)?.endpoints || [];
            for (const endpoint of endpoints) {
                const response = await axios.get(`${apiUrl}${endpoint.path}`, {
                    auth: {
                        username: username,
                        password: password
                    }
                });
            }
        } catch (error) {
            console.error('Error checking endpoints:', error);
        }
    };

    const handleChange = (event: SelectChangeEvent) => {
        const find = erps?.find((item) => item.name === event.target.value)
        setEndpoints(find?.endpoints)
        setErp(event.target.value as string);
    };

    return (
        <Box sx={{marginTop:'50px'}}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Age</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    sx={{color:'white'}}
                    value={erp}
                    label="Age"
                    onChange={handleChange}
                >
                    {erps?.map((item,index) => 
                        <MenuItem key={index} value={'Priority'} sx={{color:'black'}}>{item.name}</MenuItem>
                    )}
                </Select>
                <TextField value={apiUrl} onChange={(e) => setApiUrl(e.target.value)} id="outlined-basic" label="username" variant="outlined" InputProps={{ style: { color: 'white' } }} InputLabelProps={{ style: { color: 'white' } }}/>
                <TextField value={username} onChange={(e) => setUsername(e.target.value)} id="outlined-basic" label="username" variant="outlined" InputProps={{ style: { color: 'white' } }} InputLabelProps={{ style: { color: 'white' } }}/>
                <TextField value={password} onChange={(e) => setPassword(e.target.value)} id="outlined-basic" label="password" variant="outlined" InputProps={{ style: { color: 'white' } }} InputLabelProps={{ style: { color: 'white' } }}/>
                {erp == 'SAP' &&
                    <TextField id="outlined-basic" label="company db" variant="outlined" InputProps={{ style: { color: 'white' } }} InputLabelProps={{ style: { color: 'white' } }}/>
                }
                <Button color='secondary' variant='contained' onClick={handleCheckAllEndpoints} sx={{margin:'0 100px'}}>
                    Check
                </Button>
            </FormControl>
            <Modal
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                >
                <Box sx={style}>
                    {endpoints?.map((element,index) => 
                        <Box key={index}>
                            {element.title}
                        </Box>
                    )}
                </Box>
            </Modal>
        </Box>
    );
};

export default ApiChecker;