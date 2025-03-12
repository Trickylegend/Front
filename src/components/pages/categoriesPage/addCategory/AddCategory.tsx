import CustomForm from '@/components/UI/forms/customForm/CustomForm'
import CustomInput from '@/components/UI/forms/customInput/CustomInput'
import useAddCategory from '@/lib/hooks/reactQuery/categories/useAddCategory'
import { Category, ExtendedFormMethods } from '@/lib/types'
import { z } from 'zod'
import styles from './AddCategory.module.scss'

const categorySchema = z.object({
	name: z.string().min(1, 'Введите название категории'),
	description: z.string(),
})

type CategoryFormData = z.infer<typeof categorySchema>

export default function AddCategory() {
	const mutation = useAddCategory()

	const defaultErrorMessage = 'Ошибка добавления'

	const onSubmit = async (
		data: CategoryFormData,
		methods: ExtendedFormMethods<CategoryFormData>
	) => {
		try {
			const result = await mutation.mutateAsync(data as Category)
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
				<h2>Добавление категории</h2>
				<CustomForm<CategoryFormData>
					schema={categorySchema}
					onSubmit={onSubmit}
					defaultErrorMessage={defaultErrorMessage}
					buttonDefaultMessage='Создать'
					buttonSuccessMessage='Успешно создано'
				>
					<CustomInput name='name' type='text' placeholder='Название' />
					<CustomInput name='description' type='text' placeholder='Описание' />
				</CustomForm>
			</div>
		</>
	)
}
