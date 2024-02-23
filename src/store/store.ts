import {configureStore} from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import {combineReducers} from "redux";
import {persistReducer} from 'redux-persist'
import thunk from 'redux-thunk'

import pageTitleReducer from '../slices/page-title-slice'
import authReducer from '../slices/auth-slice'
import colorModeReducer from '../slices/color-mode-slice'
import snackbarMessageReducer from '../slices/snackbar-message-slice'
import searchBarReducer from '../slices/serach-bar-slice'
import loggedInClientReducer from '../slices/logged-in-client-slice'


const reducers = combineReducers({
    pageTitle: pageTitleReducer,
    authentication: authReducer,
    colorMode: colorModeReducer,
    snackbarMessage: snackbarMessageReducer,
    searchBar: searchBarReducer,
    loggedInClient: loggedInClientReducer,
});

const persistConfig = {
    key: 'root',
    storage: storage,
    blacklist: ['snackbarMessageReducer', 'searchBarReducer', 'authReducer']
    // whitelist: ['authReducer'] // reducers to be persisted
};

const persistedReducer = persistReducer(persistConfig, reducers);


const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: [thunk]
});

export default store;


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch