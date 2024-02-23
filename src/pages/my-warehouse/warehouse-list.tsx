import React from 'react'
import PageContainer from "../../components/containers/page-container"
import {alpha, Box, darken, IconButton, LinearProgress, Paper, Typography, useTheme} from "@mui/material";
import {
    ArrowForwardIosRounded,
    ArrowRightAltRounded,
    ArrowRightRounded,
    CircleRounded,
    LensBlurRounded,
    WarehouseRounded
} from "@mui/icons-material"
import warehouseIllustration from '../../assets/images/warehouse-illustration.png'
import warehouseBg from '../../assets/images/warehouse-bg.jpg'
import warehouseBgPng from '../../assets/images/warehouse-bg-1.png'
import {dark} from "@mui/material/styles/createPalette";

export default function WarehouseList() {

    const theme = useTheme()

    return (
        <Box sx={{
            display: 'grid',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gridTemplateColumns: `repeat(auto-fill, min(100%, 300px))`,
            gap: 3,
            '&:has(.warehouseItem:hover) *:not(:hover)': {
                // opacity: 0.9,
                // transition: 'opacity 300ms ease-in-out',
            }

        }}>
            {Array.from(Array(5)).map((_, index) => {
                return (
                    <React.Fragment key={index}>
                        <Paper className={'warehouseItem'} sx={{
                            flex: 1,
                            maxWidth: {xs: '100%', sm: '360px'},
                            p: 2,
                            borderRadius: '24px',
                            display: 'flex',
                            flexWrap: 'wrap',
                            columnGap: 2,
                            boxShadow: `0 4px 17px -2px #83838370`,
                            transition: 'all 300ms ease-in-out',
                            '& .MuiIconButton-root': {
                                background: alpha(theme.palette.primary.main, 0.1),
                                color: theme.palette.primary.main,
                                '& svg': {
                                    fontSize: '1.2rem'
                                },
                                '&:hover': {
                                    background: alpha(theme.palette.primary.main, 1),
                                    color: theme.palette.primary.contrastText,
                                },
                            },
                            '&:hover': {
                                transition: 'all 300ms ease-in-out',
                                borderRadius: '36px',
                                boxShadow: `0px 8px 17px -5px #838383ba`,
                            },
                        }}>
                            <Box sx={{
                                width: '100%',
                                height: '150px',
                                background: `${alpha(theme.palette.primary.dark, 0.99)} url(${warehouseBgPng}) no-repeat left bottom`,
                                backgroundSize: 'contain',
                                borderRadius: '24px',
                                display: 'flex',
                                alignItems: 'flex-end',
                                justifyContent: 'flex-end',
                                p: 1,
                                '& .MuiTypography-root': {
                                    fontSize: '14px',
                                    fontWeight: 500,
                                    color: alpha(theme.palette.primary.contrastText, 0.7),
                                },
                                '&:hover': {
                                    '& .MuiTypography-root': {
                                        color: alpha(theme.palette.primary.contrastText, 0.9),
                                    }
                                },
                            }}>
                                <Typography>Ludhiana, Punjab</Typography>
                            </Box>
                            <Box sx={{
                                flex: 1,
                            }}>
                                <Typography sx={{
                                    fontWeight: 600,
                                    pl: 2,
                                }}>Warehouse name {index}</Typography>

                                <Box sx={{
                                    maxWidth: '80%',
                                    mx: 'auto',
                                    flex: 1,
                                    py: 2,
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    alignItems: 'flex-end',
                                    rowGap: 1.5,
                                    '& .detailCapsule': {
                                        flex: `1 1 40%`,
                                        maxWidth: '300px',
                                        minWidth: '200px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        // justifyContent: 'space-between',
                                        fontSize: '13px',
                                        lineHeight: '13px',
                                        fontWeight: 600,
                                        color: theme.palette.text.primary,
                                        '&:hover': {
                                            '& svg': {
                                                color: theme.palette.primary.main,
                                            },
                                        },
                                        '& svg': {
                                            fontSize: '0.4rem',
                                            color: '#83838360',
                                            mr: '6px'
                                        },
                                        '& .v': {
                                            color: theme.palette.text.secondary,
                                            fontSize: '14px',
                                            lineHeight: '14px',
                                            fontWeight: 600,
                                            width: '80px'
                                        },
                                    },
                                }}>
                                    <Box className={'detailCapsule'}><span className={'v'}>Area:</span>
                                        <Box sx={{
                                            display: 'flex',
                                            fontSize: '10px',
                                            flexDirection: 'column',
                                            alignItems: 'flex-end',
                                            justifyContent: 'center',
                                        }}>
                                            4000 sqrt <LinearProgress sx={{
                                            width: '120px',
                                            borderRadius: '12px',
                                            height: '4px'
                                        }} value={60} variant={"determinate"}/>
                                        </Box>
                                    </Box>
                                    {/*<Box className={'detailCapsule'}><span className={'v'}>Area:</span>2220/4000 sqrt</Box>*/}
                                    <Box className={'detailCapsule'}><span className={'v'}>Bins:</span>40</Box>
                                    <Box className={'detailCapsule'}><span className={'v'}>Docks:</span>4</Box>
                                </Box>
                            </Box>

                            <Typography sx={{
                                width: 'max-content',
                                mx: 'auto',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                transition: 'all 300ms ease-in-out',
                                gap: 1,
                                background: '#1f633430',
                                borderRadius: '50%',
                                '&:hover': {
                                    background: '#f16334',
                                    '& span': {
                                        visibility: 'visible',
                                    },
                                    '& svg': {
                                        transform: 'translateX(0)',
                                    },
                                },
                                '& span': {
                                    // visibility: 'hidden',
                                    fontSize: '13px',
                                    fontWeight: 600,
                                    transition: 'all 300ms ease-in-out',
                                },
                                '& svg': {
                                    fontSize: '1.1rem',
                                    // transform: 'translateX(-4rem)',
                                    transition: 'all 300ms ease-in-out',
                                },
                            }}>
                                <span>View</span><ArrowForwardIosRounded/>
                            </Typography>
                        </Paper>
                    </React.Fragment>
                )
            })}
        </Box>

    )
}