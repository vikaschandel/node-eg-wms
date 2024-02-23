import React, {useEffect} from 'react'
import WebRoutes from "./web-routes"
import {BrowserRouter} from "react-router-dom"
import {Provider, useDispatch, useSelector} from "react-redux"
import './App.css'
import {PersistGate} from "redux-persist/integration/react"
import {persistStore} from "redux-persist"
import store, {RootState} from "./store/store"
import LoadingView from "./components/loading-view"


export default function App() {

    let persistor = persistStore(store)

    return (
        <Provider store={store}>
            <PersistGate loading={<LoadingView/>} persistor={persistor}>
                <BrowserRouter>
                        <WebRoutes/>
                </BrowserRouter>
            </PersistGate>
        </Provider>
    )
}