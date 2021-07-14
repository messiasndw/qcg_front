import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from '../../services/api'
import { toast } from "../Ui/slice"

export type RegisterType = { name: string, companyName: string, email: string, password: string, confirmPassword: string, logIn: boolean }
export const register = createAsyncThunk('auth/register', async (payload: RegisterType, thunkAPI) => {
    // const { dispatch } = thunkAPI
    const { password, email, name } = payload
    const { data } = await axios.post('auth/register', { ...payload })
})

export type LoginType = { email: string, password: string }
export const login = createAsyncThunk('auth/login', async ({ email, password }: LoginType, thunkAPI) => {
    const response = await axios.post('/auth/login', { email, password })
    if (response.status == 201) {
        localStorage.setItem('access_token', response.data.access_token)
    }
})

export const me = createAsyncThunk('auth/me', async (thunkAPI) => {
    const {data} = await axios.post('/auth/me')
    return data
})

export type UpdateProfileType = { email: string, password?: string, confirmPassword?: string, name: string, surename: string}
export const updateProfile = createAsyncThunk('auth/updateProfile', async (payload: UpdateProfileType, thunkAPI) => {
    const response = await axios.post('/profile', { ...payload })
    if (response.status === 201){
        thunkAPI.dispatch(toast({type: 'success', title: 'Success!', body: 'Profile Updated!'}))
    }
    return response.data.data
   
})