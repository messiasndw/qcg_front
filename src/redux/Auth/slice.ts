import { createSlice} from "@reduxjs/toolkit";
import {login, register, me, updateProfile} from './actions'

const initialState: AuthState = {
    isAuthenticating: false,
    isAuthenticated: false,
    isRegistering: false,
    isMeing: false,
    isUpdatingProfile: false,
    me:{
        name: '',
        surename: '',
        email: '',
        company: {
            _id: '',
            name: ''
        }
    }
}
interface AuthState{
    isAuthenticating: boolean,
    isAuthenticated: boolean,
    isRegistering: boolean,
    isMeing: boolean,
    isUpdatingProfile: boolean,
    me:{
        name: string,
        surename: string,
        email: string,
        company: {
            _id: string,
            name: string
        }
    }
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
            const {name, email, surename, company} = action.payload
            state.me.name = name
            state.me.surename = surename
            state.me.email = email
            state.me.company.name = company.name
            state.me.company._id = company._id
            state.isMeing = false
        })
        .addCase(me.rejected, (state,action) => {
            state.isMeing = false
        })
        //UPDATE PROFILE
        .addCase(updateProfile.pending, (state,action) => {
            state.isUpdatingProfile = true
        })
        .addCase(updateProfile.fulfilled, (state,action) => {
            state.isUpdatingProfile = false
        })
        .addCase(updateProfile.rejected, (state,action) => {
            state.isUpdatingProfile = false
        })
    }
})

export {login, register, me, updateProfile}
export const {logout} = authSlice.actions
export default authSlice.reducer

