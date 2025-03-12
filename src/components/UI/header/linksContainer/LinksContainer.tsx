import { UserFromCookies } from '@/lib/types'
import getUserFromCookies from '@/lib/utils/authUtils'
import Link from 'next/link'
import styles from './LinksContainer.module.scss'

export default async function LinksContainer() {
	const user: UserFromCookies = await getUserFromCookies()
	return (
		<div className={styles.container}>
			<Link href={'/'}>Главная</Link>
			<Link href={'/articles'}>Новости</Link>
			<Link
				href={'/favorites'}
				className={user.isAuth ? styles.link : styles.disabled}
			>
				Избранное
			</Link>
			{user.role === 'SERVICE_MANAGER' && (
				<Link href={'/categories'}>Управление категориями</Link>
			)}
		</div>
	)
}
