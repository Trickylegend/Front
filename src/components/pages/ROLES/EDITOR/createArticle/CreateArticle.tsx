'use client'

import CustomFileInput from '@/components/UI/forms/customFileInput/CustomFileInput'
import CustomForm from '@/components/UI/forms/customForm/CustomForm'
import CustomInput from '@/components/UI/forms/customInput/CustomInput'
import useAddArticle from '@/lib/hooks/reactQuery/articles/useAddArticle'
import { createOnSubmit } from '@/lib/utils/createOnSubmit'
import { z } from 'zod'
import styles from './CreateArticle.module.scss'

const defaultErrorMessage = 'Ошибка добавления новости'

export const articleSchema = z.object({
	title: z.string().min(1, 'Заголовок обязателен'),
	description: z.string().optional().default(''),
	preview: z
		.any()
		.refine(val => {
			if (typeof window !== 'undefined') {
				return val instanceof FileList && val.length > 0
			}
			return true
		}, 'Файл обязателен')
		.optional(),
})

type ArticleFormData = z.infer<typeof articleSchema>

export default function CreateArticle() {
	const mutation = useAddArticle('multipart/form-data')

	const onSubmit = createOnSubmit<ArticleFormData>(mutation, {
		useFormData: true,
		fileKeys: ['preview'],
		defaultErrorMessage: defaultErrorMessage,
	})

	return (
		<div className={styles.container}>
			<CustomForm<ArticleFormData>
				schema={articleSchema}
				onSubmit={onSubmit}
				defaultErrorMessage={defaultErrorMessage}
			>
				<h2 className={styles.formTitle}>Создание новости</h2>
				<CustomInput name='title' type='text' placeholder='Заголовок' />
				<CustomInput name='description' type='text' placeholder='Описание' />
				<CustomFileInput name='preview' />
			</CustomForm>
		</div>
	)
}
