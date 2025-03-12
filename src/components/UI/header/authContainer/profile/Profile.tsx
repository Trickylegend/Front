'use client'
import ProfileSkeleton from '@/components/UI/skeletons/profileSkeleton/ProfileSkeleton'
import useActiveUser from '@/lib/hooks/reactQuery/auth/useActiveUser'
import { logout } from '@/lib/utils/authUtils'
import styles from './Profile.module.scss'

export default function Profile() {
	const { activeUser, isLoading } = useActiveUser()

	if (isLoading) {
		return (
			<div className={styles.container}>
				<ProfileSkeleton />
			</div>
		)
	}
	return (
		<div className={styles.container}>
			<h3>Профиль</h3>
			<h4>Здравствуйте, {activeUser?.name}</h4>
			<h5>Email - {activeUser?.email}</h5>
			<button className={styles.logoutButton} onClick={() => logout()}>
				Выйти
			</button>
		</div>
	)
}
