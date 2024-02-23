import React, {useEffect} from 'react'
import PageContainer from "../../components/containers/page-container"
import {useDispatch} from "react-redux"
import {updatePageTitle} from "../../slices/page-title-slice"
import {useNavigate, useParams} from "react-router-dom"
import {Button} from "@mui/material";


export default function SingleBin() {

    const navigate = useNavigate()
    const params = useParams()
    const binId = params.binId

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(updatePageTitle(`Bin Name ${binId}`))
        console.log(binId)
    })

    return (
        <PageContainer>
            <h1>{binId} Bin Page </h1>
            <Button onClick={()=>navigate('/dddddd')}>404</Button>

        </PageContainer>
    )
}