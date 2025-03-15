import CustomForm from '@/components/UI/forms/customForm/CustomForm'
import CustomInput from '@/components/UI/forms/customInput/CustomInput'
import useAddCategory from '@/lib/hooks/reactQuery/categories/useAddCategory'
import { CategoryCreate, categoryCreateSchema } from '@/lib/types'
import { createOnSubmit } from '@/lib/utils/createOnSubmit'
import styles from './AddCategory.module.scss'

const defaultErrorMessage = 'Ошибка добавления категории'

export default function AddCategory() {
	const mutation = useAddCategory()

	const onSubmit = createOnSubmit<CategoryCreate>(mutation, {
		defaultErrorMessage,
	})

	return (
		<div className={styles.сontainer}>
			<CustomForm<CategoryCreate>
				schema={categoryCreateSchema}
				onSubmit={onSubmit}
				defaultErrorMessage={defaultErrorMessage}
			>
				<h2 className={styles.formTitle}>Создание категории</h2>
				<CustomInput name='name' type='text' placeholder='Название' />
				<CustomInput name='description' type='text' placeholder='Описание' />
			</CustomForm>
		</div>
	)
}
