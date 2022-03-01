import { configureStore } from '@reduxjs/toolkit'
import appReducer, { AppSlice } from './appSlice'
import cartReducer, { CartSlice } from './cartSlice'

export interface ReduxState {
  app: AppSlice
  cart: CartSlice
}

export const store = configureStore({
  reducer: {
    app: appReducer,
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
