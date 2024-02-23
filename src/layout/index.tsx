import React, {useEffect, useState} from 'react'
import {Box, CssBaseline, useTheme} from '@mui/material'
import {Outlet, useLocation} from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux"

import ThemeTopbar from "../components/theme-topbar/theme-topbar"
import ThemeDrawer from "../components/theme-drawer"
import ThemeSnackbar from "../components/theme-snackbar"

import {RootState} from "../store/store"
import {updateColorMode} from "../slices/color-mode-slice"
import {CSSTransition, TransitionGroup} from "react-transition-group"


export default function Layout() {

    const theme = useTheme()
    const location = useLocation()

    const currentKey = location?.pathname || "/"

    const errorMessage = useSelector((state: RootState) => state.snackbarMessage.message)

    const dispatch = useDispatch()


    const changeColorMode = () => {
        if (theme.palette.mode == 'dark')
            dispatch(updateColorMode('light'))
        else dispatch(updateColorMode('dark'))
    }


    const [open, setOpen] = useState(false)
    const toggleDrawer = () => setOpen(prevState => !prevState)


    return (
        <>
            <CssBaseline/>
            <Box sx={{
                display: 'flex',
                background: theme.palette.primary.main,
                '& main': {
                    flexGrow: 1,
                    display: 'flex',
                    flexFlow: 'column',
                    height: '100vh',
                    overflowY: 'scroll',
                    overflowX: 'hidden',
                    background: theme.palette.background.paper,
                    borderRadius: {xs: 0, md: '30px 0 0 30px'},
                    '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
                        width: '6px',
                        height: '6px',
                    },
                    '&::-webkit-scrollbar-track, & *::-webkit-scrollbar-track': {
                        boxShadow: 'inset 0 0 5px grey',
                        borderRadius: '8px 0 0 8px',
                    },
                    '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
                        background: theme.palette.primary.light,
                        borderRadius: '8px 0 0 8px',
                        cursor: 'pointer',
                    },
                    '&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover': {
                        background: theme.palette.primary.main,
                    },
                    '& .page-enter': {
                        opacity: 0,
                        transform: 'scaleY(0.6)',
                        transformOrigin: 'top center',
                    },
                    '& .page-enter-active': {
                        opacity: 1,
                        transform: 'scaleY(1)',
                        transformOrigin: 'top center',
                        transition: 'opacity 900ms, transform 300ms',
                    },
                    '& .page-exit': {
                        opacity: 1,
                        transformOrigin: 'center',
                    },
                    '& .page-exit-active': {
                        opacity: 0,
                        transition: 'opacity 300ms, transform 300ms',
                    },
                }
            }}>
                <ThemeDrawer open={open} toggleDrawer={toggleDrawer}/>

                <Box component="main">
                    <ThemeTopbar open={open} toggleDrawer={toggleDrawer} toggleTheme={changeColorMode}/>
                    <TransitionGroup component={null}>
                        <CSSTransition key={currentKey} classNames="page" timeout={300}>
                            <Outlet/>
                        </CSSTransition>
                    </TransitionGroup>
                </Box>
                <ThemeSnackbar message={errorMessage}/>
            </Box>
        </>
    )
}
