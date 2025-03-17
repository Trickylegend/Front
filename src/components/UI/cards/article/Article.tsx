import { Article as ArticleType } from '@/lib/types'
import Image from 'next/image'
import { FcImageFile } from 'react-icons/fc'
import styles from './Article.module.scss'

export default function Article({
	article,
	control = false,
	onClick = () => {},
}: {
	article: ArticleType
	control: boolean
	onClick: () => void
}) {
	return (
		<div className={styles.container} onClick={onClick}>
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
					<button>
						{article.isActive ? 'Деактивировать' : 'Активировать'}
					</button>
					<button>Изменить</button>
					<button>Удалить</button>
				</div>
			)}
		</div>
	)
}
