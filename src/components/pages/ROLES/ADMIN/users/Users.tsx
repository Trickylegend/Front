'use client'

import User from '@/components/UI/cards/user/User'
import { User as UserType } from '@/lib/types'
import styles from './Users.module.scss'

const users: UserType[] = [
	{
		id: '1',
		name: 'Евгений',
		email: 'user1@mail.ru',
		isActive: true,
		role: 'USER',
	},
	{
		id: '1',
		name: 'Александр',
		email: 'user2@mail.ru',
		isActive: true,
		role: 'USER',
	},
]

export default function Users() {
	// const { users } = useUsers()
	return (
		<div className={styles.container}>
			<h2>Управление пользователями</h2>
			<div className={styles.flexContainer}>
				{users?.map((user: UserType) => (
					<User key={user.id} user={user} control={true} />
				))}
			</div>
		</div>
	)
}
