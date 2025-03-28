import DeleteButton from '@/components/UI/buttons/deleteButton/DeleteButton'
import StatusButton from '@/components/UI/buttons/statusButton/StatusButton'
import { Transport as TransportType } from '@/lib/types'
import Image from 'next/image'
import { FaCarSide } from 'react-icons/fa'
import styles from './Transport.module.scss'

export default function Transport({
	transport,
	control = false,
	onEdit = () => {},
}: {
	transport: TransportType
	control: boolean
	onEdit: () => void
}) {
	return (
		<div className={styles.container}>
			<div className={styles.imageContainer}>
				{transport.preview ? (
					<Image
						src={transport.preview}
						width={100}
						height={100}
						alt={transport.name}
					/>
				) : (
					<FaCarSide />
				)}
			</div>
			<div className={styles.infoContainer}>
				<h3 className={styles.name}>{transport.name}</h3>
				<p className={styles.description}>{transport.description}</p>
				<p className={styles.price}>{transport.price} руб.</p>
				<p className={styles.isActive}>
					{transport.isActive ? 'Доступен' : 'Недоступен'}
				</p>{' '}
				<p className={styles.serviceStatus}>{transport.serviceStatus}</p>
				<p className={styles.serviceStandard}>{transport.serviceStandard}</p>
				<p className={styles.usageQuantity}>{transport.usageQuantity}</p>
			</div>
			{control && (
				<div className={styles.controlContainer}>
					<StatusButton
						entityType={'transport'}
						id={transport.id}
						status={transport.isActive}
						deactivateText={'Заблокировать'}
						activateText={'Разблокировать'}
					/>
					{(transport.serviceStatus === 'inService' ||
						transport.serviceStatus === 'required') && (
						<button>
							{transport.serviceStatus === 'inService' &&
								'Забрать с обслуживания'}
							{transport.serviceStatus === 'required' &&
								'Отправить на обслуживание'}
						</button>
					)}
					<button onClick={onEdit}>Изменить</button>
					<DeleteButton entityType={'transport'} id={transport.id} />
				</div>
			)}
		</div>
	)
}
