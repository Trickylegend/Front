import { Review } from '@/lib/types'

export default function Hide({ review }: { review: Review }) {
	const handleClick = () => {
		console.log(review.isActive ? 'Скрыть' : 'Отобразить')
	}
	return (
		<button onClick={handleClick}>
			{review.isActive ? 'Скрыть' : 'Отобразить'}
		</button>
	)
}
