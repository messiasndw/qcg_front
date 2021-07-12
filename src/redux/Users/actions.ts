import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from '../../services/api'

export type fetch = {}
export const fetchUsers = createAsyncThunk('users/fetch', async (filter: store, thunkAPI) => {
    const { data } = await axios.get('company/users', {params: filter})
    return data
})

export type store = {}
export const storeUser = createAsyncThunk('users/store', async (user: store, thunkAPI) => {
    const { data } = await axios.post('company/users', { user })
    return data
})
