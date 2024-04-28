import { Box, Button, Step, StepLabel, Stepper, Typography } from '@mui/material';
import React from 'react';
import ApiValidation from '../components/createProject/ApiValidation';
import Configuration from '../components/createProject/Configuration';
import Deploy from '../components/createProject/Deploy';
import ImagesConfig from '../components/createProject/ImagesConfig';
import { useWork } from '../store/work.store';
import { ConfigService } from '../services/config.service';

const steps = ['validation API', 'Images' ,'Configuration','Deploy Process' ];


const CreateProject = () => {

  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set<number>());
  const {
    endpoints,
    isDisabledLvl1,


    title,
    minimumDelivery,
    primaryColor,
    secondaryColor,
    imageState,

  } = useWork()
  const isStepOptional = (step: number) => {
    return step === 1;
  };

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleNext = async () => {
    let newSkipped = skipped;

    if(activeStep === 2) {
      await ConfigService.createConfig({
        title,
        minimumDelivery,
        primaryColor,
        secondaryColor,
        imageState,
      })
    }

    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box sx={{margin:'0 100px'}}>
      <Box sx={{marginTop:'50px'}}>
          <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
              const stepProps: { completed?: boolean } = {};
              const labelProps: {
              optional?: React.ReactNode;
              } = {};
              if (isStepOptional(index)) {
              labelProps.optional = (
                  <Typography variant="caption">Optional</Typography>
              );
              }
              if (isStepSkipped(index)) {
              stepProps.completed = false;
              }
              return (
              <Step key={label} {...stepProps}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
              );
          })}
          </Stepper>
          {activeStep === steps.length ? (
          <React.Fragment>
              <Typography sx={{ mt: 2, mb: 1 }} color={'primary'}>
              All steps completed - you&apos;re finished
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={handleReset} sx={{mr: 1}} variant='contained' color='secondary'>Reset</Button>
              </Box>
          </React.Fragment>
          ) : (
          <React.Fragment>
              {activeStep == 0 &&
                <ApiValidation/>
              }
              {activeStep == 1 &&
                <ImagesConfig/>
              }
              {activeStep == 2 &&
                <Configuration/>
              }
              {activeStep == 3 &&
                <Deploy/>
              }
              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Button
                    sx={{mr: 1}} variant='contained' color='secondary'
                    disabled={activeStep === 0}
                    onClick={handleBack}
                >
                    Back
                </Button>
                <Box sx={{ flex: '1 1 auto' }} />
                {isStepOptional(activeStep) && (
                    <Button  onClick={handleSkip} sx={{mr: 1}} variant='contained' color='secondary'>
                    Skip
                    </Button>
                )}
                <Button disabled={isDisabledLvl1} onClick={handleNext} variant='contained' color='secondary'>
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                </Button>
              </Box>
          </React.Fragment>
          )}
      </Box>
    </Box>

  );
};

export default CreateProject;