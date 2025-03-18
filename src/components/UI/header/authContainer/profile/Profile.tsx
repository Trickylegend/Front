'use client'
import useActiveUser from '@/lib/hooks/reactQuery/auth/useActiveUser'
import useLogout from '@/lib/hooks/reactQuery/auth/useLogout'
import { useRouter } from 'next/navigation'
import React from 'react'
import { VscAccount } from 'react-icons/vsc'
import styles from './Profile.module.scss'

export default function Profile() {
	const mutation = useLogout()
	const { activeUser, isLoading } = useActiveUser()
	const router = useRouter()
	const [isOpen, setIsOpen] = React.useState(false)
	if (isLoading) {
		return (
			<div className={styles.container}>
				<div className='skeleton'></div>
			</div>
		)
	}
	return (
		<div className={`${styles.container} ${isOpen && styles.open}`}>
			<div
				className={styles.shortInfoContainer}
				onClick={() => {
					setIsOpen(prev => !prev)
				}}
			>
				<div className={styles.imageContainer}>
					<VscAccount />
				</div>
				<div className={styles.nameContainer}>
					<h4>{activeUser?.name}</h4>
				</div>
			</div>
			{isOpen && (
				<div className={styles.fullInfoContainer}>
					<h5>Почта - {activeUser?.email}</h5>
					<button
						onClick={() => {
							router.push('/profile')
						}}
					>
						Настройки
					</button>
					<button
						className={styles.logoutButton}
						onClick={() => {
							//TODO:навести порядок
							mutation.mutate({})
							router.refresh()
						}}
					>
						Выйти
					</button>
				</div>
			)}
		</div>
	)
}
