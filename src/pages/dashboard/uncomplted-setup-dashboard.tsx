import React from 'react'
import {useNavigate} from "react-router-dom"
import {Box, Button, Typography} from "@mui/material"
import pendingSetupIllustration from '../../assets/images/setup-pending-img.svg'


export default function UncompletedSetupDashboard() {

    const navigate = useNavigate()

    return (
        <Box sx={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center',
            columnGap: 3,
            '& img': {
                maxHeight: {xs: '200px', md: '250px'},
                filter: 'sepia(1)',
            },
            '& .ctaBox': {
                display: 'flex',
                flexFlow: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 2,
                '& .MuiTypography-root': {
                    maxWidth: '400px',
                    textAlign: 'center',
                    fontSize: '0.92rem',
                    fontWeight: 500
                },
                '& .MuiButton-root': {
                    borderRadius: '12px',
                    fontSize: '0.825rem',
                    minWidth: '130px',
                },
            },

        }}>
            <img src={pendingSetupIllustration} alt={'s'}/>
            <Box className={'ctaBox'}>
                <Typography variant={'body2'}>You haven't completed the initial setup process. Please complete the setup
                    to use app properly.</Typography>
                <Button variant={'contained'} color={'primary'}
                        onClick={() => navigate('/initial-setup')}>Continue</Button>
            </Box>
        </Box>
    )
}
