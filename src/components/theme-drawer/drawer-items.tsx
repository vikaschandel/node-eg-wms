import React from 'react'
import {Badge, List, ListItem, ListItemButton, ListItemIcon, ListItemText, useMediaQuery} from "@mui/material"
import {
    DashboardRounded, Diversity2Rounded,
    EqualizerRounded,
    HomeRounded, HubRounded, LocalShippingRounded,
    NotificationsRounded,
    PeopleRounded, SettingsSuggestRounded,
    TaskAltRounded, WarehouseRounded
} from "@mui/icons-material"
import {NavLink} from 'react-router-dom'


export default function DrawerItems(props:any) {

    const {toggleDrawer} = props
    const isSmallScreen = useMediaQuery('(max-width:900px)')


    const navItems = [
        {label: 'Dashboard', link: '/', icon: DashboardRounded},
        {label: 'My Warehouse', link: '/my-warehouse', icon: WarehouseRounded},
        {label: 'Regional Clients', link: '/regional-clients', icon: Diversity2Rounded},
        {label: 'Inbox', link: '/inbox', icon: NotificationsRounded},
        {label: 'Vehicles', link: '/vehicles', icon: LocalShippingRounded},
        {label: 'Analytics', link: '/analytics', icon: EqualizerRounded},
        {label: 'Setting', link: '/configurations', icon: SettingsSuggestRounded},
    ]


    return (
        <>
            <List>
                {navItems.map((navItem, index) => {
                    let MyIcon = navItem.icon
                    return (
                        <NavLink key={index} to={navItem.link} onClick={isSmallScreen ? toggleDrawer : ()=>{}}
                                 className={({isActive}) => isActive ? 'activeNavlink' : ''}>
                            <ListItem disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <Badge color="secondary" variant="dot" invisible={!(navItem.label == 'Inbox')}
                                               anchorOrigin={{
                                                   vertical: 'top',
                                                   horizontal: 'left',
                                               }}>
                                            <MyIcon/>
                                        </Badge>
                                    </ListItemIcon>
                                    <ListItemText primary={navItem.label}/>
                                </ListItemButton>
                            </ListItem>
                        </NavLink>
                    )
                })}
            </List>
        </>
    )
}