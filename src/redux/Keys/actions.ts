import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from '../../services/api'

export type storeKey = string
export const storeKey = createAsyncThunk('auth/register', async (departmentId: storeKey, thunkAPI) => {
    const { data } = await axios.post('keys/store', { departmentId })
    return data
})
