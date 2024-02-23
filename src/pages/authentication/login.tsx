import React, {useState} from 'react'
import {Box, IconButton, InputAdornment, Typography} from "@mui/material"
import {ArrowRightRounded, EmailRounded, KeyRounded, Visibility, VisibilityOff} from "@mui/icons-material"
import {Controller, useForm} from "react-hook-form"

import LoadingView from "../../components/loading-view"
import {useDispatch} from "react-redux"
import {updateAuth} from "../../slices/auth-slice"
import {updateSnackbarMessage} from "../../slices/snackbar-message-slice"
import {ThemeLoadingButton} from "../../components/buttons/theme-loading-button"
import {ThemeTextField} from "../../components/inputs/theme-text-field"


export default function Login() {

    const dispatch = useDispatch()

    const {handleSubmit, control, formState: {errors}} = useForm()

    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [submitting, setSubmitting] = useState<boolean>(false)

    const togglePassword = () => setShowPassword((prevState => !prevState))

    const onSubmit = (data: any) => {
        setSubmitting(true)
        if (data.username == 'user@wms.com' && data.password == '12345678') {
            setSubmitting(false)
            dispatch(updateAuth(true))
        } else {
            setSubmitting(false)
            dispatch(updateSnackbarMessage({
                title: 'Invalid Credentials',
                message: 'Username or password is incorrect',
                severity: 'error'
            }))
        }
    }

    return (
        <>
            <Box className={'formBlock'}>
                <Box className={'formContainer'}>
                    <Controller
                        name={'username'}
                        control={control}
                        rules={{
                            required: {value: true, message: 'Required'},
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: 'Enter valid email address'
                            }
                        }}
                        defaultValue={''}
                        render={({field}) => (
                            <ThemeTextField
                                {...field}
                                error={Boolean(errors?.username)}
                                helperText={(errors?.username?.message ?? '').toString()}
                                size={'small'}
                                placeholder={'your@email.address'}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <EmailRounded/>
                                        </InputAdornment>
                                    ),
                                }}/>
                        )}/>
                    <Controller
                        name={'password'}
                        control={control}
                        rules={{
                            required: {value: true, message: 'Required'},
                        }}
                        defaultValue={''}
                        render={({field}) => (
                            <ThemeTextField
                                {...field}
                                error={Boolean(errors?.password)}
                                helperText={(errors?.password?.message ?? '').toString()}
                                type={showPassword ? 'text' : 'password'}
                                size={'small'}
                                placeholder={'*******'}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start"><KeyRounded/></InputAdornment>
                                    ),
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={togglePassword}
                                                onMouseDown={togglePassword}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff/> : <Visibility/>}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}/>
                        )}/>
                    <ThemeLoadingButton
                        color={'primary'}
                        variant={'contained'}
                        size="small"
                        onClick={handleSubmit(onSubmit)}
                        type={'submit'}
                        loading={submitting}
                        endIcon={<></>}
                        loadingPosition="end">
                        Login <ArrowRightRounded/>
                    </ThemeLoadingButton>

                </Box>
                {submitting && <LoadingView/>}
            </Box>
        </>
    )
}