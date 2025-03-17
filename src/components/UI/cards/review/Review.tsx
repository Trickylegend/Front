import Ban from '@/components/pages/ROLES/ADMIN/review/ban/Ban'
import Hide from '@/components/pages/ROLES/ADMIN/review/hide/Hide'
import { Review as ReviewType } from '@/lib/types'
import Image from 'next/image'
import { FaUser } from 'react-icons/fa'
import styles from './Review.module.scss'

export default function Review({
	review,
	control,
}: {
	review: ReviewType
	control: boolean
}) {
	return (
		<div className={styles.container}>
			<div className={styles.imageContainer}>
				{review.author.avatar ? (
					<Image
						src={review.author.avatar}
						width={50}
						height={50}
						alt={review.author.name}
					/>
				) : (
					<FaUser />
				)}
			</div>
			<div className={styles.descriptionContainer}>
				<h4 className={styles.description}>{review.description}</h4>
			</div>
			<div className={styles.ratingContainer}>
				<h4 className={styles.rating}>{review.rating}</h4>
			</div>
			{control && (
				<div className={styles.controlContainer}>
					<Hide review={review} />
					<Ban user={review.author} />
				</div>
			)}
		</div>
	)
}
