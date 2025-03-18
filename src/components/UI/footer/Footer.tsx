import styles from './Footer.module.scss'
import Map from './map/Map'

export default function Footer() {
	return (
		<div className={styles.container}>
			<div>
				<h2>Footer</h2>
			</div>
			<Map />
		</div>
	)
}
