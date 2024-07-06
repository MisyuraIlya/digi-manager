import { Backdrop, Box, Button, CircularProgress, DialogContent, Step, StepLabel, Stepper, Typography } from '@mui/material';
import React, { useState } from 'react';
import ApiValidation from '../components/createProject/ApiValidation';
import Configuration from '../components/createProject/Configuration';
import Deploy from '../components/createProject/Deploy';
import ImagesConfig from '../components/createProject/ImagesConfig';
import { useWork } from '../store/work.store';
import { ConfigService } from '../services/config.service';
import Intagration from '../components/createProject/Intagration';
import { DockerService } from '../services/docker.services';
import { useLog } from '../store/log.store';

const steps = ['validation API', 'API config' ,'Configuration', 'Integration' ,'Deploy Process' ];


const CreateProject = () => {

  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set<number>());
  const [logTitle, setLogTitle] = useState('')
  const { log: dataLog, logModal, setLogModal, clear} = useLog()
  const { 
    folderPath,
    title, 
    setCurrentProject,
    deployConfig,
    isDisabledLvl1,
    isDisabledLvl3
  } = useWork();

  const checkIsDisabled = () => {
    if(activeStep === 1) {
      return isDisabledLvl1
    }
    if(activeStep === 2){
      return isDisabledLvl3
    }

    return false
  }

  const isStepOptional = (step: number) => {
    return step === 1;
  };

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleNext = async () => {
    if(activeStep === steps.length - 1){
      handleExecute()
    } else {
      let newSkipped = skipped;
      if (isStepSkipped(activeStep)) {
        newSkipped = new Set(newSkipped.values());
        newSkipped.delete(activeStep);
      }
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setSkipped(newSkipped);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleExecute = async () => {
      try {
          clear()
          setLogModal(true)
          setLogTitle('stop exist dockers..')
          const response0 = await DockerService.stopDocker()
          setCurrentProject('')
          setLogTitle('deploy config')
          const response1 = await deployConfig()
          setLogTitle('create github repository')
          const response2 =await ConfigService.executeBash(folderPath,title)
          setLogTitle('create project docker containers')
          DockerService.deploy(`${folderPath}/${title}`);
          setCurrentProject(title)
      } catch(e) {
          console.log('e',e)
      }
  };


  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <>
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
              { activeStep == 0 &&
                <ApiValidation/>
              }
              { activeStep == 1 &&
                <ImagesConfig/>
              }
              { activeStep == 2 &&
                <Configuration/>
              }
              {
                activeStep == 3 &&
                <Intagration/>
              }
              { activeStep == 4 &&
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
                <Button disabled={checkIsDisabled()} onClick={handleNext} variant='contained' color='secondary'>
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                </Button>
              </Box>
          </React.Fragment>
          )}
      </Box>
    </Box>
    <Backdrop open={logModal} onClick={() => setLogModal(false)} sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingBottom: '50px' }}>
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingBottom: '50px' }}>
            <CircularProgress color="inherit"/>
          </Box>
          <Typography sx={{ color: 'white', fontWeight: 900, textAlign:'center'}} variant='h5'>
              {logTitle}
          </Typography>
          {/* <Box sx={{width:'100%', margin:'0 auto'}}>
            <Box sx={{backgroundColor:'white', borderRadius:'5px', color:"black", height:'200px', overflow:'auto', width:'700px'}}>
              <DialogContent>
                {dataLog && dataLog?.map((item) => 
                  <Typography gutterBottom>
                    {item}
                  </Typography>
                )}
              </DialogContent>
            </Box>
          </Box> */}
        </Box>
      </Box>
    </Backdrop>
    </>


  );
};

export default CreateProject;