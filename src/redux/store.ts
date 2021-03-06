import { configureStore } from '@reduxjs/toolkit'
import { setInterceptors } from '../services/api'
import Auth from './Auth/slice'
import Ui from './Ui/slice'
import Keys from './Keys/slice'
import Users from './Users/slice'
import Desks from './Desks/slice'
import Departments from './Departments/slice'

export const store = configureStore({
    reducer: {
        Auth,
        Ui,
        Keys,
        Users,
        Desks,
        Departments
    },
})

//SETTING AXIOS INTERCEPTORS TO DISPATCH ACTIONS SUCH AS THE TOAST
setInterceptors(store)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type ReduxState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch