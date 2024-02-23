import React, {useEffect} from 'react'
import PageContainer from "../../components/containers/page-container";
import {useDispatch} from "react-redux";
import {updatePageTitle} from "../../slices/page-title-slice";
import {warehouses} from "../../utils/sample-data";
import {Box, Button, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import WarehouseList from "./warehouse-list";

export default function MyWarehouse() {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(updatePageTitle('My Warehouses'))
    })


    return (
        <PageContainer>
            {
                (warehouses.length > 0)
                    ? <WarehouseList/>
                    : <EmptyPageView/>
            }
        </PageContainer>
    )
}

const EmptyPageView = () => {

    const navigate = useNavigate()

    return (
        <Box sx={{
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexFlow: 'column',
        }}>
            <Typography>
                No warehouse to display.
            </Typography>
            <Button variant={'contained'} onClick={() => navigate('/create-warehouse')}
                    sx={{borderRadius: '12px', mt: 2,}}>
                Add Warehouse
            </Button>
        </Box>
    )
}