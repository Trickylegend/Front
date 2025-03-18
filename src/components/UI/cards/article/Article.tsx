import DeleteButton from '@/components/UI/buttons/deleteButton/DeleteButton'
import StatusButton from '@/components/UI/buttons/statusButton/StatusButton'
import { Article as ArticleType } from '@/lib/types'
import Image from 'next/image'
import { FcImageFile } from 'react-icons/fc'
import styles from './Article.module.scss'

export default function Article({
	article,
	control = false,
	onEdit = () => {},
}: {
	article: ArticleType
	control: boolean
	onEdit: () => void
}) {
	return (
		<div className={styles.container}>
			<div className={styles.imageContainer}>
				{article.preview ? (
					<Image
						src={article.preview}
						width={100}
						height={100}
						alt={article.title}
					/>
				) : (
					<FcImageFile />
				)}
			</div>
			<div className={styles.infoContainer}>
				<h3 className={styles.title}>{article.title}</h3>
				<p className={styles.description}>{article.description}</p>
			</div>
			{control && (
				<div className={styles.controlContainer}>
					<StatusButton
						entityType={'article'}
						id={article.id}
						status={article.isActive}
						deactivateText={'Активировать'}
						activateText={'Деактивировать'}
					/>
					<button onClick={onEdit}>Изменить</button>
					<DeleteButton entityType={'article'} id={article.id} />
				</div>
			)}
		</div>
	)
}
