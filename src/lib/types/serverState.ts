import { Status } from './status'

export interface ServerState {
	status: Status
	statusCode: number | undefined
	message: string | undefined
}
