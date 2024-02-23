import React, {ReactNode} from 'react'
import {Box} from "@mui/material"


interface PageContainerProps {
    children: ReactNode
}

export default function PageContainer(props: PageContainerProps) {

    const {children} = props

    return (
        <Box className={'page1'} sx={{
            flex: 1,
            p: 2,
            minHeight: '87vh'
        }}>
            {children}
        </Box>
    )
}