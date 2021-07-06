import { createSlice} from "@reduxjs/toolkit";
import {login, register} from './actions'

const initialState: AuthState = {
    isAuthenticating: false,
    isAuthenticated: false,
    name: '',
    email: ''
}
interface AuthState{
    isAuthenticating: boolean,
    isAuthenticated: boolean,
    name: string,
    email: string,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        //LOGIN
        .addCase(login.pending, (state,action) => {
            state.isAuthenticating = true
        })
        .addCase(login.fulfilled, (state,action) => {
            state.isAuthenticating = false
            console.log(action)
        })
        .addCase(login.rejected, (state,action) => {
            state.isAuthenticating = false
        })
        //REGISTER
        .addCase(register.pending, (state,action) => {
        })
        .addCase(register.fulfilled, (state,action) => {

        })
        .addCase(register.rejected, (state,action) => {

        })
    }
})

export default authSlice.reducer

