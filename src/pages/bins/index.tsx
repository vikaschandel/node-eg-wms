import React, {useEffect} from 'react'
import PageContainer from "../../components/containers/page-container";
import {useDispatch} from "react-redux";
import {updatePageTitle} from "../../slices/page-title-slice";
import {updateSearchBar} from "../../slices/serach-bar-slice";
import {useNavigate} from "react-router-dom";
import {Button} from "@mui/material";

export default function Bins() {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(updatePageTitle('Bins'))
    })

    return (
        <PageContainer>
            <h1>Bins Page</h1>
            <Button onClick={()=> navigate('01')}>Single Bin</Button>
        </PageContainer>
    )
}