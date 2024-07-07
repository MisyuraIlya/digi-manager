import { Box, Button, Step, StepLabel, Stepper, Tooltip, Typography } from '@mui/material';
import React from 'react';
import { useProcess } from '../providers/ProcessProvider';
import Process from '../components/Process';

const ProcessPage = () => {
    const {activeStep, setActiveStep, checkIsDisabled, handleNext, steps, handleWhatNeed} = useProcess()
    
    
    return (
        <Box>
            <Stepper activeStep={activeStep}>
            {steps.map((label, index) => (
                <Step key={index} >
                    <StepLabel>{label}</StepLabel>
                </Step>
            ))}
            </Stepper>
            {activeStep === steps.length ? (
            <>
                <Typography sx={{ mt: 2, mb: 1 }} color={'primary'}>
                All steps completed - you&apos;re finished
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                    <Box sx={{ flex: '1 1 auto' }} />
                    <Button onClick={() => setActiveStep(0)} sx={{mr: 1}} variant='contained' color='secondary'>Reset</Button>
                </Box>
            </>
            ) : (
            <>
                { activeStep == 0 &&
                    <Process.Validation/>
                }
                { activeStep == 1 &&
                    <Process.Images/>
                }
                { activeStep == 2 &&
                    <Process.Configuration/>
                }
                { activeStep == 3 &&
                    <Process.Integration/>
                }
                { activeStep == 4 &&
                    <Process.Deploy/>
                }
                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                    <Button
                        sx={{mr: 1}} variant='contained' color='secondary'
                        disabled={activeStep === 0}
                        onClick={() => setActiveStep( activeStep - 1)}
                    >
                        Back
                    </Button>
                    <Box sx={{ flex: '1 1 auto' }} />
                    <Tooltip title={handleWhatNeed()} placement="top">
                        <Box>
                            <Button disabled={checkIsDisabled()} onClick={handleNext} variant='contained' color='secondary'>
                                {activeStep === steps.length - 1 ? 'Deploy' : 'Next'}
                            </Button>
                        </Box>
                    </Tooltip>
                
                </Box>
            </>
            )}
        </Box>
    );
};

export default ProcessPage;