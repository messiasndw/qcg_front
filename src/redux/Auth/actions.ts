import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from '../../services/api'



export type RegisterType = { name: string, companyName: string, email: string, password: string, confirmPassword: string, logIn: boolean }
export const register = createAsyncThunk('auth/register', async (payload: RegisterType, thunkAPI) => {
    const {password, email, name} = payload
    const response = await axios.post('auth/register', { ...payload })
    if (payload.logIn) {
        const { dispatch } = thunkAPI
        dispatch(login({ password,email }))
    }
    return response
})

export type LoginType = { email: string, password: string }
export const login = createAsyncThunk('auth/login', async ({ email, password }: LoginType, thunkAPI) => {
    const response = await axios.post('/auth/login', { email, password })
    return response
})