import React, {useEffect} from 'react'
import PageContainer from "../../components/containers/page-container";
import {useDispatch} from "react-redux";
import {updatePageTitle} from "../../slices/page-title-slice";
import {updateSearchBar} from "../../slices/serach-bar-slice";

export default function Configurations() {

    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(updatePageTitle('Configurations'))
    })

    return (
        <PageContainer>
            <h1>Configurations Page</h1>
        </PageContainer>
    )
}