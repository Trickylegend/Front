'use client'
import CustomFileInput from '@/components/UI/forms/customFileInput/CustomFileInput'
import CustomForm from '@/components/UI/forms/customForm/CustomForm'
import CustomInput from '@/components/UI/forms/customInput/CustomInput'
import useAddDriver from '@/lib/hooks/reactQuery/drivers/useAddDriver'
import { DriverCreate, driverCreateSchema } from '@/lib/types'
import { createOnSubmit } from '@/lib/utils/createOnSubmit'
import styles from './AddDriver.module.scss'

const defaultErrorMessage = 'Ошибка добавления водителя'

export default function AddDriver() {
	const mutation = useAddDriver('multipart/form-data')

	const onSubmit = createOnSubmit<DriverCreate>(mutation, {
		useFormData: true,
		fileKeys: ['avatar'],
		defaultErrorMessage: defaultErrorMessage,
	})

	return (
		<div className={styles.сontainer}>
			<CustomForm<DriverCreate>
				schema={driverCreateSchema}
				onSubmit={onSubmit}
				defaultErrorMessage={defaultErrorMessage}
			>
				<h2 className={styles.formTitle}>Добавление новости</h2>
				<CustomInput name='name' type='text' placeholder='Имя' />
				<CustomInput name='description' type='text' placeholder='Описание' />
				<CustomFileInput name='avatar' multiple />
			</CustomForm>
		</div>
	)
}
