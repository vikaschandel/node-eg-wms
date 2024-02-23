import React, {useRef, useState} from 'react'
import {
    alpha,
    Box,
    Button, InputBase,
    lighten,
    LinearProgress,
    ListItem,
    MenuItem,
    Paper, Select, SelectChangeEvent,
    Stack, styled,
    Typography,
    useTheme
} from "@mui/material"
import {Event} from "@mui/icons-material"
import moment from "moment"
import {useNavigate} from "react-router-dom"
import {useDispatch} from "react-redux"
import {ThemeTextField} from "../../components/inputs/theme-text-field"
import {updateLoggedInClient} from "../../slices/logged-in-client-slice"
import {bins, warehouses} from "../../utils/sample-data"


const BootstrapInput = styled(InputBase)(({theme}) => ({
    '& .MuiInputBase-input': {
        fontSize: '1.1rem',
        padding: '2px 26px 2px 12px',
        fontFamily: "Josefin Sans, sans-serif",
    }
}))


export default function CompletedSetupDashboard() {

    const theme = useTheme()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const binBox = useRef<HTMLDivElement>(null)
    const [selectedWarehouseId, setSelectedWarehouseId] = useState<string>(`${warehouses.length > 0 ? warehouses[0].id : 0}`)
    const [selectedWarehouse, setSelectedWarehouse] = useState(warehouses[(+selectedWarehouseId) - 1])
    const [right, setRight] = useState(false)
    const [top, setTop] = useState(false)


    const [warehouseArranging, setWarehouseArranging] = useState(false)

    const toggleState = () => dispatch(updateLoggedInClient({baseClientSetupCompleted: false}))

    const onWarehouseSelection = (e: SelectChangeEvent) => {
        setWarehouseArranging(true)
        setSelectedWarehouseId((e.target.value))
        setSelectedWarehouse(warehouses[(+e.target.value) - 1])
        setWarehouseArranging(false)
    }

    const onHoverBin = (event: React.MouseEvent<HTMLElement>) => {
        if (binBox.current) {
            if ((binBox.current.clientWidth - event.clientX) > 200) setRight(true)
            else setRight(false)

            if ((event.clientY - binBox.current.clientHeight) < 95) setTop(false)
            else setTop(true)
        }
    }


    return (
        <Box sx={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            columnGap: 3,
            '& img': {
                maxHeight: {xs: '200px', md: '250px'}
            },
            '& .ctaBox': {
                display: 'flex',
                flexFlow: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 2,
                '& .MuiTypography-root': {
                    maxWidth: '260px',
                    textAlign: 'center',
                    fontSize: '0.775rem',
                },
                '& .MuiButton-root': {
                    borderRadius: '12px',
                    fontSize: '0.825rem',
                    minWidth: '130px',
                },
            },

        }}>
            <Box width={{xs: '100%', md: '56%'}}>
                <Paper sx={{
                    width: '100%',
                    minHeight: '200px',
                    borderRadius: 7,
                    boxShadow: (theme.palette.mode == 'dark') ? 0 : `0 2px 17px -3px #83838370`,
                    mb: 3,
                    p: 2,
                }}>
                    {warehouses.length > 0 &&
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: 1,
                    }}>
                        <Select input={<BootstrapInput/>} value={selectedWarehouseId} onChange={onWarehouseSelection}>
                            {warehouses?.map((warehouse, index) => (
                                <MenuItem key={index} value={warehouse.id}>{warehouse.name}</MenuItem>))}
                        </Select>

                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 0.7,
                        }}>
                            <Typography variant={'caption'}>Full</Typography>
                            <Box sx={{
                                minHeight: '1.3rem',
                                width: '100px',
                                background: `linear-gradient(90deg, ${theme.palette.secondary.main}, ${alpha(theme.palette.secondary.dark, 0.1)})`,
                                borderRadius: '6px',
                                outline: `1px solid ${theme.palette.secondary.main}`,
                                outlineOffset: '2px'
                            }}/>
                            <Typography variant={'caption'}>Empty</Typography>
                        </Box>
                    </Box>
                    }


                    <Box sx={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        px: 2, py: 3,
                        overflowX: 'auto',
                    }}>
                        {warehouses.length > 0
                            ? warehouseArranging
                                ? <p>Loading...</p>
                                : <Box ref={binBox} sx={{
                                    width: 'max-content',
                                    p: 1,
                                    display: 'grid',
                                    gap: 1,
                                    gridTemplateColumns: `repeat(${selectedWarehouse?.column}, 20px)`,
                                    gridRow: 4,
                                    maxHeight: `${selectedWarehouse?.rows * 33}px`,
                                    overflow: 'hidden'
                                }}>
                                    {Array.from(Array(selectedWarehouse?.column * selectedWarehouse?.rows)).map((_, index) => {
                                        return (
                                            <React.Fragment key={index}>
                                                <Box onMouseEnter={onHoverBin}
                                                     sx={{
                                                         background: alpha(theme.palette.secondary.main, +(`0.${index}9`)),
                                                         height: '1.5rem',
                                                         width: '1.5rem',
                                                         borderRadius: '6px',
                                                         cursor: 'pointer',
                                                         transition: theme.transitions.easing.easeInOut,
                                                         position: 'relative',
                                                         '& div[class^="popoverBox"]': {
                                                             boxShadow: `0 0 12px -4px #83838360`,
                                                             borderRadius: '12px',
                                                             background: lighten(theme.palette.primary.main, 0.15),
                                                             color: theme.palette.primary.contrastText,
                                                             minWidth: '150px',
                                                             p: 1,
                                                             width: 'max-content',
                                                             position: 'absolute',
                                                             display: 'none',
                                                             zIndex: theme.zIndex.tooltip,
                                                             // left: leftPoint,
                                                             // top: topPoint,
                                                             ...(right ? {left: 0} : {right: 0}),
                                                             ...(top ? {bottom: '100%'} : {top: '100%'}),
                                                         },
                                                         '&:hover': {
                                                             background: '#ffa21d',
                                                             outline: `1px solid #ffa21d`,
                                                             outlineOffset: '2px',
                                                             '& div[class^="popoverBox"]': {
                                                                 display: 'block',
                                                             },
                                                         },
                                                         '& ul': {
                                                             p: '0 0 0 1rem',
                                                             m: 0,
                                                         },
                                                         '& .binName': {
                                                             fontSize: '13px',
                                                             fontWeight: 600,
                                                             width: 'max-content',
                                                             '&:hover': {
                                                                 color: alpha(theme.palette.primary.contrastText, 0.8),
                                                             },
                                                         },
                                                         '& .description': {
                                                             fontSize: '11px',
                                                             lineHeight: '14px',
                                                             fontWeight: 600,
                                                             '& span': {
                                                                 fontWeight: 400,
                                                                 mr: '8px',
                                                                 letterSpacing: '1px'
                                                             },
                                                         },
                                                     }}>
                                                    <Box className={`popoverBox-${index}`}>
                                                        <Typography className={'binName'}
                                                                    onClick={() => navigate(`bins/${index}`)}>Bin {index}</Typography>
                                                        <ul>
                                                            <li className={'description'}><span>Capacity: </span> 2000
                                                                Kg
                                                            </li>
                                                            <li className={'description'}><span>Used: </span> 20%</li>
                                                            <li className={'description'}><span>Area: </span> 12 x 20
                                                                sqft
                                                            </li>
                                                            <li className={'description'}>
                                                                <span>Nearest Dock: </span> S-2
                                                            </li>
                                                        </ul>
                                                    </Box>
                                                </Box>
                                            </React.Fragment>
                                        )
                                    })}
                                </Box>
                            : <Box sx={{
                                width: '100%',
                                height: '100px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexFlow: 'column'
                            }}>
                                <Typography sx={{
                                    fontSize: '14px',
                                    maxWidth: '200px',
                                    mb: 2,
                                }}>Warehouse setup is pending. Please setup your warehouse.</Typography>
                                <Button size={'small'} variant={'contained'}
                                        onClick={() => navigate('/create-warehouse')}
                                        sx={{borderRadius: '12px', width: '120px'}}>
                                    Continue
                                </Button>
                            </Box>
                        }
                    </Box>

                </Paper>

                <Box component={'section'} sx={{
                    width: '100%',
                    height: '270px',
                }}>
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        columnGap: 1,
                        '& .MuiMenu-paper': {
                            borderRadius: '20px !important',
                            background: '#f16334 !important'
                        },
                    }}>
                        <Typography variant={'h3'} sx={{
                            fontSize: '1.1rem',
                        }}>List of Bins 2</Typography>

                        <ThemeTextField label={'Sort by'} select size={'small'} value={''}
                                        sx={{width: '100px', minHeight: 'max-content'}}>
                            <MenuItem value={'1'}>One</MenuItem>
                            <MenuItem value={'2'}>Two</MenuItem>
                            <MenuItem value={'3'}>Three</MenuItem>
                        </ThemeTextField>

                    </Box>

                    <Box sx={{
                        display: 'flex',
                        flexFlow: 'column',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        columnGap: 1,
                        overflowX: 'auto',
                        pt: 1,
                        '& .MuiListItem-root': {
                            borderRadius: 3,
                            p: '0.2rem 1rem',
                            '& .listBox': {
                                flex: 1,
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                columnGap: 1,
                                '& .binName': {
                                    cursor: 'pointer',
                                    flex: 1,
                                    minWidth: '80px',
                                    maxWidth: '200px',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                    '&:hover': {
                                        color: theme.palette.secondary.main
                                    },
                                },
                                '& .updateDate, & .nearestDock, & .usedSpaceLabel': {
                                    fontSize: theme.typography.pxToRem(14),
                                },
                                '& .updateDate': {
                                    width: '110px',
                                    display: "flex",
                                    alignItems: 'center',
                                    gap: '4px',
                                    pointerEvents: 'none',
                                },
                                '& .nearestDock': {
                                    width: '110px',
                                    pointerEvents: 'none'
                                },
                                '& .usedSpace': {
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    width: '150px',
                                    pointerEvents: 'none',
                                    gap: '2px',
                                    '& .MuiLinearProgress-root': {
                                        width: '140px',
                                    },
                                    '& .usedSpaceLabel': {
                                        width: '40px',
                                        textAlign: 'center',
                                    },
                                },
                            },
                            '& svg': {
                                fontSize: '1rem',
                            },
                            '& .MuiLinearProgress-root': {
                                borderRadius: '20px',
                            },
                            '&:hover': {
                                background: alpha(theme.palette.primary.main, 0.07),
                            },
                        },
                    }}>
                        <ListItem disablePadding sx={{
                            borderBlock: `1px solid ${theme.palette.secondary.main}`,
                            mb: 0.5,
                            borderRadius: '0 !important',
                            '& .MuiTypography-root': {
                                color: theme.palette.primary.main,
                                fontWeight: 600,
                                fontSize: '14px'
                            },
                        }}>
                            <Box className={'listBox'}>
                                <Typography className={'binName'}>Bin Name</Typography>
                                <Typography className={'updateDate'}>Last Updated</Typography>
                                <Typography className={'nearestDock'}>Nearest Dock</Typography>
                                <Typography variant={'body2'} width={'150px'}>Used Space</Typography>
                            </Box>
                        </ListItem>

                        {bins.map((bin, index) => {

                            const usedSpace = Math.round((bin.used_space / bin.capacity) * 100)

                            return (
                                <ListItem key={index} disablePadding>
                                    <Box className={'listBox'}>
                                        <Typography className={'binName'} onClick={() => navigate(`bins/${bin.id}`)}>
                                            {bin.name}
                                        </Typography>
                                        <Typography className={'updateDate'}>
                                            <Event/>{moment(bin.last_update).format('DD MMM YYYY')}
                                        </Typography>
                                        <Typography className={'nearestDock'}>
                                            {bin.nearest_dock ?? '-'}
                                        </Typography>
                                        <Stack direction={'row'} className={'usedSpace'}>
                                            <LinearProgress variant="determinate" value={usedSpace}/>
                                            <Typography className={'usedSpaceLabel'}>{usedSpace}%</Typography>
                                        </Stack>
                                    </Box>
                                </ListItem>
                            )
                        })}
                    </Box>
                </Box>

            </Box>

            <Box flex={1} minWidth={'280px'}>
                <Box sx={{
                    width: '100%',
                    height: '200px',
                    background: theme.palette.primary.main,
                    borderRadius: 7,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexFlow: 'column'
                }}>
                    <Box sx={{maxWidth: '300px'}}>
                        <Typography color={theme.palette.primary.contrastText} sx={{
                            maxWidth: '300px', textAlign: 'center', mb: 2, fontSize: '15px'
                        }
                        }>Initial setup is completed.<br/>To view pending setup dashboard,<br/>click the button
                            below.</Typography>
                        <Button variant={'contained'} onClick={toggleState} color={'secondary'} fullWidth
                                sx={{borderRadius: 3}}>Toggle View</Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

