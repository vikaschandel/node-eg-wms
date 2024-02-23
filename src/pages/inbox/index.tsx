import React, {useEffect} from 'react'
import PageContainer from "../../components/containers/page-container";
import {useDispatch} from "react-redux";
import {updatePageTitle} from "../../slices/page-title-slice";

export default function Inbox() {

    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(updatePageTitle('Inbox'))
    })

    return (
        <PageContainer>
            <h1>Inbox Page</h1>
        </PageContainer>
    )
}