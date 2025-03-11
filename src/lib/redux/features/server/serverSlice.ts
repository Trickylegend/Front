import { ServerState, Status } from '@/lib/types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: ServerState = {
	status: undefined,
	statusCode: undefined,
	message: undefined,
}

const getStatus = (statusCode: number | undefined): Status => {
	return statusCode !== undefined && statusCode >= 200 && statusCode < 300
		? 'success'
		: 'error'
}

const serverSlice = createSlice({
	name: 'server',
	initialState,
	reducers: {
		setStatusCode: (state, action: PayloadAction<number | undefined>) => {
			state.statusCode = action.payload
			state.status = getStatus(action.payload)
		},
		setMessage: (state, action: PayloadAction<string | undefined>) => {
			state.message = action.payload
		},
	},
})

export const { setStatusCode, setMessage } = serverSlice.actions
export default serverSlice.reducer
