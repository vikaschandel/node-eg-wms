import React, {useEffect} from 'react'
import PageContainer from "../../components/containers/page-container";
import {useDispatch} from "react-redux";
import {updatePageTitle} from "../../slices/page-title-slice";

export default function RegionalClients() {

    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(updatePageTitle('Regional Clients'))
    })


    return (
        <PageContainer>
            <h1>Regional Clients Page</h1>
        </PageContainer>
    )
}