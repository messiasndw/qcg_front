import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from '../../services/api'
import { AppDispatch, ReduxState } from "../store"

type Thunk = {
    dispatch: AppDispatch,
    state: ReduxState,
}
type OptionalFilter = {
    code?: string,
    page?: string,
    active?: string
}

type fetchReturn = { data: [], total: string, page: string }
export const fetchDepartments = createAsyncThunk<fetchReturn, OptionalFilter, Thunk>('departments/fetch', async (optionalFilter = {}, thunkAPI) => {
    const filter = thunkAPI.getState().Departments.filter
    const { data } = await axios.get('departments', { params: { ...filter, ...optionalFilter } })
    return data
})

type store = { closeForm: any }
export const storeDepartment = createAsyncThunk('departments/store', async (department: store, thunkAPI) => {
    const closeModal = department.closeForm;
    delete department.closeForm
    const response = await axios.post('departments', { ...department })
    if (response.status === 201) {
        closeModal()
        thunkAPI.dispatch(fetchDepartments({}) as AppDispatch)
    }
    return response.data
})

type Update = { closeModal: any, id: any, fields: {}}
export const updateDepartment = createAsyncThunk('department/update', async (department: Update, thunkAPI) => {
    const {closeModal, id} = department;
    const response = await axios.put(`departments/${id}`, { ...department.fields })
    if (response.status === 200) {
        closeModal()
        thunkAPI.dispatch(fetchDepartments({}) as AppDispatch)
    }
    return response.data
})

type UpdateDesks = { closeModal: any, id: any, data: string[]}
export const updateDepartmentDesks = createAsyncThunk('department/updateDesks', async (form: UpdateDesks, thunkAPI) => {
    const {closeModal, id, data} = form;
    const response = await axios.post(`departments/desks/${id}`, {data})
    if (response.status === 201) {
        closeModal()
        thunkAPI.dispatch(fetchDepartments({}) as AppDispatch)
    }
    return response.data
})

type Delete = string
export const deleteDepartment = createAsyncThunk('department/updateDesks', async (id: Delete, thunkAPI) => {
    const response = await axios.delete(`departments/${id}`)
    if (response.status === 200) {
        // closeModal()
        thunkAPI.dispatch(fetchDepartments({}) as AppDispatch)
    }
    return response.data
})