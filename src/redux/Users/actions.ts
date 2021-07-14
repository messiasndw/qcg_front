import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from '../../services/api'

export type fetch = {}
export const fetchUsers = createAsyncThunk('users/fetch', async (filter: fetch, thunkAPI) => {
    const { data } = await axios.get('company/users', {params: filter})
    return data.data
})

export type store = {closeForm: any}
export const storeUser = createAsyncThunk('users/store', async (user: store, thunkAPI) => {
    const closeModal = user.closeForm;
    delete user.closeForm
    const response = await axios.post('company/users', { ...user })
    if(response.status === 201){
        closeModal()
    }
    return response.data
})
