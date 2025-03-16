'use client'
import CustomFileInput from '@/components/UI/forms/customFileInput/CustomFileInput'
import CustomForm from '@/components/UI/forms/customForm/CustomForm'
import CustomInput from '@/components/UI/forms/customInput/CustomInput'
import useEditArticle from '@/lib/hooks/reactQuery/articles/useEditArticle'
import { Article, ArticleEdit, articleEditSchema } from '@/lib/types'
import { createOnSubmit } from '@/lib/utils/createOnSubmit'
import styles from './EditArticle.module.scss'

const defaultErrorMessage = 'Ошибка редактирования новости'

export default function EditArticle({ article }: { article: Article }) {
	const mutation = useEditArticle('multipart/form-data')

	const onSubmit = createOnSubmit<ArticleEdit>(mutation, {
		useFormData: true,
		fileKeys: ['preview'],
		defaultErrorMessage: defaultErrorMessage,
	})

	const initialValues: ArticleEdit = {
		id: article.id,
		title: article.title,
		description: article.description,
	}

	return (
		<div className={styles.container}>
			<CustomForm<ArticleEdit>
				schema={articleEditSchema}
				onSubmit={onSubmit}
				defaultErrorMessage={defaultErrorMessage}
				initialValues={initialValues}
				formTitle={`Редактирование новости - ${article.id}`}
			>
				<CustomInput name='title' type='text' placeholder='Заголовок' />
				<CustomInput name='description' type='text' placeholder='Описание' />
				<CustomFileInput name='preview' />
			</CustomForm>
		</div>
	)
}
