import React, {useEffect, useState} from 'react'
import PageContainer from "../../components/containers/page-container"
import {useDispatch} from "react-redux"
import {updatePageTitle} from "../../slices/page-title-slice"
import {
    alpha,
    Autocomplete,
    Box,
    Button, Checkbox, FormControlLabel,
    InputAdornment, lighten,
    MenuItem,
    Paper,
    Tooltip,
    Typography,
    useMediaQuery,
    useTheme
} from "@mui/material"
import {useForm, Controller, useFieldArray} from "react-hook-form"
import {ThemeTextField} from "../../components/inputs/theme-text-field";
import {Add, Delete, EmailRounded} from "@mui/icons-material";
import {updateLoggedInClient} from "../../slices/logged-in-client-slice";


export default function CreateWarehouse() {

    const dispatch = useDispatch()

    const [processStep, setProcessStep] = useState<number>(1)
    const [area, setArea] = useState({rows: 0, columns: 0})

    const {handleSubmit, control, reset, watch, formState: {errors}} = useForm({
        defaultValues: {
            docks: [{name: '', location: ''}]
        },
    })

    useEffect(() => {
        dispatch(updatePageTitle('Create Warehouse'))
    }, [])


    return (
        <PageContainer>
            <Box component={'form'} sx={{
                minHeight: '100%',
                display: 'flex',
                mx: 'auto',
                maxWidth: '80%'
            }}>

                <Paper sx={{
                    flex: 1,
                    width: '100%',
                    borderRadius: 4,
                    p: 2,
                    display: 'flex',
                    flexFlow: 'column',
                    alignContent: 'flex-start',
                    justifyContent: 'center',
                    '& h4': {
                        fontSize: '1.2rem',
                        width: '100%'
                    },
                    '& .actionBox': {
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                        gap: 2,
                        '& .MuiButton-root': {
                            minWidth: {xs: 'min-content', sm: '120px'},
                            borderRadius: '12px',
                        },
                    }
                }}>
                    {(processStep == 1)
                        ? <FormStepOne setArea={setArea} setProcessStep={setProcessStep} handleSubmit={handleSubmit}
                                       control={control}
                                       errors={errors}/>
                        : processStep == 2
                            ? <FormStepTwo setArea={setArea} processStep={processStep} setProcessStep={setProcessStep}
                                           handleSubmit={handleSubmit} control={control} errors={errors}/>
                            : processStep == 3
                                ? <FormStepThree watch={watch} area={area} processStep={processStep}
                                                 setProcessStep={setProcessStep}
                                                 handleSubmit={handleSubmit} control={control} errors={errors}/>
                                : <p>completed</p>
                    }
                </Paper>

            </Box>
        </PageContainer>
    )
}

const FormStepOne = (props: any) => {

    const {setArea, setProcessStep, handleSubmit, control, errors} = props

    const onContinue = (data: any) => {
        console.log(data)
        setArea({rows: data.rows, columns: data.columns})
        setProcessStep(2)
    }

    return (
        <>
            <Typography variant={'h4'}>Basic Info</Typography>
            <Box sx={{
                flex: 1,
                display: 'flex',
                flexWrap: 'wrap',
                alignContent: 'center',
                justifyContent: 'center',
                columnGap: 2,
                width: {xs: '100%', md: 'min(80%, 900px)'},
                mx: 'auto'
            }}>
                <Controller
                    name={'name'}
                    control={control}
                    rules={{required: {value: true, message: 'Required'}}}
                    defaultValue={''}
                    render={({field}) => (
                        <ThemeTextField {...field} size={'small'} required
                                        error={Boolean(errors?.name)}
                                        helperText={(errors?.name?.message ?? '').toString()}
                                        label={'Warehouse Name'} placeholder={'Warehouse Name'}
                                        sx={{flex: 1, minWidth: {xs: '100%', sm: '40%'}}}
                        />
                    )}/>
                <Controller
                    name={'location'}
                    control={control}
                    rules={{required: {value: true, message: 'Required'}}}
                    defaultValue={''}
                    render={({field}) => (
                        <ThemeTextField {...field} size={'small'} required
                                        error={Boolean(errors?.location)} select
                                        helperText={(errors?.location?.message ?? '').toString()}
                                        label={'Location'} placeholder={'Warehouse Location'}
                                        sx={{flex: 1, minWidth: {xs: '100%', sm: '40%'}}}
                        >
                            {Array.from(Array(4))
                                .map((_, index) => <MenuItem key={index} value={index}>Location - {index}</MenuItem>)
                            }
                        </ThemeTextField>
                    )}/>
                <Controller
                    name={'columns'}
                    control={control}
                    rules={{required: {value: true, message: 'Required'}}}
                    defaultValue={''}
                    render={({field}) => (
                        <ThemeTextField {...field} size={'small'} required
                                        error={Boolean(errors?.columns)} type={'number'}
                                        helperText={(errors?.columns?.message ?? '').toString()}
                                        label={'Columns'} placeholder={'No. of columns'}
                                        sx={{flex: 1, minWidth: {xs: '100%', sm: '40%'}}}
                        />
                    )}/>
                <Controller
                    name={'rows'}
                    control={control}
                    rules={{required: {value: true, message: 'Required'}}}
                    defaultValue={''}
                    render={({field}) => (
                        <ThemeTextField {...field} size={'small'} required
                                        error={Boolean(errors?.rows)} type={'number'}
                                        helperText={(errors?.rows?.message ?? '').toString()}
                                        label={'Rows'} placeholder={'No. of rows'}
                                        sx={{flex: 1, minWidth: {xs: '100%', sm: '40%'}}}
                        />
                    )}/>
            </Box>

            <Box className={'actionBox'}>
                <Button onClick={handleSubmit(onContinue)} variant={'contained'}>Continue</Button>
            </Box>
        </>
    )
}

