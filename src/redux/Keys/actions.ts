import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from '../../services/api'

export type store = string
export const storeKey = createAsyncThunk('auth/register', async (departmentId: store, thunkAPI) => {
    const { data } = await axios.post('keys/store', { departmentId })
    return data
})
