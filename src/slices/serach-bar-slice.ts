import {createSlice} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'
import {AlertColor} from "@mui/material";
import {SnackbarOrigin} from "@mui/material/Snackbar";

export interface SearchBar {
    isVisible: boolean,
    value?: string,
    placeholder?: string,
    searchFunction: () => void,
}

const initialState: SearchBar = {
    isVisible: false,
    value: '',
    placeholder: 'search...',
    searchFunction: () => {
    },
}

export const searchBarSlice = createSlice({
    name: 'searchBar',
    initialState,
    reducers: {
        updateSearchBar: (state, action: PayloadAction<SearchBar>) => {
            state.isVisible = action.payload?.isVisible
            state.value = action.payload?.value
            state.placeholder = action.payload?.placeholder
            state.searchFunction = action.payload?.searchFunction
        },
    },
})

export const {updateSearchBar} = searchBarSlice.actions

export default searchBarSlice.reducer