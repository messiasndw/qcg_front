import { createSlice} from "@reduxjs/toolkit";
import {fetchUsers,storeUser} from './actions'

const initialState: UsersState = {
    isFetching: false,
    isStoring: false,
    isDeleting: false,
    users: []
}
interface UsersState{
    isFetching: boolean,
    isStoring: boolean,
    isDeleting: boolean,
    users: []
}

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
        .addCase(storeUser.pending, (state,action) => {
            state.isStoring = true
        })
        .addCase(storeUser.fulfilled, (state,action) => {
            state.isStoring = false
        })
        .addCase(storeUser.rejected, (state,action) => {
            state.isStoring = false
        })
        .addCase(fetchUsers.pending, (state,action) => {
            state.isFetching = true
        })
        .addCase(fetchUsers.fulfilled, (state,action) => {
            state.isFetching = false
            state.users = action.payload
        })
        .addCase(fetchUsers.rejected, (state,action) => {
            state.isFetching = false
        })
        
    }
})

export {storeUser, fetchUsers}
export default usersSlice.reducer

