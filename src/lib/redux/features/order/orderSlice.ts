import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface OrderState {
	transportId: string | undefined
	driverId: string | undefined
}

const initialState: OrderState = {
	transportId: undefined,
	driverId: undefined,
}

const orderSlice = createSlice({
	name: 'order',
	initialState,
	reducers: {
		setTransportId: (state, action: PayloadAction<string | undefined>) => {
			state.transportId = action.payload
		},
		setDriverId: (state, action: PayloadAction<string | undefined>) => {
			state.driverId = action.payload
		},
	},
})

export const { setTransportId, setDriverId } = orderSlice.actions
export default orderSlice.reducer
