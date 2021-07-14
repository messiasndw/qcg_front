import { createSlice} from "@reduxjs/toolkit";
import {fetchUsers,storeUser} from './actions'

const initialState: UsersState = {
    isFetching: false,
    isStoring: false,
    isDeleting: false,
    users: [],
    filter:{
        name: '',
        surename: '',
        email: '',
        active: null,
    }
}

interface Filter{
    name: string,
    surename: string,
    email: string,
    active: any
}
interface UsersState{
    isFetching: boolean,
    isStoring: boolean,
    isDeleting: boolean,
    users: []
    filter: Filter
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
        .addCase(fetchUsers.fulfilled, (state,action) => {
            state.isFetching = false
            state.users = action.payload
        })
        .addCase(fetchUsers.rejected, (state,action) => {
            state.isFetching = false
        })
        
    }
})

export const {updateFilter} = usersSlice.actions
export {storeUser, fetchUsers}
export default usersSlice.reducer

