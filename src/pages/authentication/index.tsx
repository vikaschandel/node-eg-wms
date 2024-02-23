import React, {useEffect} from 'react'
import {Box, Typography} from "@mui/material"
import {useLocation, useNavigate} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"

import bg from '../../assets/images/auth-bg.svg'
import sideImage from '../../assets/images/auth-img.svg'
import ThemeSnackbar from "../../components/theme-snackbar"
import Login from "./login"

import {RootState} from "../../store/store"
import {updateColorMode} from "../../slices/color-mode-slice";


export default function Authentication() {

    const location: any = useLocation()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const isLoggedIn = useSelector((state: RootState) => state.authentication.isLoggedIn)
    const errorMessage = useSelector((state: RootState) => state.snackbarMessage.message)

    const fromLocation = location?.state?.fromLocation
    const fromPath = fromLocation?.pathname || '/'

    useEffect(() => {
        dispatch(updateColorMode('dark'))
        if (isLoggedIn) navigate(fromPath, {state: fromLocation?.state, replace: true})
    }, [isLoggedIn])

    return (
        <Box sx={{
            minHeight: '100vh',
            background: `url(${bg}) no-repeat center`,
            backgroundSize: 'cover',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',

        }}>
            <Box sx={{
                background: '#ffffff20',
                backdropFilter: 'blur(40px)',
                boxShadow: `inset 0px 1px 7px -4px #717171`,
                borderRadius: '20px',
                p: 2,
                width: 'min(80%, 900px)',
                minHeight: 'min(80vh, 700px)',
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'stretch',
                justifyContent: 'center',
                gap: 2,

            }}>

                <Box sx={{
                    width: {xs: '100%', sm: '50%'},
                    borderRadius: '10px',
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    alignItems: 'center',
                    '& img': {
                        m: {xs: 0 , sm: 3},
                        maxHeight: {xs: '100px', sm: '200px'},
                        maxWidth: '280px',
                        width: '100%',
                    }
                }}>
                    <img src={sideImage} alt={'scheduler'} aria-label={'scheduler logo'}/>
                </Box>

                <Box sx={{
                    flex: 1,
                    px: {xs: 0.5, sm: 2},
                    display: 'flex',
                    flexFlow: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 2,
                    '& .ctaText': {
                        width: '100%',
                        textAlign: 'center',
                        fontSize: '0.8rem',
                        color: '#fff',
                        '& span': {
                            fontSize: '1.5rem',
                            fontWeight: 600,
                        }
                    },
                }}>
                    <Typography className={'ctaText'}>
                        <span>Welcome</span><br/> Login to manage your warehouse
                    </Typography>

                    <Box component={'form'}
                         sx={{
                             color: '#fff',
                             maxWidth: '300px',
                             mx: 'auto',
                             display: 'flex',
                             flexFlow: 'column',
                             '& .formBlock': {
                                 flex: 1,
                                 display: 'flex',
                                 flexFlow: 'column',
                                 paddingTop: '2rem',
                                 '& .formContainer': {
                                     flex: 1,
                                     display: 'flex',
                                     flexFlow: 'column',
                                     alignItems: 'center',
                                 },
                                 '& .MuiButton-root': {
                                     borderRadius: '12px',
                                     padding: '0.5rem 1rem',
                                     width: '100%',
                                 },
                                 '& .MuiLoadingButton-root': {
                                     boxShadow: 'none',
                                     letterSpacing: 2,
                                 },
                             },
                             '& .smallCtaButton': {
                                 fontSize: '12px',
                                 boxShadow: '0 0 10px -4px #fff inset',
                                 borderRadius: '8px',
                                 padding: '2px 16px',
                                 marginLeft: '1rem',
                                 color: '#fff',
                                 textTransform: 'none',
                                 letterSpacing: '1px'
                             },
                             '& .MuiDivider-root': {
                                 borderColor: 'rgba(255, 255, 255, 0.12)',
                                 '&:before, &:after': {
                                     borderTop: 'thin solid rgba(255, 255, 255, 0.12)',
                                     top: 0,
                                 }
                             },
                         }}>
                        <Login/>
                    </Box>
                </Box>

            </Box>
            <ThemeSnackbar message={errorMessage}/>
        </Box>
    )
}