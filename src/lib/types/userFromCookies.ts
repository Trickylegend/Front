import { Role } from './user'

export interface UserFromCookies {
	isAuth: boolean
	role: Role
}
