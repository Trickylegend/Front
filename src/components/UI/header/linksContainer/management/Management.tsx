'use client'

import { Role } from '@/lib/types'
import Link from 'next/link'
import React from 'react'
import styles from './Management.module.scss'

export default function Management({ role }: { role: Role }) {
	const [isOpen, setIsOpen] = React.useState(false)
	if (!role) return
	return (
		<div className={`${styles.container} ${isOpen && styles.open}`}>
			<div
				className={styles.shortInfoContainer}
				onClick={() => setIsOpen(prev => !prev)}
			>
				<p className={styles.management}>Управление</p>
			</div>
			{isOpen && (
				<div className={styles.fullInfoContainer}>
					{role === 'ADMIN' && (
						<>
							<Link href={'/admin/reviews'}>Управление отзывами</Link>
							<Link href={'/admin/users'}>Управление пользователями</Link>
						</>
					)}
					{role === 'EDITOR' && (
						<>
							<Link href={'/editor/articles'}>Управление новостями</Link>
						</>
					)}
					{role === 'MANAGER' && (
						<>
							<Link href={'/manager/articles'}>Аналитика</Link>
							<Link href={'/manager/orders'}>Управление заказами</Link>
						</>
					)}
					{role === 'SERVICE_MANAGER' && (
						<>
							<Link href={'/service-manager/drivers'}>
								Управление водителями
							</Link>
							<Link href={'/service-manager/transports'}>
								Управление транспортом
							</Link>
						</>
					)}
					{role === 'USER' && (
						<>
							<Link href={'/user/orders'}>Мои заказы</Link>
						</>
					)}
				</div>
			)}
		</div>
	)
}
