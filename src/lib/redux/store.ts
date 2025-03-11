import { combineReducers, configureStore } from '@reduxjs/toolkit'
import orderReducer from './features/order/orderSlice'
import serverReducer from './features/server/serverSlice'

const rootReducer = combineReducers({
	server: serverReducer,
	order: orderReducer,
})

export const makeStore = () => {
	return configureStore({
		reducer: rootReducer,
	})
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
