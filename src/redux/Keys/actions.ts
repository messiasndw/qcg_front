import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from '../../services/api'

export type store = string
export const storeKey = createAsyncThunk('keys/store', async (id: store, thunkAPI) => {
    const { data } = await axios.post('keys/store', { department: id })
    return data
})
