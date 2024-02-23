import {createSlice} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'

export interface LoggedInClientInterface {
    baseClientSetupCompleted?: boolean
}

const initialState: LoggedInClientInterface = {
    baseClientSetupCompleted: false,
}

export const loggedInClientSlice = createSlice({
    name: 'loggedInClient',
    initialState,
    reducers: {
        updateLoggedInClient: (state, action: PayloadAction<LoggedInClientInterface>) => {
            state.baseClientSetupCompleted = action.payload.baseClientSetupCompleted
        },
    },
})

export const {updateLoggedInClient} = loggedInClientSlice.actions

export default loggedInClientSlice.reducer