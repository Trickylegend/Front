import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
	authStatus: false,
}
const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setAuthStatus: (state, action: PayloadAction<boolean>) => {
			state.authStatus = action.payload
		},
	},
})

export const { setAuthStatus } = authSlice.actions
export default authSlice.reducer
