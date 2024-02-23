import React, {useEffect, useState} from 'react'
import PageContainer from "../../components/containers/page-container"
import {updatePageTitle} from "../../slices/page-title-slice"
import {useDispatch} from "react-redux"
import {
    alpha,
    Autocomplete,
    Box,
    Button,
    IconButton,
    Paper,
    Step,
    StepLabel,
    Stepper, Tooltip,
    Typography, useMediaQuery,
    useTheme
} from "@mui/material"
import {ThemeLoadingButton} from "../../components/buttons/theme-loading-button"
import {Add, ArrowRightRounded, Delete} from "@mui/icons-material"
import {ThemeTextField} from "../../components/inputs/theme-text-field"
import {Controller, useFieldArray, useForm} from "react-hook-form"
import allSetIllustration from '../../assets/images/all-set.png'
import {useNavigate} from "react-router-dom"
import {updateLoggedInClient} from "../../slices/logged-in-client-slice";

const locationList = ['Hisar', 'Chandigarh', 'Ludhiana', 'karnal']

export default function CreateRegionalClientsBlock(props: any) {

    const {handleNext, handleBack} = props

    const theme = useTheme()
    const dispatch = useDispatch()

    const mobileScreen = useMediaQuery('(max-width:600px)')

    const {control, handleSubmit, formState: {errors}} = useForm({
        defaultValues: {
            regionalClients: [{name: '', location: ''}]
        },
    })
    const {fields, remove, prepend} = useFieldArray({name: "regionalClients", control})

    const onSubmit = (data: any) => {
        console.log(data)
        handleNext()
        dispatch(updateLoggedInClient({baseClientSetupCompleted: true}))
    }

    return (
        <Box component={'form'} className={'currentStepDiv'}>
            <Box className={'flex'} sx={{
                pt: 3,
                flex: 1,
                flexFlow: 'column',
                width: '100%',
                justifyContent: 'flex-start !important',
                overflowY: 'auto',
                maxHeight: 'min(60vh, 600px)'
            }}>

                {fields.map((field, index) => {
                    return (
                        <Box key={field.id} sx={{
                            display: 'flex',
                            flexWrap: {xs: 'wrap', sm: 'nowrap'},
                            alignItems: 'flex-start',
                            columnGap: 2,
                            width: '90%',
                            border: {xs: `1px solid ${theme.palette.secondary.main}`, sm: 'none'},
                            p: {xs: '10px', sm: 0},
                            borderRadius: '12px',
                            mb: {xs: 1, sm: 0},
                            '& .deleteRowButton, & .addRowButton': {
                                minWidth: {xs: '100%', sm: '2rem'},
                                borderRadius: '50vh',
                            },
                            '&:first-of-type .deleteRowButton': {
                                display: 'none',
                            },
                            '&:not(:first-of-type) .addRowButton': {
                                display: 'none',
                            },

                        }}>
                            <>
                                <Controller
                                    name={`regionalClients.${index}.name`}
                                    control={control}
                                    rules={{required: {value: true, message: 'Required'}}}
                                    render={({field}) => (
                                        <ThemeTextField
                                            {...field}
                                            error={Boolean(errors?.regionalClients?.[index]?.name)}
                                            helperText={errors?.regionalClients?.[index]?.name?.message}
                                            size={'small'} label={'Client Name'}
                                            sx={{width: {xs: '100%', sm: '50%'}}}
                                            placeholder={'Client Name'}
                                        />
                                    )}/>

                                <Controller name={`regionalClients.${index}.location`} control={control}
                                            rules={{required: {value: true, message: 'Required'}}}
                                            render={({field: {onChange, value}}) => (
                                                <Autocomplete size={'small'}
                                                              onChange={(e, data) => onChange(data)}
                                                              sx={{width: {xs: '100%', sm: '50%'}}}
                                                              options={locationList}
                                                              renderInput={(params) => (
                                                                  <ThemeTextField
                                                                      {...params}
                                                                      error={Boolean(errors?.regionalClients?.[index]?.location)}
                                                                      helperText={errors?.regionalClients?.[index]?.location?.message}
                                                                      size={'small'} label={'Location'}
                                                                      placeholder={'Select location'}
                                                                  />
                                                              )}/>
                                            )}/>
                                <Tooltip title={mobileScreen ? '' : 'Remove this entry'} arrow placement={'top'}>
                                    <Button variant={mobileScreen ? 'outlined' : 'text'} color={'error'}
                                            className={'deleteRowButton'} onClick={() => remove(index)}>
                                        {mobileScreen ? 'Remove' : <Delete/>}
                                    </Button>
                                </Tooltip>
                                <Tooltip title={mobileScreen ? '' : 'Add a new entry'} arrow placement={'top'}>
                                    <Button variant={mobileScreen ? 'outlined' : 'text'} color={'success'}
                                            className={'addRowButton'} onClick={() =>
                                        prepend({
                                            name: '',
                                            location: ''
                                        })
                                    }>
                                        {mobileScreen ? 'Add More' : <Add/>}
                                    </Button>
                                </Tooltip>
                            </>
                        </Box>
                    )
                })}

            </Box>
            <Box className={'flex'} sx={{justifyContent: 'space-between !important', width: '100%'}}>
                <ThemeLoadingButton onClick={handleBack}>Back</ThemeLoadingButton>
                <ThemeLoadingButton onClick={handleSubmit(onSubmit)} variant={'contained'}
                                    sx={{minWidth: {xs: 'min-content', sm: '220px'}}}>
                    Submit <ArrowRightRounded/>
                </ThemeLoadingButton>
            </Box>
        </Box>
    )
}