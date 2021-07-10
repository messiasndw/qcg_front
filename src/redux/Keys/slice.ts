import { createSlice} from "@reduxjs/toolkit";
import {storeKey} from './actions'

const initialState: KeysState = {
    isFetching: false,
    isStoring: false,
    isDeleting: false,
    
}
interface KeysState{
    isFetching: boolean,
    isStoring: boolean,
    isDeleting: boolean,
    
}

export const keysSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        
    },
    extraReducers: (builder) => {
        builder
        .addCase(storeKey.pending, (state,action) => {
            state.isStoring = true
        })
        .addCase(storeKey.fulfilled, (state,action) => {
            state.isStoring = false
        })
        .addCase(storeKey.rejected, (state,action) => {
            state.isStoring = false
        })
    }
})

export {storeKey}
export default keysSlice.reducer

