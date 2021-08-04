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
export const fetchDesks = createAsyncThunk<fetchReturn, OptionalFilter, Thunk>('desks/fetch', async (optionalFilter = {}, thunkAPI) => {
    const filter = thunkAPI.getState().Desks.filter
    const { data } = await axios.get('desks', { params: { ...filter, ...optionalFilter } })
    return data
})

type store = { closeForm: any }
export const storeDesk = createAsyncThunk('desks/store', async (user: store, thunkAPI) => {
    const closeModal = user.closeForm;
    delete user.closeForm
    const response = await axios.post('desks', { ...user })
    if (response.status === 201) {
        closeModal()
        thunkAPI.dispatch(fetchDesks({}) as AppDispatch)
    }
    return response.data
})

type Update = { closeModal: any, id: any, fields: {}}
export const updateDesk = createAsyncThunk('desks/update', async (desk: Update, thunkAPI) => {
    const {closeModal, id} = desk;
    const response = await axios.put(`desks/${id}`, { ...desk.fields })
    if (response.status === 200) {
        closeModal()
        thunkAPI.dispatch(fetchDesks({}) as AppDispatch)
    }
    return response.data
})

type UpdateUsers = { closeModal: any, id: any, users: string[]}
export const updateDeskUsers = createAsyncThunk('desks/updateUsers', async (data: UpdateUsers, thunkAPI) => {
    const {closeModal, id} = data;
    const response = await axios.put(`desks/users/${id}`, {users:data.users})
    if (response.status === 200) {
        closeModal()
        thunkAPI.dispatch(fetchDesks({}) as AppDispatch)
    }
    return response.data
})

type updateDeskDepartments = { closeModal: any, id: any, data: string[]}
export const updateDeskDepartments = createAsyncThunk('desks/updateDepartment', async (payload: updateDeskDepartments, thunkAPI) => {
    const {closeModal, id, data} = payload;
    const response = await axios.put(`desks/departments/${id}`, {data:data})
    if (response.status === 200) {
        closeModal()
        thunkAPI.dispatch(fetchDesks({}) as AppDispatch)
    }
    return response.data
})

type Delete = string
export const deleteDesk = createAsyncThunk('desks/deleteDesk', async (id: Delete, thunkAPI) => {
    const response = await axios.delete(`desks/${id}`)
    if (response.status === 200) {
        thunkAPI.dispatch(fetchDesks({}) as AppDispatch)
    }
    return response.data
})

export const fetchAllDesks = createAsyncThunk('desks/fetchAll', async () => {
    const { data } = await axios.get('desks/all', { params: {} })
    return data.data
})