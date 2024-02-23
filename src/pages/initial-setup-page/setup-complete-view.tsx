import React, {useEffect, useState} from 'react'
import PageContainer from "../../components/containers/page-container"
import {updatePageTitle} from "../../slices/page-title-slice"
import {useDispatch} from "react-redux"
import {alpha, Box, Button, Paper, Step, StepLabel, Stepper, Typography, useTheme} from "@mui/material"
import {ThemeLoadingButton} from "../../components/buttons/theme-loading-button"
import {ArrowRightRounded} from "@mui/icons-material"
import {ThemeTextField} from "../../components/inputs/theme-text-field"
import {Controller, useForm} from "react-hook-form"
import allSetIllustration from '../../assets/images/all-set.png'
import {useNavigate} from "react-router-dom"


export default function SetupCompleteView(props: any) {

    const {handleReset} = props

    const theme = useTheme()
    const navigate = useNavigate()

    const [animationOn, setAnimationOn] = useState(false)

    useEffect(() => {
        setAnimationOn(true)
    }, [])

    return (
        <Box className={'currentStepDiv'}>
            <Box className={'flex'}
                 sx={{
                     flex: 1,
                     justifyContent: 'flex-start !important',
                     flexFlow: 'column',
                     width: 'min(90%, 400px)',
                     transition: 'all 600ms ease-in-out',
                     opacity: animationOn ? 1 : 0,
                     transform: animationOn ? 'translateY(0)' : 'translateY(4rem)',
                     '& img': {
                         height: '200px',
                     },
                 }}>
                <img src={allSetIllustration} loading={'lazy'}/>
                <Typography sx={{
                    mt: 1,
                    fontSize: '18px',
                    fontWeight: 600
                }}>All Set!</Typography>
                <Typography sx={{
                    fontSize: '13px',
                    maxWidth: '300px',
                    textAlign: 'center',
                    mb: 3,
                }}>Your setup is completed & now you can start using this portal to manage your
                    warehouse.</Typography>
                <Button onClick={() => navigate('/')} sx={{
                    p: '0.5rem 1rem',
                    fontSize: '13px',
                    letterSpacing: '1px',
                    textTransform: 'none',
                    borderRadius: '50vh',
                    fontWeight: 600,
                    background: `linear-gradient(145deg, ${alpha(theme.palette.text.secondary, 0.1)}, ${theme.palette.background.paper})`,
                    boxShadow: `7px 8px 20px -3px ${alpha(theme.palette.text.secondary, 0.1)}, -10px -10px 20px -3px ${theme.palette.background.paper}`,
                    transition: 'all 250ms ease-in-out',
                    outline: `2px solid ${alpha(theme.palette.primary.main, 0)}`,
                    '&:hover': {
                        outline: `2px solid ${theme.palette.primary.main}`,
                        outlineOffset: '-4px',
                    },
                }}>Explore Portal</Button>
            </Box>
        </Box>
    )
}