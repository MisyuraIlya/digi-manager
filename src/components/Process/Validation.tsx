import { Timeline, TimelineConnector, TimelineContent, TimelineDot, TimelineItem, TimelineOppositeContent, TimelineSeparator, timelineItemClasses } from '@mui/lab';
import { Box, Button, FormControl, InputLabel, LinearProgress, MenuItem, Select, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useConfig } from '../../store/config.store';
import { Controller, useForm } from 'react-hook-form';
import { erps } from '../../enums/erp';
import { ApiCheckerService } from '../../services/apiChecker.services';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import { useProcess } from '../../providers/ProcessProvider';

const Validation = () => {
    const {erp, setErp, setApi} = useConfig()
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<IValidationForm>()

    const [show, setShow] = useState(false)
    const [endpoints, setEndpoints] = useState<IEndPoint[]>([])
    const {setLvl1} = useProcess()

    const handleChange = (value: string) => {
        const find = erps?.find((item) => item.name === value)
        setEndpoints(find?.endpoints as IEndPoint[]); 
        setErp(value);
    };

    const onSubmit = (data: IValidationForm) => {
        setApi(data.api,data.username,data.password,data?.db ?? '')
        if(data.api && data.username && data.password){
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

    const handleCheck = async (api: string, username: string, password: string) => {
        setShow(true);
        if (endpoints) {
            const promises = endpoints.map(async (endpoint, index) => {
                const result = await ApiCheckerService.checkUrl(api, username, password);
                return { 
                    ...endpoint, 
                    status: result.result === 'success' ? 'success' : 'error' 
                } as IEndPoint;
            });
    
            const updatedEndpoints = await Promise.all(promises);
            setEndpoints(updatedEndpoints);
        }
    
        const isChecked = checkIfEnabled();
        setLvl1(!isChecked);
    };

    return (
        <form style={{margin:'0 70px'}} onSubmit={handleSubmit(onSubmit)}>
            <FormControl fullWidth sx={{marginTop:'40px'}}>
                <InputLabel>ERP</InputLabel>
                <Select
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
            </Box>
        </form>
    );
};

export default Validation;