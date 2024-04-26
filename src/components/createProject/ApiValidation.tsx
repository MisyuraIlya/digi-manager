import { Timeline, TimelineConnector, TimelineContent, TimelineDot, TimelineItem, TimelineOppositeContent, TimelineSeparator, timelineItemClasses } from '@mui/lab';
import { Box, Button, FormControl, InputLabel, LinearProgress, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import React, { useState } from 'react';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import { ApiCheckerService } from '../../services/apiChecker.services';
import { useWork } from '../../hooks/work.store';
import { Controller, useForm } from 'react-hook-form';


interface IFrom {
    api:string
    username:string
    password:string
    db?: string
}

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
      name:'Sap',
      endpoints:[]
    }
]

const ApiValidation = () => {
    const {erp,setErp,setApi,setUsername,setPassword,setDb,endpoints,setEndpoints,setIsDisabledLvl1} = useWork()
    const [show, setShow] = useState(false)

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<IFrom>()

    const handleCheck = async (api:string,username:string,password:string) => {
        setShow(true)
        if (endpoints) {
            for (let i = 0; i < endpoints.length; i++) {
                const result = await ApiCheckerService.checkUrl(api,username,password)
                const updatedEndpoints = [...endpoints];
                updatedEndpoints[i].status = result.result === 'success' ? 'success' : 'error';
                setEndpoints(updatedEndpoints);
            }
        }    
        const checkAll = checkIfEnabled()
        setIsDisabledLvl1(checkAll)
    };

    const handleChange = (value: string) => {
        const find = erps?.find((item) => item.name === value)
        setEndpoints(find?.endpoints as IEndPoint[]); 
        setErp(value as string);
    };

    const onSubmit = (data: IFrom) => {
        setApi(data.api)
        setUsername(data.username)
        setPassword(data.password)
        setDb(data?.db ?? '')
        if(data.api && data.username && data.password){
            handleChange(erp)
            handleCheck(data.api,data.username,data.password)
        }
    }

    const checkIfEnabled = (): boolean => {
        if(endpoints.length > 0) {
          for (let endpoint of endpoints) {
                if (endpoint.status !== "success") {
                    return true;
                }
            }
          return false;
        } else {
          return true
        }
    }
 
    const resetFunc = () => {
        reset()
        setShow(false)
        setErp('')
        setUsername('')
        setPassword('')
        setApi('')
        setDb('')
        setEndpoints([])
        setIsDisabledLvl1(true)
    }
    return (
        <form style={{margin:'0 70px'}} onSubmit={handleSubmit(onSubmit)}>
           <FormControl fullWidth sx={{marginTop:'40px'}}>
                <InputLabel id="demo-simple-select-label">ERP</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={erp}
                    label="Age"
                    onChange={(e) => handleChange(e.target.value)}
                >
                    <MenuItem value={'Priority'}>Priority</MenuItem>
                    <MenuItem value={'Sap'}>Sap</MenuItem>
                </Select>
            </FormControl> 
            <FormControl fullWidth margin="normal">
                <Controller
                    name="api"
                    control={control}
                    defaultValue=""
                    rules={{
                        required: "api",
                    }}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            variant="outlined"
                            placeholder="api" 
                            error={!!errors.api}
                            helperText={
                                errors.api?.message
                            }
                        />
                    )}
                />
            </FormControl>
            <FormControl fullWidth margin="normal">
                <Controller
                    name="username"
                    control={control}
                    defaultValue=""
                    rules={{
                        required: "usernmae",
                    }}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            variant="outlined"
                            placeholder="username" 
                            error={!!errors.username}
                            helperText={
                                errors.username?.message
                            }
                        />
                    )}
                />
            </FormControl>
            <FormControl fullWidth margin="normal">
                <Controller
                    name="password"
                    control={control}
                    defaultValue=""
                    rules={{
                        required: "password",
                    }}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            variant="outlined"
                            placeholder="password" 
                            error={!!errors.password}
                            helperText={
                                errors.password?.message
                            }
                        />
                    )}
                />
            </FormControl>
            { erp === 'Sap' && 
            <FormControl fullWidth margin="normal">
                <Controller
                    name="db"
                    control={control}
                    defaultValue=""
                    rules={{
                        required: "database",
                    }}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            variant="outlined"
                            placeholder="database" 
                            error={!!errors.db}
                            helperText={
                                errors.db?.message
                            }
                        />
                    )}
                />
            </FormControl>
            }

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
            <Box sx={{display:'flex', gap:'30px'}}>
                <Button  variant='contained' type='submit' sx={{borderRadius:'50px', fontSize:'20px', marginTop:'50px' ,fontWeight:400, lineHeight:'24px', padding:'15px 30px'}}>
                    Check
                </Button>
                <Button variant='outlined' color='primary' onClick={() => resetFunc()} sx={{borderRadius:'50px', fontSize:'20px', marginTop:'50px' ,fontWeight:400, lineHeight:'24px', padding:'15px 30px'}}>
                    Reset
                </Button>
            </Box>
        </form>
    );
};

export default ApiValidation;