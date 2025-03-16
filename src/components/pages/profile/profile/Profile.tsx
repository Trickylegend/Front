import { ProfileBasic } from '@/lib/types'
import EditProfile from '../editProfile/EditProfile'
import ResetPassword from '../resetPassword/ResetPassword'

const profileInfo: ProfileBasic = {
	name: 'Мое имя',
	avatar: 'link_to_avatar',
}

export default function Profile() {
	return (
		<>
			<EditProfile info={profileInfo} />
			<ResetPassword />
		</>
	)
}
