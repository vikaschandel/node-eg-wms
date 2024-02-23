import React, {useEffect} from 'react'
import PageContainer from "../../components/containers/page-container";
import {useDispatch} from "react-redux";
import {updatePageTitle} from "../../slices/page-title-slice";

export default function Analytics() {

    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(updatePageTitle('Analytics'))
    })
    return (
        <PageContainer>
            <h1>Analytics Page</h1>
        </PageContainer>
    )
}