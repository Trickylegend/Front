'use client'
import CustomFileInput from '@/components/UI/forms/customFileInput/CustomFileInput'
import CustomForm from '@/components/UI/forms/customForm/CustomForm'
import CustomInput from '@/components/UI/forms/customInput/CustomInput'
import useAddDriver from '@/lib/hooks/reactQuery/drivers/useAddDriver'
import { createOnSubmit } from '@/lib/utils/createOnSubmit'
import { z } from 'zod'
import styles from './AddDriver.module.scss'

export const driverSchema = z.object({
	name: z.string().min(1, 'Введите имя'),
	description: z.string().optional().default(''),
	isAvailable: z.boolean().default(false),
	avatar: z
		.any()
		.refine(val => {
			if (typeof window !== 'undefined') {
				return val instanceof FileList && val.length > 0
			}
			return true
		}, 'Файл обязателен')
		.optional(),
})

const defaultErrorMessage = 'Ошибка добавления'

type DriverFormData = z.infer<typeof driverSchema>

export default function AddDriver() {
	const mutation = useAddDriver('multipart/form-data')

	const onSubmit = createOnSubmit<DriverFormData>(mutation, {
		useFormData: true,
		fileKeys: ['avatar'],
		defaultErrorMessage: defaultErrorMessage,
	})

	return (
		<>
			<div className={styles.formContainer}>
				<h2>Добавление водителя</h2>
				<CustomForm<DriverFormData>
					schema={driverSchema}
					onSubmit={onSubmit}
					defaultErrorMessage={defaultErrorMessage}
					buttonDefaultMessage='Создать'
					buttonSuccessMessage='Успешно создано'
				>
					<CustomInput name='name' type='text' placeholder='Имя' />
					<CustomInput name='description' type='text' placeholder='Описание' />
					<CustomFileInput name='avatar' multiple />
				</CustomForm>
			</div>
		</>
	)
}
