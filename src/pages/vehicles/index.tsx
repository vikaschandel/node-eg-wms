import React, {useEffect} from 'react'
import PageContainer from "../../components/containers/page-container"
import {updatePageTitle} from "../../slices/page-title-slice"
import {useDispatch} from "react-redux"
import {Box, useTheme} from "@mui/material"


export default function Vehicles() {

    const theme = useTheme()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(updatePageTitle('Vehicles'))
    }, [])

    return (
        <PageContainer>
            <Box sx={{
                display: 'flex',
                flexFlow: 'column',
                height: '100%',
                justifyContent: 'flex-start'
            }}>
                Vehicles
            </Box>
        </PageContainer>
    )
}