import { createSlice, PayloadAction} from "@reduxjs/toolkit";
// import {login, register} from './actions'

const initialState: AuthState = {
    toasts: [],
    
}
interface AuthState{
    toasts: object[],
    
}

export const uiSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        toast: (state,action : PayloadAction<any>) => {
            state.toasts.push({...action.payload})
        }
    },
})

export const {toast} =  uiSlice.actions
export default uiSlice.reducer

