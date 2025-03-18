import DeleteButton from '@/components/UI/buttons/deleteButton/DeleteButton'
import StatusButton from '@/components/UI/buttons/statusButton/StatusButton'
import { User as UserType } from '@/lib/types'
import Image from 'next/image'
import { FaUser } from 'react-icons/fa'
import styles from './User.module.scss'

export default function User({
	user,
	control,
	onEdit = () => {},
}: {
	user: UserType
	control: boolean
	onEdit: () => void
}) {
	return (
		<div className={styles.container}>
			<div className={styles.imageContainer}>
				{user.avatar ? (
					<Image src={user.avatar} width={100} height={100} alt={user.name} />
				) : (
					<FaUser />
				)}
			</div>
			<div className={styles.infoContainer}>
				<h3 className={styles.email}>{user.email}</h3>
				<p className={styles.role}>{user.role}</p>
				<p className={styles.name}>{user.name}</p>
				<p className={styles.isActive}>
					{user.isActive ? 'Активен' : 'Заблокирован'}
				</p>
			</div>
			{control && (
				<div className={styles.controlContainer}>
					<StatusButton
						entityType={'user'}
						id={user.id}
						status={user.isActive}
						deactivateText={'Деактивировать'}
						activateText={'Активировать'}
					/>
					<button onClick={onEdit}>Изменить</button>
					<DeleteButton entityType={'user'} id={user.id} />
				</div>
			)}
		</div>
	)
}
