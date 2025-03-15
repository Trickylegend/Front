import Link from 'next/link'
import { VscGlobe } from 'react-icons/vsc'
import styles from './LogoContainer.module.scss'

export default function LogoContainer() {
	return (
		<Link href={'/'} className={styles.container}>
			<div className={styles.imageContainer}>
				<VscGlobe />
			</div>
			<h2>Компания</h2>
		</Link>
	)
}
