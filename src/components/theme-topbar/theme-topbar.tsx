import React from 'react'
import {AppBar, Toolbar, Typography, IconButton, useTheme, Stack, alpha,} from "@mui/material"
import {Brightness4Rounded, Brightness7Rounded, Menu, MenuOpenRounded, Search, SearchRounded} from '@mui/icons-material'
import {useSelector} from "react-redux"
import {RootState} from "../../store/store"
import UserMenu from "./user-menu"


export default function ThemeTopbar(props: any) {

    const {open, toggleDrawer} = props

    const theme = useTheme()

    const pageTitle = useSelector((state: RootState) => state.pageTitle.title)
    const isLoggedIn = useSelector((state: RootState) => state.authentication.isLoggedIn)

    return (
        <AppBar sx={{
            zIndex: {xs: theme.zIndex.drawer - 1, md: theme.zIndex.drawer + 2},
            width: '100%',
            position: 'sticky',
            p: 0,
            background: alpha(theme.palette.background.default, 0.6),
            backdropFilter: 'blur(22px)',
            boxShadow: 0,
            color: theme.palette.text.primary
        }}>
            <Toolbar sx={{
                padding: '1rem 0.5rem 10px',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}>
                <Stack flex={1} direction={'row'} alignItems={'center'}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={toggleDrawer}
                        edge="start"
                        sx={{mr: 2, color: theme.palette.primary.main}}>
                        {open ? <MenuOpenRounded/> : <Menu/>}
                    </IconButton>
                    <Typography variant="h1" color={theme.palette.primary.main} noWrap sx={{fontSize: '1.4rem', fontWeight: 400}}>
                        {pageTitle}
                    </Typography>
                </Stack>

                <Stack direction={'row'} alignItems={'center'}>
                    <IconButton sx={{ml: 1}} onClick={props.toggleTheme} color="inherit">
                        {theme.palette.mode === 'dark' ? <Brightness7Rounded/> : <Brightness4Rounded/>}
                    </IconButton>
                    {isLoggedIn && <UserMenu/>}
                </Stack>
            </Toolbar>
        </AppBar>
    )
}



