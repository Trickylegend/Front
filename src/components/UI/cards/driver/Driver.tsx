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
					<button>
						{driver.isAvailable ? 'Деактивировать' : 'Активировать'}
					</button>
					<button onClick={onEdit}>Изменить</button>
					<button>Удалить</button>
				</div>
			)}
		</div>
	)
}
