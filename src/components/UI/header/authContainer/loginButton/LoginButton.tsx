'use client'
import { useRouter } from 'next/navigation'
import styles from './LoginButton.module.scss'

export default function LoginButton() {
	const router = useRouter()
	return (
		<button className={styles.button} onClick={() => router.push('/login')}>
			Войти
		</button>
	)
}
