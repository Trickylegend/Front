import { Author } from '@/lib/types'

export default function Ban({ user }: { user: Author }) {
	const handleClick = () => {
		console.log(user.isActive ? 'Заблокировать' : 'Разблокировать')
	}
	return (
		<button onClick={handleClick}>
			{user.isActive ? 'Заблокировать' : 'Разблокировать'}
		</button>
	)
}
