import {createSlice} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'

export interface AuthInterface {
    isLoggedIn: boolean
}

const initialState: AuthInterface = {
    isLoggedIn: false,
}

export const authSlice = createSlice({
    name: 'authentication',
    initialState,
    reducers: {
        updateAuth: (state, action: PayloadAction<boolean>) => {
            state.isLoggedIn = action.payload
        },
    },
})

export const {updateAuth} = authSlice.actions

export default authSlice.reducer