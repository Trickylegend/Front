import DeleteButton from '@/components/UI/buttons/deleteButton/DeleteButton'
import StatusButton from '@/components/UI/buttons/statusButton/StatusButton'
import { Driver as DriverType } from '@/lib/types'
import Image from 'next/image'
import { FcImageFile } from 'react-icons/fc'
import styles from './Driver.module.scss'

export default function Driver({
	driver,
	control = false,
	onEdit = () => {},
}: {
	driver: DriverType
	control: boolean
	onEdit: () => void
}) {
	return (
		<div className={styles.container}>
			<div className={styles.imageContainer}>
				{driver.avatar ? (
					<Image
						src={driver.avatar}
						width={100}
						height={100}
						alt={driver.name}
					/>
				) : (
					<FcImageFile />
				)}
			</div>
			<div className={styles.infoContainer}>
				<h3 className={styles.name}>{driver.name}</h3>
				<p className={styles.description}>{driver.description}</p>
			</div>
			{control && (
				<div className={styles.controlContainer}>
					<StatusButton
						entityType={'driver'}
						id={driver.id}
						status={driver.isActive}
						deactivateText={'Деактивировать'}
						activateText={'Активировать'}
					/>
					<button onClick={onEdit}>Изменить</button>
					<DeleteButton entityType={'driver'} id={driver.id} />
				</div>
			)}
		</div>
	)
}
