'use client'

import Review from '@/components/UI/cards/review/Review'
import { Review as ReviewType } from '@/lib/types'
import styles from './Reviews.module.scss'

const reviews: ReviewType[] = [
	{
		id: '1',
		description: 'Компания быстро предоставила транспорт',
		rating: 5,
		isActive: false,
		author: {
			id: 'user1',
			name: 'Евгений',
			isActive: true,
		},
	},
	{
		id: '2',
		description: 'Не обращайтесь сюда',
		rating: 1,
		isActive: true,
		author: {
			id: 'user2',
			name: 'Алексей',
			isActive: false,
		},
	},
]

export default function Reviews() {
	// const { reviews } = useReviews()
	return (
		<div className={styles.container}>
			<h2>Отзывы о компании</h2>
			<div className={styles.flexContainer}>
				{reviews?.map((review: ReviewType) => (
					<Review key={review.id} review={review} control={true} />
				))}
			</div>
		</div>
	)
}
