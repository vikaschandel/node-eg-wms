import React, {useEffect, useState} from 'react'
import PageContainer from "../../components/containers/page-container"
import {useDispatch, useSelector} from "react-redux"
import {updatePageTitle} from "../../slices/page-title-slice"
import {useLocation, useNavigate} from "react-router-dom";
import {alpha, Avatar, Box, IconButton, lighten, Typography, Unstable_Grid2, useTheme} from "@mui/material";
import {
    ArrowRightRounded,
    AssignmentIndRounded, EmailOutlined,
    ManageAccountsRounded,
    MoreVertRounded, PhoneOutlined,
    SettingsRounded
} from "@mui/icons-material";
import Menu from "@mui/material/Menu";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
import ThemeDialog from "../../components/dialog-box/theme-dialog";
import ThemePasswordInput from "../../components/inputs/theme-password-input";
import {LoadingButton} from "@mui/lab";
import {Controller, useForm} from "react-hook-form";
import {RootState} from "../../store/store";


export default function MyAccount() {

    const location = useLocation()
    const theme = useTheme()

    const dispatch = useDispatch()

    const navigate = useNavigate()
    const loggedInClient = useSelector((state: RootState) => state.loggedInClient)

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget)
    const handleClose = () => setAnchorEl(null)

    const [changePasswordDialog, setChangePasswordDialog] = useState<boolean>(false)
    const onCloseChangePasswordDialog = () => setChangePasswordDialog(false)


    useEffect(() => {
        dispatch(updatePageTitle('My Account'))
    }, [location])

    return (
        <PageContainer>
            <Box component={'section'} sx={{
                '& .textOverFlow': {
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                },
                '& .otherDetailsSection': {
                    display: 'flex',
                    alignContent: 'flex-start',
                    alignItems: 'flex-start',
                    flexWrap: 'wrap',
                    gap: 2,
                    pt: 3,
                    px: {xs: 0, sm: 2, md: 4},
                    '& .detailsContainer': {
                        borderRadius: '12px',
                        background: theme.palette.background.default,
                        p: 2,
                        boxShadow: theme.palette.mode == 'dark' ? 0 : 4,
                        '&.extraDetailsSection': {
                            width: {xs: '100%', md: '65%'},
                        },
                        '&.descriptionSection': {
                            width: {xs: '100%', md: 'auto'},
                            flex: {xs: 'auto', md: 1},
                        },
                        '& .sectionHeading': {
                            fontSize: '1rem',
                            fontWeight: 600,
                            color: theme.palette.text.secondary,
                        },
                        '& .descriptionText': {
                            fontSize: theme.typography.pxToRem(14),
                            fontWeight: 300,
                            color: theme.palette.text.secondary,
                        },
                    },
                    '& .iconChip': {
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: alpha(theme.palette.text.secondary, 0.1),
                        padding: '6px 16px 6px 42px',
                        borderRadius: '50px',
                        position: 'relative',
                        fontSize: '14px',
                        cursor: 'pointer',
                        '& svg': {
                            position: 'absolute',
                            left: '3px',
                            padding: '5px',
                            background: alpha(theme.palette.secondary.main, 0.4),
                            borderRadius: '50vh',
                            fontSize: '26px',
                            transition: 'all 200ms ease-in-out',
                        },
                        '&:hover': {
                            color: theme.palette.secondary.main,
                            '& svg': {
                                background: theme.palette.secondary.main,
                                color: theme.palette.secondary.contrastText,
                            },
                        },
                    },
                },
            }}>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    columnGap: {xs: 2, sm: 6},
                    px: 4,
                    py: 2
                }}>
                    <Avatar sx={{
                        height: {xs: '4rem', sm: '8rem'},
                        width: {xs: '4rem', sm: '8rem'}
                    }}/>
                    <Box flex={1}>
                        <Typography sx={{
                            fontSize: 'clamp(1.2rem, 4vw, 2rem)',
                            fontWeight: 600,
                        }}>Amit Thakur</Typography>
                        <Typography sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                            fontSize: theme.typography.pxToRem(13),
                            '& svg': {
                                fontSize: '1rem'
                            },
                        }}>
                            <AssignmentIndRounded/>Designation</Typography>
                    </Box>
                    <IconButton onClick={handleClick}
                                size="small"
                                sx={{ml: 2}}
                                aria-controls={open ? 'account-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}><MoreVertRounded/></IconButton>
                    <Menu anchorEl={anchorEl}
                          id="account-menu"
                          open={open}
                          onClose={handleClose}
                          onClick={handleClose}
                          transformOrigin={{horizontal: 'right', vertical: 'top'}}
                          anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                          PaperProps={{
                              elevation: 0,
                              sx: {
                                  width: '180px',
                                  overflow: 'visible',
                                  background: (theme.palette.mode == 'dark')
                                      ? lighten(theme.palette.primary.main, 0.2)
                                      : lighten(theme.palette.primary.main, 0.8),
                                  mt: 1.5,
                                  borderRadius: '12px',
                                  px: 1,
                                  py: 0,
                                  '&:before': {
                                      content: '""',
                                      display: 'block',
                                      position: 'absolute',
                                      top: 0,
                                      right: 14,
                                      width: 10,
                                      height: 10,
                                      background: (theme.palette.mode == 'dark')
                                          ? lighten(theme.palette.primary.main, 0.2)
                                          : lighten(theme.palette.primary.main, 0.8),
                                      transform: 'translateY(-50%) rotate(45deg)',
                                      zIndex: 0,
                                  },
                                  '& .userInfo': {
                                      background: alpha(theme.palette.background.default, 0.2),
                                      borderRadius: '8px',
                                      padding: '1rem',
                                      lineHeight: '16px',
                                      fontSize: '15px',
                                      width: '100%',
                                      overflow: 'hidden',
                                      textOverflow: 'ellipsis',
                                      whiteSpace: 'nowrap',
                                      letterSpacing: '0.5px',
                                      mb: 1,
                                      '& span': {
                                          color: theme.palette.text.secondary,
                                          letterSpacing: '1px',
                                      },
                                  },
                              },
                          }}>
                        <MenuItem sx={{borderRadius: '8px'}}>
                            Edit Profile
                        </MenuItem>
                        <MenuItem sx={{borderRadius: '8px',}} onClick={() => setChangePasswordDialog(open)}>
                            Change Password
                        </MenuItem>
                    </Menu>
                </Box>

                <Box className={'otherDetailsSection'}>
                    <Box className={'detailsContainer extraDetailsSection'}>
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            flexWrap: 'wrap',
                            columnGap: 2,
                            rowGap: 1,
                        }}>
                            <a className={'iconChip'}><EmailOutlined/> vikas.singh@wms.com</a>
                            <a className={'iconChip'}><PhoneOutlined/> +91-123456789</a>
                        </Box>

                        {loggedInClient.baseClientSetupCompleted
                            ? 'setup completed'
                            : 'setup pending'
                        }

                    </Box>

                    <Box className={'detailsContainer descriptionSection'}>
                        <Typography variant={'h3'} className={'sectionHeading'}>About Me</Typography>
                        <Divider sx={{mb: 2,}}/>
                        <Typography className={'descriptionText textOverFlow'} sx={{
                            display: '-webkit-box',
                            WebkitLineClamp: {xs: 3, sm: 9},
                            WebkitBoxOrient: 'vertical',
                            textIndent: '1rem'
                        }}>
                            “I am passionate about my work. Because I love what I do, I have a steady source of
                            motivation that drives me to do my best. In my last job, this passion led me to challenge
                            myself daily and learn new skills that helped me to do better work.”
                        </Typography>
                    </Box>

                </Box>
            </Box>


            <ThemeDialog open={changePasswordDialog} onClickClose={onCloseChangePasswordDialog}
                         dialogBody={<ChangePasswordForm/>}/>
        </PageContainer>
    )
}


