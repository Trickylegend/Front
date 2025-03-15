import { VscShield } from 'react-icons/vsc'
import styles from './AccessDenied.module.scss'
import ReturnButton from './returnButton/ReturnButton'

export default function AccessDenied() {
	return (
		<div className={styles.container}>
			<div className={styles.imageContainer}>
				<VscShield />
			</div>
			<div className={styles.infoContainer}>
				<h1>У вас нет доступа к этой странице</h1>
				<ReturnButton />
			</div>
		</div>
	)
}
