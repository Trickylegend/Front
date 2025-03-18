'use client'
import CustomFileInput from '@/components/UI/forms/customFileInput/CustomFileInput'
import CustomForm from '@/components/UI/forms/customForm/CustomForm'
import CustomInput from '@/components/UI/forms/customInput/CustomInput'
import useEditDriver from '@/lib/hooks/reactQuery/drivers/useEditDriver'
import { Driver, DriverEdit, driverEditSchema } from '@/lib/types'
import { createOnSubmit } from '@/lib/utils/createOnSubmit'
import styles from './EditDriver.module.scss'

const defaultErrorMessage = 'Ошибка редактирования водителя'

export default function EditDriver({ driver }: { driver: Driver }) {
	const mutation = useEditDriver('multipart/form-data')

	const onSubmit = createOnSubmit<DriverEdit>(mutation, {
		useFormData: true,
		fileKeys: ['avatar'],
		defaultErrorMessage: defaultErrorMessage,
	})

	const initialValues: DriverEdit = {
		id: driver.id,
		name: driver.name,
		description: driver.description,
		isActive: driver.isActive,
	}

	return (
		<div className={styles.сontainer}>
			<CustomForm<DriverEdit>
				schema={driverEditSchema}
				onSubmit={onSubmit}
				defaultErrorMessage={defaultErrorMessage}
				initialValues={initialValues}
				formTitle={`Редактирование водителя - ${driver.id}`}
			>
				<CustomInput name='name' type='text' placeholder='Имя' />
				<CustomInput name='description' type='text' placeholder='Описание' />
				<CustomFileInput name='avatar' multiple />
			</CustomForm>
		</div>
	)
}
