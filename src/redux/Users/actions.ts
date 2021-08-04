import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from '../../services/api'
import { AppDispatch, ReduxState } from "../store"

type Thunk = {
    dispatch: AppDispatch,
    state: ReduxState,
}
type OptionalFilter = {
    name?: string,
    surename?: string,
    email?: string,
    page?: string,
    active?: string,
}
type fetchReturn = { data: [], total: string, page: string }
export const fetchUsers = createAsyncThunk<fetchReturn, OptionalFilter, Thunk>('users/fetch', async (optionalFilter = {}, thunkAPI) => {
    const filter = thunkAPI.getState().Users.filter
    const { data } = await axios.get('company/users', { params: { ...filter, ...optionalFilter } })
    return data
})

type store = { closeForm: any }
export const storeUser = createAsyncThunk('users/store', async (user: store, thunkAPI) => {
    const closeModal = user.closeForm;
    delete user.closeForm
    const response = await axios.post('company/users', { ...user })
    if (response.status === 201) {
        closeModal()
        thunkAPI.dispatch(fetchUsers({}) as AppDispatch)
    }
    return response.data
})

type Update = { closeModal: any, id: any, fields: {} }
export const updateUser = createAsyncThunk('users/update', async (user: Update, thunkAPI) => {
    const { closeModal, id } = user;
    const response = await axios.put(`company/users/${id}`, { ...user.fields })
    if (response.status === 200) {
        closeModal()
        thunkAPI.dispatch(fetchUsers({}) as AppDispatch)
    }
    return response.data
})

type UpdateDesks = { closeModal: any, id: any, data: string[]}
export const updateUserDesks = createAsyncThunk('users/updateDesks', async (form: UpdateDesks, thunkAPI) => {
    const {closeModal, id, data} = form;
    const response = await axios.put(`company/users/desks/${id}`, {data})
    if (response.status === 200) {
        closeModal()
        thunkAPI.dispatch(fetchUsers({}) as AppDispatch)
    }
    return response.data
})

type Delete = string
export const deleteUser = createAsyncThunk('department/updateDesks', async (id: Delete, thunkAPI) => {
    const response = await axios.delete(`company/users/${id}`)
    if (response.status === 200){
        thunkAPI.dispatch(fetchUsers({}) as AppDispatch)
    }
    return response.data
})

// THIS FETCH ALL USERS WITH NO PARAMS OR PAGINATION
export const fetchAllUsers = createAsyncThunk('users/fetchAll', async () => {
    const { data } = await axios.get('company/users/all', { params: {} })
    return data
})

