import { createSlice} from "@reduxjs/toolkit";
import {fetchUsers,storeUser, updateUser} from './actions'

const initialState: UsersState = {
    isFetching: false,
    isStoring: false,
    isDeleting: false,
    isUpdating: false,
    users: [],
    filter:{
        name: '',
        surename: '',
        email: '',
        active: null,
        page: '1'
    },
    total: '0'
}

interface Filter{
    name: string,
    surename: string,
    email: string,
    active: any,
    page: string
}
interface UsersState{
    isFetching: boolean,
    isStoring: boolean,
    isDeleting: boolean,
    isUpdating: boolean,
    users: []
    filter: Filter,
    total: string
}

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        updateFilter: (state,action) => {
            for (const key in action.payload) {
                if (state.filter.hasOwnProperty(key)) {
                    state.filter[key as keyof Filter] = action.payload[key]
                }
            }
        }
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
        .addCase(fetchUsers.fulfilled, (state,{payload}) => {
            state.isFetching = false
            state.users = payload.data
            state.total = payload.total
            state.filter.page = payload.page
        })
        .addCase(fetchUsers.rejected, (state,action) => {
            state.isFetching = false
        })
        // UPDATE
        .addCase(updateUser.pending, (state,action) => {
            state.isUpdating = true
        })
        .addCase(updateUser.fulfilled, (state,{payload}) => {
            state.isUpdating = false
        })
        .addCase(updateUser.rejected, (state,action) => {
            state.isUpdating = false
        })
        
    }
})

export const {updateFilter} = usersSlice.actions
export {storeUser, fetchUsers}
export default usersSlice.reducer

