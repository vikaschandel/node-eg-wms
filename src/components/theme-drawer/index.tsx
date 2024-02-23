import React from 'react';
import {
    Typography,
    Drawer,
    useTheme,
    Theme,
    CSSObject, useMediaQuery, alpha
} from '@mui/material'

import logo from '../../assets/images/logo.svg'

import DrawerItems from "./drawer-items";
import {Box} from "@mui/material";
import {useNavigate} from "react-router-dom";
import LogoutMenuItem from "./logout-menu-item";


const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});


export default function ThemeDrawer(props: any) {


    const theme = useTheme();
    const {open, toggleDrawer} = props

    const navigate = useNavigate()
    const isSmallScreen = useMediaQuery('(max-width:900px)')


    return (
        <Drawer variant={isSmallScreen ? 'temporary' : 'permanent'} open={open} onClose={toggleDrawer}
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    whiteSpace: 'nowrap',
                    boxSizing: 'border-box',
                    boxShadow: 0,
                    ...(open && {
                        ...openedMixin(theme),
                        '& .MuiDrawer-paper': openedMixin(theme),
                    }),
                    ...(!open && {
                        ...closedMixin(theme),
                        '& .MuiDrawer-paper': closedMixin(theme),
                    }),
                    '& .MuiPaper-root': {
                        background: {xs: theme.palette.primary.main, md: alpha(theme.palette.primary.main, 0)},
                        borderRadius: '0 1.5rem 1.5rem 0',
                        width: `calc(${drawerWidth} - 10px)`,
                        boxShadow: 0,
                        border: 0,
                        '& a': {
                            textDecoration: 'none',
                            color: '#fff',
                        },
                        '& .MuiTypography-root': {
                            fontSize: '0.875rem',
                            color: theme.palette.primary.contrastText,
                        },
                        '& .activeNavlink .MuiListItemButton-root': {
                            backgroundColor: '#00000021',
                        },
                        '& .MuiListItem-root': {
                            display: 'block',
                            overflow: 'hidden',
                            borderRadius: '16px',
                            marginInline: '8px',
                            width: 'auto',
                            '& .MuiListItemButton-root': {
                                justifyContent: open ? 'initial' : 'center',
                                px: 2.5,
                                py: '6px',
                                '&:hover': {
                                    backgroundColor: '#ffffff10',
                                },
                                '& .MuiListItemIcon-root': {
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                    '& .MuiBadge-badge': {
                                        minWidth: '5px',
                                        height: '5px',
                                    },
                                    '& svg': {
                                        color: theme.palette.primary.contrastText,
                                        height: '20px',
                                        width: '20px',
                                    },
                                },
                                '& .MuiListItemText-root': {
                                    opacity: open ? 1 : 0
                                },
                            },
                        },
                    },
                }}>
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: theme.spacing(4, 1),
                ...theme.mixins.toolbar,
                '& img': {
                    maxHeight: '40px',
                    cursor: 'pointer',
                },
                '& .title': {
                    cursor: 'pointer',
                    color: theme.palette.primary.contrastText,
                    fontSize: '1.2rem !important'
                },
            }}>
                <img src={logo} alt={'logo'} onClick={() => navigate('/')}/>
                <Typography className={'title'} sx={{
                    width: open ? 'auto' : 0,
                    overflow: 'hidden',
                    transition: 'all 300ms ease-in-out',
                }} onClick={() => navigate('/')}>WMS</Typography>
            </Box>

            <DrawerItems toggleDrawer={toggleDrawer}/>

            <Box sx={{
                flex: 1,
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'flex-end',
                alignContent: open ? 'space-between' : 'flex-end',
                pb: '10px',
                width: '100%',
            }}>
                <LogoutMenuItem/>
            </Box>
        </Drawer>
    )
}





