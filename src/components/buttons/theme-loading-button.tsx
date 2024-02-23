import React from 'react'
import {LoadingButton} from "@mui/lab"
import {styled} from "@mui/material"


export const ThemeLoadingButton = styled(LoadingButton)({
    borderRadius: '12px',
    padding: '0.5rem 1rem',
    position: 'relative',
    '&:hover': {
        '& svg': {
            right: '0.5rem',
            opacity: 1,
            transition: 'all 150ms ease-in-out',
        },
    },
    '& svg': {
        position: 'absolute',
        right: '1rem',
        opacity: 0,
        transition: 'all 150ms ease-in-out',
    },
})
