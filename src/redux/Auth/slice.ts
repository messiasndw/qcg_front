import { createSlice} from "@reduxjs/toolkit";
import {login, register, me} from './actions'

const initialState: AuthState = {
    isAuthenticating: false,
    isAuthenticated: false,
    isRegistering: false,
    isMeing: false,
    name: '',
    email: ''
}
interface AuthState{
    isAuthenticating: boolean,
    isAuthenticated: boolean,
    isRegistering: boolean,
    isMeing: boolean,
    name: string,
    email: string,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state,action) => {
            localStorage.removeItem('access_token')
            state.isAuthenticated = false
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(login.pending, (state,action) => {
            state.isAuthenticating = true
        })
        .addCase(login.fulfilled, (state,action) => {
            state.isAuthenticating = false
            state.isAuthenticated = true
        })
        .addCase(login.rejected, (state,action) => {
            state.isAuthenticating = false
        })
        //REGISTER
        .addCase(register.pending, (state,action) => {
            state.isRegistering = true
        })
        .addCase(register.fulfilled, (state,action) => {
            state.isRegistering = false
        })
        .addCase(register.rejected, (state,action) => {
            state.isRegistering = false
        })
        //ME
        .addCase(me.pending, (state,action) => {
            state.isMeing = true
        })
        .addCase(me.fulfilled, (state,action) => {
            state.isMeing = false
        })
        .addCase(me.rejected, (state,action) => {
            state.isMeing = false
        })
    }
})

export {login, register, me}
export const {logout} = authSlice.actions
export default authSlice.reducer

