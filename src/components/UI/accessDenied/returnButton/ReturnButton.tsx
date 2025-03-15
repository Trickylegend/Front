'use client'

import { useRouter } from 'next/navigation'
import { VscArrowLeft } from 'react-icons/vsc'
import styles from './ReturnButton.module.scss'

export default function ReturnButton() {
	const router = useRouter()
	return (
		<button
			onClick={() => {
				router.back()
			}}
			className={styles.container}
		>
			<div className={styles.imageContainer}>
				<VscArrowLeft />
			</div>
			<div className={styles.textContainer}>Вернуться назад</div>
		</button>
	)
}
