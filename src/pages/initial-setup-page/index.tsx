import React, {useEffect, useState} from 'react'
import PageContainer from "../../components/containers/page-container"
import {updatePageTitle} from "../../slices/page-title-slice"
import {useDispatch} from "react-redux"
import {Box, Paper, Step, StepLabel, Stepper, useTheme} from "@mui/material"
import BasicInfoBlock from "./basic-info-block";
import CreateRegionalClientsBlock from "./create-regional-clients-block";
import SetupCompleteView from "./setup-complete-view";


export default function InitialSetupPage() {

    const theme = useTheme()
    const dispatch = useDispatch()

    const steps = ['Basic Info', 'Regional Clients']

    const [activeStep, setActiveStep] = useState<number>(0)

    const handleNext = () => setActiveStep((prevStep) => prevStep + 1)
    const handleBack = () => setActiveStep((prevStep) => prevStep - 1)
    const handleReset = () => setActiveStep(0)

    useEffect(() => {
        dispatch(updatePageTitle('Account Setup'))
    }, [])

    return (
        <PageContainer>
            <Box sx={{
                display: 'flex',
                flexFlow: 'column',
                height: '100%',
                justifyContent: 'flex-start'
            }}>
                <Stepper activeStep={activeStep} sx={{width: {xs: '100%', sm: '75%'}, mx: 'auto'}}>
                    {
                        steps.map((label, index) => {
                            const stepProps: { completed?: boolean } = {}
                            const labelProps: { optional?: React.ReactNode } = {}
                            return (
                                <Step key={label} {...stepProps}>
                                    <StepLabel {...labelProps}>{label}</StepLabel>
                                </Step>
                            )
                        })
                    }
                </Stepper>

                <Paper sx={{
                    flex: 1,
                    mt: 3,
                    boxShadow: {xs: 0, sm: theme.palette.mode == 'dark' ? 'none' : '0 2px 14px -3px #83838360 inset'},
                    borderRadius: '15px',
                    p: {xs: 0, sm: 2},
                    width: {xs: '100%', sm :'85%'},
                    mx: 'auto',
                    '& .currentStepDiv': {
                        height: '100%',
                        display: 'flex',
                        flexFlow: 'column',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    },
                    '& .flex': {
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    },
                }}>
                    {activeStep == 0
                        ? <BasicInfoBlock handleNext={handleNext}/>
                        : (activeStep == 1)
                            ? <CreateRegionalClientsBlock handleNext={handleNext} handleBack={handleBack}/>
                            : <SetupCompleteView handleReset={handleReset}/>
                    }
                </Paper>
            </Box>
        </PageContainer>
    )
}