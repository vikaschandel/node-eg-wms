import React from 'react'
import {alpha, styled, TextField} from "@mui/material";


export const ThemeTextField = styled(TextField)(({theme}) => ({
    margin: '0 !important',
    width: '100%',
    minHeight: '65px',
    '& label': {
        fontSize: theme.typography.pxToRem(14),
        lineHeight: theme.typography.pxToRem(22),
        fontWeight: 500,
        letterSpacing: '1px',
    },
    '& label.Mui-focused': {
        color: theme.palette.primary.main,
    },
    '& label.Mui-error': {
        color: theme.palette.error.main,
    },
    '& .MuiFormHelperText-root': {
        marginTop: 0,
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
    },
    '& .MuiOutlinedInput-root': {
        borderRadius: '12px',
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            // borderWidth: '1px',
        },
        '& .MuiOutlinedInput-notchedOutline': {
            // borderColor: '#83838350 !important',
        },
        '& input': {
            fontSize: theme.typography.pxToRem(15),
            fontWeight: 500,
            '&[type=number]': {
                MozAppearance: 'textfield',
                '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
                    WebkitAppearance: 'none',
                    margin: 0,
                },
            },
            '&:focus:valid': {
                color: theme.palette.success.main,
            },
            '&:focus:invalid': {
                color: theme.palette.warning.main,
            },
            '&:focus:valid + fieldset': {
                // borderWidth: '1px',
                borderRadius: '12px',
            },
            '&:invalid + fieldset': {
                // borderWidth: '1px',
                borderRadius: '12px',
            },
            '&:-internal-autofill-selected': {
                background: 'transparent !important'
            },
        },
        '& fieldset': {
            borderWidth: 0,
            borderColor: alpha(theme.palette.secondary.main, 0.5),
            borderRadius: '12px',
            background: alpha(theme.palette.secondary.main, 0.07),
            // boxShadow: `0 0 12px -3px inset ${alpha(theme.palette.secondary.main, 0.9)}`,
            '&:hover': {
                borderWidth: '1px',
                borderColor: '#83838350 !important',
                borderRadius: '12px',
            }
        },
        '&.Mui-disabled fieldset': {
            background: alpha(theme.palette.text.disabled, 0.1),
        },
        '&.Mui-focused fieldset': {
            // borderColor: alpha(theme.palette.secondary.main, 0.8),
            background: theme.palette.primary.main + '07',
        },
        '&.Mui-error fieldset': {
            borderWidth: '1px',
            borderRadius: '12px',
            borderColor: `${theme.palette.error.main} !important`,
        },
    },
    '& .MuiOutlinedInput-input.Mui-disabled': {
        WebkitTextFillColor: theme.palette.text.secondary,
    },
    '& .MuiSelect-select':{
        fontSize: theme.typography.pxToRem(14),
        fontWeight: 500,
    },
}))