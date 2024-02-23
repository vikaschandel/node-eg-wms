import React, {useEffect, useState} from 'react'
import PageContainer from "../../components/containers/page-container"
import {updatePageTitle} from "../../slices/page-title-slice"
import {useDispatch} from "react-redux"
import {alpha, Box, Button, Paper, Step, StepLabel, Stepper, Typography, useTheme} from "@mui/material"
import {ThemeLoadingButton} from "../../components/buttons/theme-loading-button"
import {ArrowRightRounded} from "@mui/icons-material"
import {ThemeTextField} from "../../components/inputs/theme-text-field"
import {Controller, useForm} from "react-hook-form"
import allSetIllustration from '../../assets/images/all-set.png'
import {useNavigate} from "react-router-dom"


export default function BasicInfoBlock(props: any) {

    const {handleNext} = props

    const {handleSubmit, control, formState: {errors}} = useForm({
        defaultValues: {
            displayName: 'Eternity Solutions',
            username: 'user@wms.com',
            gstin: 'FGFHG556565FF',
            pan: 'RTRT778GG',
            extraInfo: 'Some text here for more info',
        }
    })

    const onSubmit = (data: any) => {
        console.log(data)
        handleNext()
    }


    return (
        <Box component={'form'} className={'currentStepDiv'}>
            <Box className={'inputBlock'} sx={{
                pt: 3,
                flex: 1,
                display: 'flex',
                justifyContent: 'space-between',
                alignContent: 'flex-start',
                columnGap: 2,
                flexWrap: 'wrap',
                width: '90%'
            }}>
                <Controller
                    name={'displayName'}
                    control={control}
                    rules={{required: {value: true, message: 'Required'}}}
                    render={({field}) => (
                        <ThemeTextField
                            {...field}
                            error={Boolean(errors?.displayName)}
                            helperText={(errors?.displayName?.message ?? '').toString()}
                            size={'small'} label={'Display Name'}
                            sx={{minWidth: {xs: '100%', sm: '30%'}, flex: {xs: 'auto', sm: 1}}}
                            placeholder={'Display Name'}
                        />
                    )}/>
                <Controller
                    name={'extraInfo'}
                    control={control}
                    rules={{required: {value: true, message: 'Required'}}}
                    render={({field}) => (
                        <ThemeTextField
                            {...field}
                            error={Boolean(errors?.extraInfo)}
                            helperText={(errors?.extraInfo?.message ?? '').toString()}
                            size={'small'} label={'Extra Info'}
                            sx={{minWidth: {xs: '100%', sm: '30%'}, flex: {xs: 'auto', sm: 1}}}
                            placeholder={'other info'}
                        />
                    )}/>
                <Controller
                    name={'username'}
                    control={control}
                    rules={{required: {value: true, message: 'Required'}}}
                    render={({field}) => (
                        <ThemeTextField
                            {...field}
                            error={Boolean(errors?.username)}
                            helperText={(errors?.username?.message ?? '').toString()}
                            size={'small'} label={'username'}
                            sx={{minWidth: {xs: '100%', sm: '30%'}, flex: {xs: 'auto', sm: 1}}}
                            placeholder={'@username'}
                        />
                    )}/>
                <Controller
                    name={'gstin'}
                    control={control}
                    rules={{required: {value: true, message: 'Required'}}}
                    render={({field}) => (
                        <ThemeTextField
                            {...field}
                            error={Boolean(errors?.gstin)}
                            helperText={(errors?.gstin?.message ?? '').toString()}
                            size={'small'} label={'GSTIN'}
                            sx={{minWidth: {xs: '100%', sm: '30%'}, flex: {xs: 'auto', sm: 1}}}
                            placeholder={'gstin'}
                        />
                    )}/>
                <Controller
                    name={'pan'}
                    control={control}
                    rules={{required: {value: true, message: 'Required'}}}
                    render={({field}) => (
                        <ThemeTextField
                            {...field}
                            error={Boolean(errors?.pan)}
                            helperText={(errors?.pan?.message ?? '').toString()}
                            size={'small'} label={'PAN'}
                            sx={{minWidth: {xs: '100%', sm: '30%'}, flex: {xs: 'auto', sm: 1}}}
                            placeholder={'Pan number'}
                        />
                    )}/>

            </Box>
            <Box className={'flex'}
                 sx={{justifyContent: 'space-between !important', width: '100%'}}>
                <ThemeLoadingButton onClick={handleNext}>Skip</ThemeLoadingButton>
                <ThemeLoadingButton onClick={handleSubmit(onSubmit)} variant={'contained'} sx={{minWidth: {xs: 'min-content', sm: '220px'}}}>
                    Save & Continue<ArrowRightRounded/>
                </ThemeLoadingButton>
            </Box>
        </Box>
    )
}
