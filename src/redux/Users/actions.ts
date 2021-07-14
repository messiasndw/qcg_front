import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from '../../services/api'
import { AppDispatch, ReduxState } from "../store"

type Thunk = {
    dispatch: AppDispatch,
    state: ReduxState,
}
export const fetchUsers = createAsyncThunk<[],any,Thunk>('users/fetch', async (_, thunkAPI) => {
        const filter = thunkAPI.getState().Users.filter
        const { data } = await axios.get('company/users', { params: {...filter} })
        return data.data
    })

export type store = { closeForm: any }
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