const FormStepTwo = (props: any) => {

    const theme = useTheme()
    const {setArea, processStep, setProcessStep, handleSubmit, control, errors} = props
    const locationList = ['North', 'East', 'West', 'South']

    const mobileScreen = useMediaQuery('(max-width:600px)')

    const {fields, remove, prepend} = useFieldArray({name: "docks", control})

    const onContinue = (data: any) => {
        console.log(data)
        setProcessStep(3)
    }

    return (
        <>
            <Typography variant={'h4'}>Docks Info</Typography>
            <Box sx={{
                flex: 1,
                display: 'flex',
                flexWrap: 'wrap',
                alignContent: 'center',
                justifyContent: 'center',
                columnGap: 2,
                width: {xs: '100%', md: 'min(80%, 900px)'},
                mx: 'auto'
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
                                    name={`docks.${index}.name`}
                                    control={control}
                                    rules={{required: {value: true, message: 'Required'}}}
                                    defaultValue={''} render={({field}) => (
                                    <ThemeTextField {...field}
                                                    error={Boolean(errors?.docks?.[index]?.name)}
                                                    helperText={errors?.docks?.[index]?.name?.message}
                                                    size={'small'} label={'Dock Name'}
                                                    sx={{width: {xs: '100%', sm: '50%'}}}
                                                    placeholder={'Dock Name'}
                                    />
                                )}/>

                                <Controller name={`docks.${index}.location`} control={control}
                                            rules={{required: {value: true, message: 'Required'}}}
                                            defaultValue={''} render={({field: {onChange, value}}) => (
                                    <Autocomplete size={'small'}
                                                  onChange={(e, data) => onChange(data)}
                                                  sx={{width: {xs: '100%', sm: '50%'}}}
                                                  options={locationList}
                                                  renderInput={(params) => (
                                                      <ThemeTextField
                                                          {...params}
                                                          error={Boolean(errors?.docks?.[index]?.location)}
                                                          helperText={errors?.docks?.[index]?.location?.message}
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

            <Box className={'actionBox'}>
                <Button onClick={() => setProcessStep(processStep - 1)}>Back</Button>
                <Button variant={'contained'} onClick={handleSubmit(onContinue)}>Continue</Button>
            </Box>
        </>
    )
}


const FormStepThree = (props: any) => {

    const theme = useTheme()

    const {area, setProcessStep, handleSubmit, control, errors, watch} = props

    const onContinue = (data: any) => {
        console.log(data)
        // setProcessStep(2)
    }

    const {fields, append} = useFieldArray({name: "sections", control})


    useEffect(() => {
        const totalSections = area.rows * area.columns
        for (let i = 0; i < totalSections; i++) {
            append({
                isBin: false
            })
        }
    }, [area])


    return (
        <>
            <Typography variant={'h4'}>Locate Bins</Typography>
            <Box sx={{
                flex: 1,
                display: 'flex',
                flexWrap: 'wrap',
                alignContent: 'center',
                justifyContent: 'center',
                columnGap: 2,
                width: {xs: '100%', md: 'min(80%, 900px)'},
                mx: 'auto'
            }}>
                <Box sx={{
                    width: 'max-content',
                    p: 1,
                    display: 'grid',
                    gap: 1,
                    gridTemplateColumns: `repeat(${area.columns}, 20px)`,
                    gridRow: 4,
                    maxHeight: `${area.columns * 33}px`,
                    overflow: 'hidden',
                    '& .MuiSvgIcon-root': {
                        opacity: 0,
                    },
                    '& .MuiButtonBase-root': {
                        background: alpha(theme.palette.secondary.main, 0.05),
                        height: '1.5rem',
                        width: '1.5rem',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        transition: theme.transitions.easing.easeInOut,
                        position: 'relative',
                        '&:hover': {
                            background: '#ffa21d',
                            outline: `1px solid #ffa21d`,
                            outlineOffset: '2px',
                        },
                        '&.Mui-checked': {
                            background: theme.palette.primary.main,
                        },
                    },
                }}>
                    {fields.map((field, index) => {
                        return (
                            <Controller
                                key={field.id}
                                name={`sections.${index}.isBin`}
                                control={control}
                                render={({field}) => (
                                    <Checkbox key={index} {...field}/>
                                )}/>
                        )
                    })}
                </Box>
            </Box>

            <Box className={'actionBox'}>
                <Button onClick={handleSubmit(onContinue)} variant={'contained'}> Continue </Button>
            </Box>
        </>
    )
}
