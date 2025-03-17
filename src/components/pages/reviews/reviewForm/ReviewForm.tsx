import CustomForm from '@/components/UI/forms/customForm/CustomForm'
import CustomInput from '@/components/UI/forms/customInput/CustomInput'
import { ReviewCreate, reviewCreateSchema } from '@/lib/types'
import { createOnSubmit } from '@/lib/utils/createOnSubmit'
import styles from './ReviewForm.module.scss'

const errorMessage = 'Ошибка добавления отзыва'

export default function ReviewForm() {
	const mutation = useAddReview()

	const onSubmit = createOnSubmit<ReviewCreate>(mutation, {
		defaultErrorMessage: errorMessage,
	})

	return (
		<div className={styles.container}>
			<CustomForm<ReviewCreate>
				schema={reviewCreateSchema}
				onSubmit={onSubmit}
				defaultErrorMessage={errorMessage}
				formTitle='Добавление отзыва'
			>
				<CustomInput name='description' type='text' placeholder='Ваш отзыв' />
				<CustomInput name='rating' type='number' step={1} min={1} max={5} />
			</CustomForm>
		</div>
	)
}
