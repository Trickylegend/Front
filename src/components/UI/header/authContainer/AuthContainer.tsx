import { UserFromCookies } from '@/lib/types'
import getUserFromCookies from '@/lib/utils/authUtils'
import LoginButton from './loginButton/LoginButton'
import Profile from './profile/Profile'

export default async function AuthContainer() {
	const user: UserFromCookies = await getUserFromCookies()
	return <>{user.isAuth ? <Profile /> : <LoginButton />}</>
}
