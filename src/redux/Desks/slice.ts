import { createSlice} from "@reduxjs/toolkit";
import {fetchDesks, updateDesk, storeDesk, updateDeskUsers, fetchAllDesks, updateDeskDepartments, deleteDesk} from './actions'

const initialState: DesksState = {
    isFetching: false,
    isStoring: false,
    isDeleting: false,
    isUpdating: false,
    filter:{
        code: '',
        active: null,
        page: 1,
        createdAtInitial: '',
        createdAtEnd: ''
    },
    data: [],
    all:[],
    total: '0'
}

interface Filter{
    code: string,
    active: any,
    page: any,
    createdAtInitial: string,
    createdAtEnd: string
}

interface DesksState{
    isFetching: boolean,
    isStoring: boolean,
    isDeleting: boolean,
    isUpdating: boolean,
    filter: Filter,
    data: [],
    all: [],
    total: string
}

export const desksSlice = createSlice({
    name: 'desks',
    initialState,
    reducers: {
        updateFilter: (state,action) => {
            state.filter = {...state.filter, ...action.payload}
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(storeDesk.pending, (state,action) => {
            state.isStoring = true
        })
        .addCase(storeDesk.fulfilled, (state,{payload}) => {
            state.isStoring = false
        })
        .addCase(storeDesk.rejected, (state,action) => {
            state.isStoring = false
        })
        // FETCH
        .addCase(fetchDesks.pending, (state,action) => {
            state.isFetching = true
        })
        .addCase(fetchDesks.fulfilled, (state,{payload}) => {
            state.isFetching = false
            state.data = payload.data
            state.total = payload.total
            state.filter.page = payload.page
        })
        .addCase(fetchDesks.rejected, (state,action) => {
            state.isFetching = false
        })
        // UPDATE
        .addCase(updateDesk.pending, (state,action) => {
            state.isUpdating = true
        })
        .addCase(updateDesk.fulfilled, (state,{payload}) => {
            state.isUpdating = false
        })
        .addCase(updateDesk.rejected, (state,action) => {
            state.isUpdating = false
        })
        //UPDATE USERS
        .addCase(updateDeskUsers.pending, (state,action) => {
            state.isUpdating = true
        })
        .addCase(updateDeskUsers.fulfilled, (state,{payload}) => {
            state.isUpdating = false
            
        })
        .addCase(updateDeskUsers.rejected, (state,action) => {
            state.isUpdating = false
        })
        //UPDATE DEPARTMENTS
        .addCase(updateDeskDepartments.pending, (state,action) => {
            state.isUpdating = true
        })
        .addCase(updateDeskDepartments.fulfilled, (state,{payload}) => {
            state.isUpdating = false
            
        })
        .addCase(updateDeskDepartments.rejected, (state,action) => {
            state.isUpdating = false
        })
        // FETCHA ALL
        .addCase(fetchAllDesks.pending, (state,action) => {
            state.isFetching = true
        })
        .addCase(fetchAllDesks.fulfilled, (state,{payload}) => {
            state.isFetching = false
            state.all = payload
            
        })
        .addCase(fetchAllDesks.rejected, (state,action) => {
            state.isFetching = false
        })
    }
})

export const {updateFilter} = desksSlice.actions
export {fetchDesks, storeDesk, updateDesk, updateDeskUsers, fetchAllDesks, updateDeskDepartments, deleteDesk}
export default desksSlice.reducer

