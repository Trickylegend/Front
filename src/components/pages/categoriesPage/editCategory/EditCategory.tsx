import CustomForm from '@/components/UI/forms/customForm/CustomForm'
import CustomInput from '@/components/UI/forms/customInput/CustomInput'
import useEditCategory from '@/lib/hooks/reactQuery/categories/useEditCategory'
import { Category, ExtendedFormMethods } from '@/lib/types'
import { z } from 'zod'
import styles from './EditCategory.module.scss'

const categorySchema = z.object({
	name: z.string().min(1, 'Введите название категории'),
	description: z.string(),
})

type CategoryFormData = z.infer<typeof categorySchema>

export default function EditCategory({
	category,
}: {
	category: Category | undefined
}) {
	const mutation = useEditCategory()

	const defaultErrorMessage = 'Ошибка редактирования'

	const onSubmit = async (
		data: CategoryFormData,
		methods: ExtendedFormMethods<CategoryFormData>
	) => {
		try {
			const formData = {
				id: category?.id,
				...data,
			}
			const result = await mutation.mutateAsync(formData)
			methods.setServerSuccess(result.message)
		} catch (error: any) {
			methods.setError('root', {
				message: error.response?.data?.message || defaultErrorMessage,
			})
		}
	}

	return (
		<>
			<div className={styles.formContainer}>
				<h2>Редактирование категории – {category?.id}</h2>
				<CustomForm<CategoryFormData>
					schema={categorySchema}
					onSubmit={onSubmit}
					defaultErrorMessage={defaultErrorMessage}
					initialValues={category as CategoryFormData}
				>
					<CustomInput name='name' type='text' placeholder='Название' />
					<CustomInput name='description' type='text' placeholder='Описание' />
				</CustomForm>
			</div>
		</>
	)
}
