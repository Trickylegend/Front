'use client'

import CustomForm from '@/components/UI/forms/customForm/CustomForm'
import CustomInput from '@/components/UI/forms/customInput/CustomInput'
import useEditCategory from '@/lib/hooks/reactQuery/categories/useEditCategory'
import { Category, CategoryEdit, categoryEditSchema } from '@/lib/types'
import { createOnSubmit } from '@/lib/utils/createOnSubmit'
import styles from './EditCategory.module.scss'

const defaultErrorMessage = 'Ошибка редактирования категории'

export default function EditCategory({ category }: { category: Category }) {
	const mutation = useEditCategory()

	const onSubmit = createOnSubmit<CategoryEdit>(mutation, {
		defaultErrorMessage,
	})

	const initialValues: CategoryEdit = {
		id: category.id,
		name: category.name,
		description: category.description,
	}

	return (
		<div className={styles.сontainer}>
			<CustomForm<CategoryEdit>
				schema={categoryEditSchema}
				onSubmit={onSubmit}
				defaultErrorMessage={defaultErrorMessage}
				initialValues={initialValues}
				formTitle={`Редактирование категории – ${category.id}`}
			>
				<CustomInput name='name' type='text' placeholder='Название' />
				<CustomInput name='description' type='text' placeholder='Описание' />
			</CustomForm>
		</div>
	)
}
