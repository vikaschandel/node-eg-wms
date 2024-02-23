import React, {useEffect, useLayoutEffect, useMemo} from 'react'
import {Routes, Route} from 'react-router-dom'
import Layout from "../layout"
import Dashboard from "../pages/dashboard"
import Inbox from "../pages/inbox"
import Analytics from "../pages/analytics"
import Configurations from "../pages/configurations"
import ProtectedRouteAuthCheck from "./protected-route-auth-check"
import Authentication from "../pages/authentication"
import MyAccount from "../pages/my-account"
import {createTheme, ThemeProvider} from "@mui/material";
import {useSelector} from "react-redux";
import {RootState} from "../store/store";
import InitialSetupPage from "../pages/initial-setup-page";
import Vehicles from "../pages/vehicles";
import RegionalClients from "../pages/regional-clients";
import MyWarehouse from "../pages/my-warehouse";
import Bins from "../pages/bins";
import SingleBin from "../pages/bins/single-bin";
import CreateWarehouse from "../pages/my-warehouse/create-warehouse";


export default function WebRoutes() {

    const initialMode = useSelector((state: RootState) => state.colorMode.mode)

    const theme = useMemo(() =>
            createTheme({
                palette: {
                    primary: {
                        main: '#00875A',
                        // main: '#019267',
                        // main: '#3D8361',
                        // main: '#023047',
                    },
                    secondary: {
                        main: '#00C897',
                        // main: '#177e89',
                    },
                    mode: initialMode,
                },
                typography: {
                    h1: {fontFamily: "Josefin Sans, sans-serif"},
                    h2: {fontFamily: "Josefin Sans, sans-serif"},
                    h3: {fontFamily: "Josefin Sans, sans-serif"},
                    h4: {fontFamily: "Josefin Sans, sans-serif"},
                    h5: {fontFamily: "Josefin Sans, sans-serif"},
                    h6: {fontFamily: "Josefin Sans, sans-serif"},
                    button: {
                        fontFamily: "Quicksand, sans-serif",
                        fontWeight: 500,
                    },
                    fontFamily: "Quicksand, sans-serif"
                },
                components: {
                    MuiMenu: {
                        styleOverrides: {
                            paper: {
                                borderRadius: '16px !important'
                            },
                        },
                    },
                },
            }),
        [initialMode],
    )

    const documentTitle = useSelector((state: RootState) => state.pageTitle.title)

    useLayoutEffect(() => {
        document.title = documentTitle ?? 'WMS - Warehouse management system'
    }, [documentTitle])

    return (
        <ThemeProvider theme={theme}>
            <Routes>
                <Route path="authentication" element={<Authentication/>}/>
                <Route path="*" element={<h1>No Page Found</h1>}/>
                <Route element={<ProtectedRouteAuthCheck/>}>
                    <Route path="/" element={<Layout/>}>
                        <Route path="" element={<Dashboard/>}/>
                        <Route path="initial-setup" element={<InitialSetupPage/>}/>
                        <Route path="regional-clients" element={<RegionalClients/>}/>
                        <Route path="my-warehouse" element={<MyWarehouse/>}/>
                        <Route path="create-warehouse" element={<CreateWarehouse/>}/>
                        <Route path="vehicles" element={<Vehicles/>}/>
                        <Route path="analytics" element={<Analytics/>}/>
                        <Route path="configurations" element={<Configurations/>}/>
                        <Route path="my-account" element={<MyAccount/>}/>
                        <Route path="inbox" element={<Inbox/>}/>
                        <Route path="bins" element={<Bins/>}/>
                        <Route path="bins/:binId" element={<SingleBin/>}/>
                    </Route>
                </Route>
            </Routes>
        </ThemeProvider>
    )
}