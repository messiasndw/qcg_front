import { createSlice} from "@reduxjs/toolkit";
import {fetchDepartments, storeDepartment, updateDepartment, deleteDepartment, fetchAllDepartments} from './actions'

interface Filter{
    name: string,
    createdAtInitial: string,
    createdAtEnd: string,
    page: any
}

interface DepartmentsState{
    isFetching: boolean,
    isStoring: boolean,
    isDeleting: boolean,
    isUpdating: boolean,
    filter: Filter,
    data: [],
    all: [],
    total: string
}

const initialState: DepartmentsState = {
    isFetching: false,
    isStoring: false,
    isDeleting: false,
    isUpdating: false,
    filter:{
        createdAtInitial: '',
        createdAtEnd: '',
        name: '',
        page: 1
    },
    data: [],
    all: [],
    total: '0'
}

const departmentsSlice = createSlice({
    name: 'departments',
    initialState,
    reducers: {
        updateFilter: (state,action) => {
            state.filter = {...state.filter, ...action.payload}
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchDepartments.pending, (state,action) => {
            state.isFetching = true
        })
        .addCase(fetchDepartments.fulfilled, (state,{payload}) => {
            state.isFetching = false
            state.data = payload.data
            state.total = payload.total
            state.filter.page = payload.page
        })
        .addCase(fetchDepartments.rejected, (state,action) => {
            state.isFetching = false
        })
        //UPDATE
        .addCase(updateDepartment.pending, (state,action) => {
            state.isUpdating = true
        })
        .addCase(updateDepartment.fulfilled, (state,{payload}) => {
            state.isUpdating = false
        })
        .addCase(updateDepartment.rejected, (state,action) => {
            state.isUpdating = false
        })
        //FETCH ALL
        .addCase(fetchAllDepartments.pending, (state,action) => {
            state.isFetching = true
        })
        .addCase(fetchAllDepartments.fulfilled, (state,{payload}) => {
            state.isFetching = false
            state.all = payload
        })
        .addCase(fetchAllDepartments.rejected, (state,action) => {
            state.isFetching = false
        })
    }
})

export const {updateFilter} = departmentsSlice.actions
export {fetchDepartments,storeDepartment, updateDepartment, deleteDepartment, fetchAllDepartments}
export default departmentsSlice.reducer