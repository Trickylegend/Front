'use client'

import Article from '@/components/UI/cards/article/Article'
import { Article as ArticleType } from '@/lib/types'
import styles from './Articles.module.scss'

const articles: ArticleType[] = [
	{
		id: '1',
		title: 'Скидки',
		description: 'Скидки весь месяц',
		isActive: false,
	},
	{
		id: '2',
		title: 'Технические работы',
		description: 'Сайт не будет работать 23.03.25',
		isActive: false,
	},
]

export default function Articles() {
	// const { articles } = useArticles()
	return (
		<div className={styles.container}>
			<h2>Управление новостями</h2>
			<div className={styles.flexContainer}>
				{articles?.map((article: ArticleType) => (
					<Article key={article.id} article={article} control={true} />
				))}
			</div>
		</div>
	)
}
