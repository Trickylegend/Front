'use client'

import User from '@/components/UI/cards/user/User'
import { User as UserType } from '@/lib/types'
import React from 'react'
import CreateUser from '../createUser/CreateUser'
import EditUser from '../editUser/EditUser'
import styles from './Users.module.scss'
import { useUsers } from '@/lib/hooks/reactQuery/users/useUsers'

// const users: UserType[] = [
// 	{
// 		id: '1',
// 		name: 'Евгений',
// 		email: 'user1@mail.ru',
// 		isActive: true,
// 		role: 'USER',
// 	},
// 	{
// 		id: '2',
// 		name: 'Александр',
// 		email: 'user2@mail.ru',
// 		isActive: true,
// 		role: 'USER',
// 	},
// ]

export default function Users() {
	const { users } = useUsers()
	const [activeUser, setActiveUser] = React.useState<UserType>()

	return (
		<div className={styles.container}>
			<h2>Управление пользователями</h2>
			<div className={styles.controlContainer}>
				<CreateUser />
				{activeUser && <EditUser key={activeUser.id} user={activeUser} />}
			</div>

			<div className={styles.flexContainer}>
				{users?.map((user: UserType) => (
					<User
						key={user.id}
						user={user}
						control={true}
						onEdit={() => setActiveUser(user)}
					/>
				))}
			</div>
		</div>
	)
}
