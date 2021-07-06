import { configureStore } from '@reduxjs/toolkit'
import Auth from './Auth/slice'
import Ui from './Ui/slice'

export const store = configureStore({
    reducer: {
        Auth,
        Ui
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type ReduxState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch