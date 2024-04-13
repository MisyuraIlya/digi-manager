import { Timeline, TimelineConnector, TimelineContent, TimelineDot, TimelineItem, TimelineOppositeContent, TimelineSeparator, timelineItemClasses } from '@mui/lab';
import { Box, Button, FormControl, InputLabel, LinearProgress, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import React, { useState } from 'react';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import { ApiCheckerService } from '../../services/apiChecker.services';

const erps = [
    {
        name:'Priority',
        endpoints:[
            {
                'path':'CUSTOMERS',
                'title':'לקוחות',
                status:'null',
            },
            {
                'path':'LOGPART',
                'title':'פריטים',
                status:'null',
            },
            {
                'path':'FAMILY_LOG',
                'title':'משפחות מוצר',
                status:'null',
            },
            {
                'path':'ORDERS',
                'title':'הזמנות',
                status:'null',
            },
            {
                'path':'AINVOICES',
                'title':'חשבוניות מס קבלה',
                status:'null',
            },
            {
                'path':'CINVOICES',
                'title':'חשבוניות מרכזות',
                status:'null',
            },
            {
                'path':'DOCUMENTS_N',
                'title':'החזרות',
                status:'null',
            },
            {
                'path':'DOCUMENTS_D',
                'title':'?',
                status:'null',
            },
            {
                'path':'CPROF',
                'title':'הצעות מחיר',
                status:'null',
            },
            {
                'path':'PRICELIST',
                'title': 'מחירונים',
                status:'null',
            },
            {
                'path':'OBLIGO',
                'title': 'כספים',
                status:'null',
            },
            {
                'path':'AGENTS',
                'title':'סוכנים',
                status:'null',
            },
            {
                'path':'ACCOUNTS_RECEIVABLE',
                'title':'גיול חובות',
                status:'null',
            }
        ]
    },
    {

    }
]

interface IEndPoint {
    path: string
    title: string
    status: 'null' | 'error' | 'success'
}

const ApiValidation = () => {
    const [erp, setErp] = React.useState('');
    const [endpoints, setEndpoints] = useState<IEndPoint[]>()
    const [show, setShow] = useState(false)

    const handleCheck = async () => {
        setShow(true)
        if (endpoints) {
            for (let i = 0; i < endpoints.length; i++) {
                const result = await ApiCheckerService.checkUrl(endpoints[i].path,'dataportal','54362')
                const updatedEndpoints = [...endpoints];
                updatedEndpoints[i].status = result.result === 'success' ? 'success' : 'error';
                setEndpoints(updatedEndpoints);
            }
        }
    };

    const handleChange = (event: SelectChangeEvent) => {
        const find = erps?.find((item) => item.name === event.target.value)
        setEndpoints(find?.endpoints as IEndPoint[]); 
        setErp(event.target.value as string);
    };



    return (
        <Box sx={{margin:'0 70px'}}>
           <FormControl fullWidth sx={{marginTop:'40px'}}>
                <InputLabel id="demo-simple-select-label">ERP</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={erp}
                    label="Age"
                    onChange={handleChange}
                >
                    <MenuItem value={'Priority'}>Priority</MenuItem>
                    <MenuItem value={'Sap'}>SAP</MenuItem>
                </Select>
            </FormControl>

            <Timeline
                    sx={{
                        [`& .${timelineItemClasses.root}:before`]: {
                        flex: 0,
                        padding: 0,
                        },
                    }}
                >
                {show && endpoints?.map((item,index) =>
                    <TimelineItem key={index} sx={{display:'flex', justifyContent:'left'}}>
                        <TimelineSeparator sx={{width:'10px'}}>
                            {item?.status == 'null' &&
                                <TimelineDot /> 
                            }
                            {item?.status == 'success' &&
                                <DoneIcon color='success'/> 
                            }
                            {item?.status == 'error' &&
                                <CloseIcon color='error'/> 
                            }
                            <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent>
                            {item.path}  - {item.title} 
                        </TimelineContent>
                        <TimelineContent >
                            {item?.status == 'null' &&
                                <LinearProgress sx={{marginTop:'10px'}}/>                        
                            }
                        </TimelineContent>
                    </TimelineItem>
                )}
            </Timeline>
            <Button variant='contained' sx={{borderRadius:'50px', fontSize:'20px', marginTop:'50px' ,fontWeight:400, lineHeight:'24px', padding:'15px 30px'}} onClick={() => handleCheck()}>
                Check
            </Button>
        </Box>
    );
};

export default ApiValidation;