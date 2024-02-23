import React, {useState} from 'react'
import {Box, Button, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography} from "@mui/material";
import {LogoutRounded} from "@mui/icons-material";
import ThemeDialog from "../dialog-box/theme-dialog";
import confirmationAvatar from "../../assets/icons/confirmation-avatar.svg";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {LoadingButton} from "@mui/lab";
import {updateAuth} from "../../slices/auth-slice";
import {updateSnackbarMessage} from "../../slices/snackbar-message-slice";


export default function LogoutMenuItem() {

    const [openD, setOpenD] = useState<boolean>(false)
    const closeDialog = () => setOpenD(false)

    return (
        <>
            <ListItem disablePadding sx={{flex: 1}} onClick={() => setOpenD(true)}>
                <ListItemButton>
                    <ListItemIcon>
                        <LogoutRounded/>
                    </ListItemIcon>
                    <ListItemText primary={'Logout'}/>
                </ListItemButton>
            </ListItem>

            <ThemeDialog open={openD} onClickClose={closeDialog}
                         dialogBody={<LogoutDialogContent/>}
                         dialogAction={<LogoutDialogActions onClickClose={closeDialog}/>}/>
        </>
    )
}


const LogoutDialogContent = () => {
    return (
        <Box sx={{
            width: {xs: 'auto', sm: '450px'},
            mx: 2, mt: 2,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: 'wrap',
            '& img': {
                width: 'min(100%, 100px)',
                maxHeight: '100px'
            },
        }}>
            <Typography sx={{alignSelf: 'flex-end', fontSize: '2.5rem', fontWeight: 600}}>Logout</Typography>
            <img src={confirmationAvatar} alt={'are you sure'}/>
            <Typography sx={{width: '100%', textAlign: 'center'}}>Are you sure to end this session?</Typography>
        </Box>
    )
}

const LogoutDialogActions = (props: any) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [working, setWorking] = useState(false)

    const onClickYes = () => {
        setWorking(true)
        dispatch(updateAuth(false))
        setWorking(false)
        navigate('/authentication')
    }


    return (
        <Box sx={{
            width: {xs: '100%', sm: '450px'},
            m: 2,
            display: 'flex',
            gap: 2,
            justifyContent: 'space-around',
            alignItems: 'center',
            flexWrap: 'wrap',
            '& .MuiButton-root': {
                width: {xs: 'min(100%, 125px)', sm: 'min(100%, 170px)'},
            },
        }}>
            <LoadingButton
                color={'primary'}
                variant={'contained'}
                onClick={onClickYes}
                loading={working}
                endIcon={<></>}
                loadingPosition="end">
                Logout
            </LoadingButton>
            <Button variant={'contained'} color={'secondary'} onClick={props.onClickClose}>Go Back</Button>
        </Box>
    )
}