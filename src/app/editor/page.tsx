import Articles from '@/components/pages/ROLES/EDITOR/articles/Articles'
import CreateArticle from '@/components/pages/ROLES/EDITOR/createArticle/CreateArticle'
import EditArticle from '@/components/pages/ROLES/EDITOR/editArticle/EditArticle'
import { Article } from '@/lib/types'

const article: Article = {
	id: '1',
	title: 'Скидки',
	description: 'Скидки весь месяц',
	isActive: false,
}

export default function page() {
	return (
		<>
			<Articles />
			<CreateArticle />
			<EditArticle article={article} />
		</>
	)
}
