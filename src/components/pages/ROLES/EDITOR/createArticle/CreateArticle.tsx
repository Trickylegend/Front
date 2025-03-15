'use client'

import CustomFileInput from '@/components/UI/forms/customFileInput/CustomFileInput'
import CustomForm from '@/components/UI/forms/customForm/CustomForm'
import CustomInput from '@/components/UI/forms/customInput/CustomInput'
import useAddArticle from '@/lib/hooks/reactQuery/articles/useAddArticle'
import { ArticleCreate, articleCreateSchema } from '@/lib/types'
import { createOnSubmit } from '@/lib/utils/createOnSubmit'
import styles from './CreateArticle.module.scss'

const defaultErrorMessage = 'Ошибка добавления новости'

export default function CreateArticle() {
	const mutation = useAddArticle('multipart/form-data')

	const onSubmit = createOnSubmit<ArticleCreate>(mutation, {
		useFormData: true,
		fileKeys: ['preview'],
		defaultErrorMessage: defaultErrorMessage,
	})

	return (
		<div className={styles.container}>
			<CustomForm<ArticleCreate>
				schema={articleCreateSchema}
				onSubmit={onSubmit}
				defaultErrorMessage={defaultErrorMessage}
			>
				<h2 className={styles.formTitle}>Добавление новости</h2>
				<CustomInput name='title' type='text' placeholder='Заголовок' />
				<CustomInput name='description' type='text' placeholder='Описание' />
				<CustomFileInput name='preview' multiple />
			</CustomForm>
		</div>
	)
}