const ChangePasswordForm = () => {


    const theme = useTheme()
    const dispatch = useDispatch()
    const {handleSubmit, control, formState: {errors}} = useForm()

    const [formSubmitting, setFormSubmitting] = useState<boolean>(false)


    const onSubmit = (data: any) => {
        console.log(data)
    }

    return (
        <Box component={'form'} sx={{
            width: 'clamp(280px, 90vw, 400px)'
        }}>
            <Typography variant={'h3'} sx={{
                fontSize: '1.3rem',
                fontWeight: 500,
            }}>Change Password</Typography>

            <Controller
                name={'currentPassword'}
                control={control}
                rules={{required: {value: true, message: 'Required'}}}
                defaultValue={''}
                render={({field}) => (
                    <ThemePasswordInput
                        fieldProps={field} error={Boolean(errors?.currentPassword)}
                        helperText={errors?.currentPassword?.message}
                        label={'Current Password'}
                        br={'12px'}
                    />
                )}/>

            <Controller
                name={'newPassword'}
                control={control}
                rules={{
                    required: {value: true, message: 'Required'},
                    minLength: {value: 8, message: 'Minimum 8 characters'}
                }}
                defaultValue={''}
                render={({field}) => (
                    <ThemePasswordInput
                        fieldProps={field} error={Boolean(errors?.newPassword)}
                        helperText={errors?.newPassword?.message}
                        label={'New Password'}
                        br={'12px'}
                    />
                )}/>


            <Box sx={{
                display: 'flex',
                flexWrap: 'wrap-reverse',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}>
                <Typography component={'a'} href={'#'} sx={{
                    fontSize: '12px',
                    color: theme.palette.text.secondary,
                    textDecoration: 'none',
                    '&:hover': {
                        color: theme.palette.text.primary,
                    },

                }}>Forgot Password?</Typography>
                <LoadingButton color={'secondary'} variant={'contained'}
                               endIcon={<></>}
                    // type={"submit"}
                               onClick={onSubmit}
                               loading={formSubmitting}
                               loadingPosition="end"
                               size={'small'}
                               sx={{
                                   borderRadius: '50vh',
                                   width: '120px'
                               }}>Save</LoadingButton>
            </Box>
        </Box>
    )
}