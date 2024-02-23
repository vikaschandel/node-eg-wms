import React from 'react'
import {Backdrop} from "@mui/material"

export default function LoadingView() {

    return (
        <Backdrop
            open
            sx={{
                color: '#fff',
                zIndex: (theme) => theme.zIndex.drawer + 1,
                textAlign: 'center',
            }}>
            Please wait...
        </Backdrop>
    )
}